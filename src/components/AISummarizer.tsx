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

const getMatchedAnswer = (userInput: string, projectContext?: string): string => {
    const clean = userInput.toLowerCase().trim();

    if (clean.includes("summarize") || clean.includes("summary")) {
        if (projectContext && projectContext.length > 50) {
            const lines = projectContext
                .split("\n")
                .map(l => l.trim())
                .filter(l => l.length > 20 && !l.startsWith("#") && !l.startsWith("!["))
                .slice(0, 3);
            const overview = lines.join(" ") || "Redesigned complex B2B SaaS workflows into intuitive enterprise systems.";
            return `### Case Study Summary\n\n- **Overview**: ${overview.slice(0, 220)}...\n- **Key Solution**: Governed workflow automation and scalable component patterns.\n- **Impact**: High enterprise adoption, reduced task friction, and unblocked sales evaluation pipelines.`;
        }
        return "### Case Study Summary\n\n- **Overview**: End-to-end UX research, interaction design, and component architecture for complex enterprise B2B SaaS.\n- **Key Solution**: Governed workflow automation, intuitive navigation, and high-density data visualizations.\n- **Impact**: High enterprise adoption and streamlined daily operation workflows.";
    }

    if (clean.includes("role") || clean.includes("do here") || clean.includes("contribution")) {
        return "### Karan's Role & Responsibilities\n\n- **Lead Product Designer**: Owned end-to-end design strategy, user research, wireframing, and high-fidelity UI execution.\n- **Design Systems**: Created component specifications and interactive prototypes in Figma.\n- **Cross-Functional Sync**: Partnered closely with Product Managers and Engineering teams to deliver production-ready features.";
    }

    if (clean.includes("challenge") || clean.includes("hardest") || clean.includes("problem")) {
        return "### Key Challenge & Resolution\n\n- **Challenge**: Balancing complex multi-location enterprise governance rules with a simple, low-friction user experience.\n- **Resolution**: Conducted user interviews to map edge cases, designed modular permission structures, and validated prototypes prior to engineering build.";
    }

    if (clean.includes("process") || clean.includes("how do")) {
        return "### Design Process\n\n- **Research & Strategy**: Deep domain mapping, customer verbatims, and competitive analysis.\n- **Ideation & Testing**: Wireframing, interactive Figma prototypes, and usability testing.\n- **Delivery**: Detailed developer specs, component state documentation, and post-launch metric tracking.";
    }

    if (clean.includes("karan") || clean.includes("who")) {
        return "### About Karan Kapoor\n\nSenior Product Designer with ~7 years of experience building B2B SaaS, enterprise systems, and AI tools.\n\n- **Current Role**: Sr. Product Designer at **Keka HR** (2.2M+ users)\n- **Education**: Master's in Design (**NID Ahmedabad**) + B.Tech Engineering\n- **Location**: Hyderabad, India (open to remote & relocation)";
    }

    if (clean.includes("open") || clean.includes("looking") || clean.includes("hire") || clean.includes("role")) {
        return "### Career Focus & Availability\n\n- **Target Roles**: Lead Product Designer, Staff Product Designer, or Design Manager\n- **Domain Preference**: B2B SaaS, enterprise software, developer tools\n- **Setup**: Open to remote-first, hybrid, or relocation";
    }

    return "### Answer\n\nKaran Kapoor is a Senior Product Designer (~7 years exp) specializing in B2B SaaS, enterprise systems, and AI-driven workflows.\n\nFeel free to ask about his design process, case study summaries, or career background!";
};

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
                body: JSON.stringify({ messages: updatedHistory, pageContext: text }),
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
            const matchedAnswer = getMatchedAnswer(userInput, text);
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'bot') {
                    lastMessage.content = matchedAnswer;
                }
                return newMessages;
            });
            setIsGenerating(false);
            setSuggestedPrompts([
                "Can you summarize this project?",
                "What was my role here?",
                "What was the biggest challenge?"
            ]);
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
