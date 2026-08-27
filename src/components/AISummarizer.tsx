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

/**
 * The pool follow-up questions are drawn from, rather than a fixed trio.
 *
 * Three fixed prompts meant the same three came back after every single
 * reply, which reads as the assistant having nothing else to offer. Wider
 * pools plus a random draw keep the suggestions moving.
 */
const PROMPT_POOL: Record<'home' | 'project', string[]> = {
    home: [
        "What roles are you looking for?",
        "How do you handle disagreements with PMs?",
        "How do I contact you?",
        "What does your design process look like?",
        "Which tools do you use day to day?",
        "Tell me about your Figma training work",
        "What's your experience with design systems?",
        "Where have you worked before?",
        "What kind of team do you work best in?",
        "What are you strongest at?"
    ],
    project: [
        "Can you summarize this project?",
        "What was your role here?",
        "What was the biggest challenge?",
        "What was the outcome?",
        "How long did this take?",
        "Who did you work with on this?",
        "What would you do differently?",
        "How did you validate the design?",
        "What did you learn from it?"
    ]
};

const PROMPT_COUNT = 3;

/**
 * Draws prompts at random, skipping anything already asked so the same
 * question isn't offered back to someone who has just had it answered. Falls
 * back to the full pool if avoiding repeats would leave too few.
 */
const pickPrompts = (
    pageType: 'home' | 'project',
    alreadyAsked: Set<string>,
    count = PROMPT_COUNT
): string[] => {
    const pool = PROMPT_POOL[pageType];
    const unasked = pool.filter((p) => !alreadyAsked.has(p.trim().toLowerCase()));
    const source = unasked.length >= count ? unasked : pool;

    // Fisher-Yates on a copy — a sort() with a random comparator is biased
    // and, worse, not a valid comparator.
    const shuffled = [...source];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
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
        // First person throughout, matching the voice the answers use.
        content: "Hey 👋 Agent Vinod here, answering as Karan. Ask me anything about my work, process, or background — or pick a question below to get started."
    }]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(initialPrompts || []);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Anything beyond the opening greeting means the reader has already asked
    // something.
    const hasConversationStarted = messages.length > 1;

    // Read off the transcript rather than tracked separately, so it stays
    // correct however a question was sent (pill, chip, or typed).
    //
    // Via a ref, not the state variable: this is called from the async
    // continuation after a reply arrives, which closes over the `messages`
    // from the render that created the handler. Reading that directly missed
    // the question just asked, and so kept re-offering it.
    const messagesRef = useRef(messages);
    messagesRef.current = messages;

    const askedQuestions = () =>
        new Set(
            messagesRef.current
                .filter((m) => m.role === 'user')
                .map((m) => m.content.trim().toLowerCase())
        );

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

            // A reply that carried no follow-ups of its own still gets a
            // fresh draw, so the chip row is never simply empty.
            setSuggestedPrompts((current) =>
                current.length > 0 ? current : pickPrompts(pageType, askedQuestions())
            );

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
            setSuggestedPrompts(pickPrompts(pageType, askedQuestions()));
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
                {/* Starter prompts are for starting — once the conversation has
                    moved past the greeting they stop reappearing every time the
                    chat is closed. In-chat follow-up chips take over from here. */}
                {!hasConversationStarted && initialPrompts && initialPrompts.length > 0 && (
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
