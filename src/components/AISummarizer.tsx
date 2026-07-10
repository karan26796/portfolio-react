import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Sparkle, X, ArrowUp } from "@phosphor-icons/react";
import Button from "./Buttons";
import '../styles/AISummarizer.scss';

interface AISummarizerProps {
    text: string;
    initialPrompts?: string[];
    buttonLabel?: string;
}

interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
}

const AISummarizer: React.FC<AISummarizerProps> = ({ text, initialPrompts, buttonLabel }) => {
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
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
                body: JSON.stringify({ messages: updatedHistory, pageContext: text }),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to fetch from chat API';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.details || errorData.error || errorMessage;
                } catch {
                    errorMessage = response.status === 404
                        ? 'Chat API is unavailable. Restart the dev server with npm start.'
                        : `Chat API error (${response.status})`;
                }
                throw new Error(errorMessage);
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
            console.error('Chat AI Error:', error);
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'bot') {
                    lastMessage.content = error instanceof Error
                        ? `Sorry, I'm having trouble connecting. ${error.message}`
                        : "Sorry, I'm having trouble connecting. Please try again.";
                }
                return newMessages;
            });
            setIsGenerating(false);
            setSuggestedPrompts(initialPrompts || []);
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
                                    setTimeout(() => handleSendMessage(prompt), 60);
                                }}
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                )}
                <Button
                    className="ai-fab-button"
                    text={buttonLabel || "Ask AI"}
                    iconName="Sparkle"
                    withIcon
                    withText
                    iconDirection="left"
                    variant="ai"
                    size="m"
                    weight="fill"
                    onClick={() => setIsOpen(true)}
                />
            </div>

            {/* ── CHAT WINDOW ── */}
            {isOpen && (
                <div className="ai-chat-window" onClick={(e) => e.stopPropagation()}>

                    {/* Top bar */}
                    <div className="ai-chat-topbar">
                        <div className="ai-topbar-brand">
                            <div className="ai-topbar-avatar">
                                <Sparkle weight="fill" size={16} />
                            </div>
                            <div>
                                <p className="ai-topbar-name">Agent Vinod</p>
                                <p className="ai-topbar-sub">AI Agent</p>
                            </div>
                        </div>
                        <button
                            className="ai-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <X weight="bold" size={15} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="ai-chat-messages">
                        {messages.map((msg, index) => {
                            const isBotTyping = isGenerating
                                && index === messages.length - 1
                                && msg.role === 'bot'
                                && msg.content === '';
                            const isLastBotStreaming = isGenerating
                                && index === messages.length - 1
                                && msg.role === 'bot'
                                && msg.content !== '';
                            const displayContent = msg.content.split('|')[0];

                            return (
                                <div key={index} className={`ai-msg-row ${msg.role}`}>
                                    {msg.role === 'bot' && (
                                        <div className="ai-agent-label-row">
                                            <div className="ai-avatar">
                                                <Sparkle weight="fill" size={11} />
                                            </div>
                                            <span className="ai-agent-name">Agent Vinod · AI</span>
                                        </div>
                                    )}
                                    <div className={`ai-bubble ${msg.role}`}>
                                        {msg.role === 'user' ? (
                                            <p>{displayContent}</p>
                                        ) : isBotTyping ? (
                                            <div className="ai-typing-indicator">
                                                <span /><span /><span />
                                            </div>
                                        ) : (
                                            <>
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                                    {displayContent}
                                                </ReactMarkdown>
                                                {isLastBotStreaming && (
                                                    <span className="ai-typing-cursor" aria-hidden="true" />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Story-driven follow-up chips */}
                        {!isGenerating && suggestedPrompts.length > 0 && (
                            <div className="ai-chips">
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
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

                    {/* Footer input */}
                    <div className="ai-chat-footer">
                        <input
                            type="text"
                            placeholder={isGenerating ? "Agent Vinod is typing…" : "Reply to Agent Vinod…"}
                            disabled={isGenerating}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDownInput}
                            autoFocus
                        />
                        <button
                            className="ai-send-btn"
                            disabled={isGenerating || inputText.trim().length === 0}
                            onClick={() => handleSendMessage()}
                            aria-label="Send message"
                        >
                            <ArrowUp weight="bold" size={16} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AISummarizer;
