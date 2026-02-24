import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Sparkle, X, ArrowUp } from "@phosphor-icons/react";
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
        content: "Hi! What would you like to know?"
    }]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(initialPrompts || []);

    // Sync if props change or component remounts without losing state
    useEffect(() => {
        if (messages.length === 1) {
            setSuggestedPrompts(initialPrompts || []);
        }
    }, [initialPrompts, messages.length]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to bottom whenever messages or suggested prompts change
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isGenerating, suggestedPrompts]);

    // Handle escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleSendMessage = async (customText?: string) => {
        const userInput = customText || inputText.trim();

        if (!userInput) return;

        // Add user message to state
        const newUserMessage: ChatMessage = { role: 'user', content: userInput };
        const updatedHistory = [...messages, newUserMessage];
        setMessages(updatedHistory);
        setInputText('');
        setSuggestedPrompts([]); // Clear prompts
        setIsGenerating(true);

        try {
            // Add a temporary empty bot message to stream into.
            // The empty state triggers the "Searching..." loader.
            setMessages((prev) => [...prev, { role: 'bot', content: '' }]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: updatedHistory,
                    pageContext: text // The raw markdown/summary context passed via props
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API error response:", errorData);
                throw new Error(errorData.details || 'Failed to fetch from chat API');
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
                    if (lastMessage.role === 'bot') {
                        lastMessage.content += chunk;
                    }
                    return newMessages;
                });
            }

            // Post-process to extract JSON prompts securely after the stream finishes
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];

                if (lastMessage.role === 'bot' && lastMessage.content.includes('|')) {
                    const parts = lastMessage.content.split('|');
                    lastMessage.content = parts[0].trim();

                    try {
                        // Extract JSON array string
                        const match = parts[1].match(/\[[\s\S]*\]/);
                        if (match) {
                            const parsed = JSON.parse(match[0]);
                            if (Array.isArray(parsed)) {
                                setSuggestedPrompts(parsed);
                            }
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
                    lastMessage.content = "Sorry, I am having trouble connecting right now. Please try again later.";
                }
                return newMessages;
            });
            setIsGenerating(false);
            setSuggestedPrompts(initialPrompts || []); // Reset to default prompts if error
        }
    };

    const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isGenerating) {
            handleSendMessage();
        }
    }

    if (!text) return null;

    return (
        <>
            <button className={`ai-fab-button ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
                <Sparkle weight="fill" className="sparkle" /> {buttonLabel || "Summarize Page"}
            </button>

            {isOpen && (
                <div className="ai-chat-window" onClick={(e) => e.stopPropagation()}>
                    <div className="ai-chat-header">
                        <div className="bot-info">
                            <span className="bot-avatar"><Sparkle weight="fill" size={20} /></span>
                            <div className="bot-text-details">
                                <h3>Ask Karan</h3>
                                <span className="status">Online</span>
                            </div>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <X weight="bold" size={16} />
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, index) => {
                            const isBotLastAndEmpty = isGenerating && index === messages.length - 1 && msg.role === 'bot' && msg.content === '';
                            // Hide the JSON | section from the user instantly while it's actively streaming
                            const displayContent = msg.content.split('|')[0];

                            return (
                                <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                                    {msg.role === 'user' ? (
                                        <p>{displayContent}</p>
                                    ) : (
                                        <>
                                            {isBotLastAndEmpty ? (
                                                <p><span className="searching-text">Searching...</span></p>
                                            ) : (
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                                    {displayContent}
                                                </ReactMarkdown>
                                            )}
                                            {isGenerating && !isBotLastAndEmpty && index === messages.length - 1 && msg.role === 'bot' && (
                                                <span className="typing-cursor" aria-hidden="true" />
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {!isGenerating && suggestedPrompts.length > 0 && (
                            <div className="suggested-prompts">
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        className="prompt-chip"
                                        onClick={() => handleSendMessage(prompt)}
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length > 1 && (
                        <div className="ai-chat-input">
                            <input
                                type="text"
                                placeholder={isGenerating ? "AI is typing..." : "Ask me anything..."}
                                disabled={isGenerating}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDownInput}
                            />
                            <button
                                className="send-btn"
                                disabled={isGenerating || inputText.trim().length === 0}
                                onClick={() => handleSendMessage()}
                                aria-label="Send message">
                                <ArrowUp weight="bold" size={18} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AISummarizer;
