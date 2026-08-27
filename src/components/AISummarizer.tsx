import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Sparkle, X, ArrowUp } from "@phosphor-icons/react";
import Button from "./Buttons";
import { findInterviewAnswer } from '../utils/interviewKnowledge';
import '../styles/AISummarizer.scss';

interface AISummarizerProps {
    text: string;
    initialPrompts?: string[];
    buttonLabel?: string;
    pageType?: 'home' | 'project';
}

const FALLBACK_PROMPTS: Record<'home' | 'project', string[]> = {
    home: [
        "What roles am I looking for?",
        "How do you handle disagreements with PMs?",
        "How can I contact you?"
    ],
    project: [
        "Can you summarize this project?",
        "What was my role here?",
        "What was the biggest challenge?"
    ]
};

interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
}

const getMatchedAnswer = (userInput: string, projectContext: string | undefined, pageType: 'home' | 'project'): string => {
    return findInterviewAnswer(userInput, projectContext, pageType);
};

const AISummarizer: React.FC<AISummarizerProps> = ({ text, initialPrompts, buttonLabel, pageType = 'project' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: 'bot',
        content: "Hey 👋 I'm Agent Vinod, Karan's AI assistant. Ask me anything about his work, process, or background — or pick a question below to get started."
    }]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(initialPrompts || []);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sync prompts when props change (first message only)
    useEffect(() => {
        if (messages.length === 1) {
            setSuggestedPrompts(initialPrompts || []);
        }
    }, [initialPrompts, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isGenerating, suggestedPrompts]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };
        const handleOpenEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-agent-vinod', handleOpenEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-agent-vinod', handleOpenEvent);
        };
    }, [isOpen]);

    const handleSendMessage = async (customText?: string) => {
        const userInput = customText || inputText.trim();
        if (!userInput) return;

        const newUserMessage: ChatMessage = { role: 'user', content: userInput };
        const updatedHistory = [...messages, newUserMessage];
        setMessages(updatedHistory);
        setInputText('');
        setSuggestedPrompts([]);
        setIsGenerating(true);

        try {
            setMessages((prev) => [...prev, { role: 'bot', content: '' }]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedHistory, pageContext: text, pageType }),
            });

            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            if (!response.body) throw new Error('ReadableStream not supported');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'bot') lastMessage.content += chunk;
                    return newMessages;
                });
            }

            // Extract suggested prompts from the | separator
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'bot' && lastMessage.content.includes('|')) {
                    const parts = lastMessage.content.split('|');
                    lastMessage.content = parts[0].trim();
                    try {
                        const match = parts[1].match(/\[[\s\S]*\]/);
                        if (match) {
                            const parsed = JSON.parse(match[0]);
                            if (Array.isArray(parsed)) setSuggestedPrompts(parsed);
                        }
                    } catch (e) {
                        console.error("Failed to parse suggested prompts", e);
                    }
                }
                return newMessages;
            });

            setIsGenerating(false);

        } catch (error) {
            console.warn('API connection offline or proxy error. Using matched answer:', error);
            const matchedAnswer = getMatchedAnswer(userInput, text, pageType);
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'bot') {
                    lastMessage.content = matchedAnswer;
                }
                return newMessages;
            });
            setIsGenerating(false);
            setSuggestedPrompts(FALLBACK_PROMPTS[pageType]);
        }
    };

    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isGenerating) handleSendMessage();
    };

    if (!text) return null;

    return (
        <>
            {/* ── FAB GROUP: pills + button ── */}
            <div className={`ai-fab-group ${isOpen ? 'hidden' : ''}`}>
                {initialPrompts && initialPrompts.length > 0 && (
                    <div className="ai-fab-pills">
                        {initialPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                className="ai-fab-pill"
                                onClick={() => {
                                    setIsOpen(true);
                                    handleSendMessage(prompt);
                                }}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    className="ai-fab-button-custom"
                    onClick={() => setIsOpen(true)}
                    aria-label={buttonLabel || "Ask Agent Vinod"}
                >
                    <div className="ai-button-glow-ring">
                        <div className="ai-button-inner">
                            <div className="sparkle-group">
                                <Sparkle size={20} weight="fill" className="main-sparkle" />
                            </div>
                            <span>{buttonLabel || "Ask Agent Vinod"}</span>
                        </div>
                    </div>
                </button>
            </div>

            {/* ── CHAT WINDOW ── */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-topbar">
                        <div className="ai-topbar-brand">
                            <div className="ai-topbar-avatar">
                                <Sparkle size={20} weight="fill" />
                            </div>
                            <div>
                                <p className="ai-topbar-name">Agent Vinod</p>
                                <p className="ai-topbar-sub">AI Assistant</p>
                            </div>
                        </div>

                        <button className="ai-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <X size={18} weight="bold" />
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`ai-msg-row ${msg.role}`}>
                                {msg.role === 'bot' && (
                                    <div className="ai-agent-label-row">
                                        <div className="ai-avatar">
                                            <Sparkle size={12} weight="fill" />
                                        </div>
                                        <span className="ai-agent-name">Agent Vinod · AI</span>
                                    </div>
                                )}

                                <div className={`ai-bubble ${msg.role}`}>
                                    {msg.content === '' && isGenerating ? (
                                        <div className="ai-typing-indicator">
                                            <span />
                                            <span />
                                            <span />
                                        </div>
                                    ) : (
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Suggested Follow-up Prompts inside chat body */}
                        {!isGenerating && suggestedPrompts.length > 0 && (
                            <div className="ai-chips">
                                {suggestedPrompts.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        className="ai-chip"
                                        onClick={() => handleSendMessage(prompt)}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-footer">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDownInput}
                            placeholder={isGenerating ? "Agent Vinod is typing…" : "Reply to Agent Vinod…"}
                            disabled={isGenerating}
                        />
                        <button
                            className="ai-send-btn"
                            onClick={() => handleSendMessage()}
                            disabled={!inputText.trim() || isGenerating}
                            aria-label="Send message"
                        >
                            <ArrowUp size={18} weight="bold" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AISummarizer;
