import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 20; // 20 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return false;
    }
    if (now - record.lastReset > RATE_LIMIT_WINDOW) {
        record.count = 1;
        record.lastReset = now;
        return false;
    }
    record.count += 1;
    return record.count > RATE_LIMIT_MAX;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute before sending another message.' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY environment variable is not configured');
            return res.status(500).json({ error: 'AI Assistant key not configured' });
        }

        const interviewQaText = `
Q: Who is Karan Kapoor?
A: Karan Kapoor is a Senior Product Designer with ~7 years of experience in B2B SaaS, enterprise HR tools, design systems, and AI-assisted workflows. He's based in Hyderabad, India and currently works at Keka HR. He holds a Master's in Design (M.Des) from NID Ahmedabad and a B.Tech in Electronics & Communication.

Q: What is his current role?
A: Senior Product Designer at Keka HR (2023–Present). He leads design for Rewards & Recognition, HR Helpdesk, and Surveys across enterprise SaaS products used by 2.2M+ active users.

Q: What are his past roles?
A: 
- Founding Product Designer at Looppanel (2022) — Built automated qualitative UX research synthesis tooling.
- Founding Designer at Aphelia Innovation (2021–2022) — 0-to-1 product design for early-stage B2B SaaS.
- Product Designer at Obvious (2019–2021) — Designed digital products for Indiana University, FrontRow, Zuddl.

Q: What tools and skills does he use?
A: Figma (expert & trainer), React, TypeScript, SCSS, Design Systems, Prototyping, AI Workflows (Cursor, Claude, Gemini), User Research, Information Architecture.

Q: What roles is he looking for?
A: Lead Product Designer, Staff Product Designer, or Design Manager in B2B SaaS / tech-driven product companies. Open to remote, hybrid, or relocation.
`;

        const { messages, pageContext } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages array' });
        }

        const latestUserMessage = messages[messages.length - 1].content;

        let contextInstruction = "";
        if (pageContext) {
            contextInstruction = `\n\nCURRENT PAGE CONTENT / CASE STUDY TEXT:\n"${pageContext.slice(0, 3000)}"`;
        }

        const FINAL_SYSTEM_PROMPT = `
You are Agent Vinod, an AI assistant representing Karan Kapoor (Product Designer).
Your sole purpose is to answer the user's prompt directly, accurately, and politely based on Karan's portfolio, background, and current page context.

KNOWLEDGE BASE:
${interviewQaText}
${contextInstruction}

STRICT INSTRUCTIONS:
1. Always answer the user's EXACT question directly first.
2. If asked to summarize the project, provide a concise 3-bullet summary of the case study.
3. If asked about Karan's role, state his specific responsibilities (Lead Product Designer, UX research, component design, engineering handoff).
4. If asked about challenges, highlight balancing enterprise complexity with intuitive UI.
5. Keep answers friendly, professional, structured in clean markdown, and focused on the user's prompt.
`;

        const history = messages
            .slice(0, -1)
            .filter((msg: any, idx: number) => !(idx === 0 && msg.role === 'bot'))
            .map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

        // Candidate Models Array for robust API resolution
        const candidateModels = Array.from(new Set([
            process.env.GEMINI_MODEL,
            "gemini-2.0-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-002",
            "gemini-1.5-flash",
            "gemini-1.5-pro-latest",
            "gemini-1.5-pro",
            "gemini-pro"
        ].filter(Boolean))) as string[];

        const genAI = new GoogleGenerativeAI(apiKey);
        let resultStream = null;
        let lastError = null;

        for (const mName of candidateModels) {
            try {
                const model = genAI.getGenerativeModel({
                    model: mName,
                    systemInstruction: FINAL_SYSTEM_PROMPT,
                    generationConfig: {
                        temperature: 0.5,
                        topK: 40,
                        topP: 0.9,
                    }
                });

                const chat = model.startChat({
                    history: history
                });

                const resStream = await chat.sendMessageStream(latestUserMessage);
                resultStream = resStream;
                console.log(`Successfully connected using Gemini model: ${mName}`);
                break;
            } catch (err: any) {
                console.warn(`Gemini model ${mName} failed:`, err?.message || err);
                lastError = err;
            }
        }

        if (!resultStream) {
            throw lastError || new Error("Failed to initialize any Google Gemini model.");
        }

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of resultStream.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }

        // Output follow-up prompts
        const followUpPrompts = `\n|["Can you summarize this project?", "What was my role here?", "What was the biggest challenge?"]`;
        res.write(followUpPrompts);

        res.end();
    } catch (error: any) {
        console.error('Error in chat API handler:', error);
        if (!res.headersSent) {
            res.status(500).json({
                error: 'Internal server error',
                details: error?.message || 'Failed to process request'
            });
        } else {
            res.write("\n\n*Error generating response. Please try again.*");
            res.end();
        }
    }
}
