import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Sparkle, X, ArrowUp } from "@phosphor-icons/react";
import Button from "./Buttons";
import { findInterviewAnswer } from '../utils/interviewKnowledge';
import '../styles/AISummarizer.scss';
import { AGENT_PROMPT_QUERY, AGENT_PROMPT_VISIBILITY } from "./AgentPromptCard";

interface AISummarizerProps {
    text: string;
    initialPrompts?: string[];
    buttonLabel?: string;
    pageType?: 'home' | 'project' | 'training';
}

/**
 * The pool follow-up questions are drawn from, rather than a fixed trio.
 *
 * Three fixed prompts meant the same three came back after every single
 * reply, which reads as the assistant having nothing else to offer. Wider
 * pools plus a random draw keep the suggestions moving.
 */
const PROMPT_POOL: Record<'home' | 'project' | 'training', string[]> = {
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
    // The training page draws a different audience — someone weighing up a
    // workshop for their team or their students, not a hiring manager. Grounded
    // in what the page already states, so the answers have something to stand
    // on.
    training: [
        "What do you cover in a Figma workshop?",
        "Who are these sessions for?",
        "Can you run a session for my team?",
        "How long is a typical session?",
        "What does it cost?",
        "What formats do you offer?",
        "Do you teach Auto Layout and design systems?",
        "Do you cover AI in the design workflow?",
        "Have you taught non-designers, like PMs?",
        "Where have you taught before?",
        "How many people have you trained?"
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
    pageType: 'home' | 'project' | 'training',
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

const getMatchedAnswer = (userInput: string, projectContext: string | undefined, pageType: 'home' | 'project' | 'training'): string => {
    return findInterviewAnswer(userInput, projectContext, pageType);
};

const AISummarizer: React.FC<AISummarizerProps> = ({ text, initialPrompts, buttonLabel, pageType = 'project' }) => {
    const [isOpen, setIsOpen] = useState(false);
    // A question that arrived with the open request, sent once the window is up.
    const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([{
        role: 'bot',
        // First person throughout, matching the voice the answers use.
        content: "Hey 👋 Agent Vinod here, answering as Karan. Ask me anything about my work, process, or background — or pick a question below to get started."
    }]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(initialPrompts || []);
    // True while the page's own "A quick summary" section is on screen. That
    // section offers the assistant with better questions than this button can,
    // so the button stands down rather than floating on top of it.
    const [supersededByCard, setSupersededByCard] = useState(false);
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
        // `open-agent-vinod` may carry a question, so a card elsewhere on the
        // page can open the chat already asking something rather than landing
        // the visitor on an empty thread.
        const handleOpenEvent = (e: Event) => {
            setIsOpen(true);
            const asked = (e as CustomEvent<{ question?: string }>).detail?.question;
            if (asked) setPendingQuestion(asked);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-agent-vinod', handleOpenEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-agent-vinod', handleOpenEvent);
        };
    }, [isOpen]);

    // Bound on its own, not with the handlers above: those re-bind on every
    // change of `isOpen`, and this has nothing to do with whether the chat is
    // open. See AGENT_PROMPT_VISIBILITY in AgentPromptCard.
    useEffect(() => {
        const onCardVisibility = (e: Event) => {
            const visible = (e as CustomEvent<{ visible?: boolean }>).detail?.visible;
            setSupersededByCard(Boolean(visible));
        };
        window.addEventListener(AGENT_PROMPT_VISIBILITY, onCardVisibility);
        // Ask, rather than wait: the observer over there only fires when the
        // section crosses in or out of view, so a button mounting while it is
        // already on screen would sit on top of it until the next scroll.
        window.dispatchEvent(new Event(AGENT_PROMPT_QUERY));
        return () =>
            window.removeEventListener(AGENT_PROMPT_VISIBILITY, onCardVisibility);
    }, []);

    useEffect(() => {
        if (!isOpen || !pendingQuestion) return;
        setPendingQuestion(null);
        handleSendMessage(pendingQuestion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, pendingQuestion]);

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
            <div
                className={`ai-fab-group ${isOpen || supersededByCard ? 'hidden' : ''}`}
            >
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
                    {/* The header is gone, but the way out cannot be: on a
                        phone this window is the whole screen, so the close
                        button floats over the top-right corner instead. */}
                    <button className="ai-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <X size={18} weight="bold" />
                    </button>

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
