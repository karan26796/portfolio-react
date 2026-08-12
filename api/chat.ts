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
# Interview Questions & Answers — Karan Kapoor

## About Karan
- Experience: 7 years across B2B and B2C startups (Keka HR, Obvious, Looppanel, Aphelia).
- Education: Master's in Design (M.Des) from NID Ahmedabad, B.Tech from Bharati Vidyapeeth's COE Delhi.
- Current Role: Senior Product Designer at Keka HR, owning product strategy for Rewards, Recognition, HR Helpdesk, and Survey tools for 2.2M+ users.
- Location: Hyderabad, India. Open to remote, hybrid, or relocation.

## Design Process & Craft
Q: Walk me through your end-to-end design process?
A: For big projects: deep research (competitor analysis, customer calls, stakeholder alignment) then design. For smaller projects: jump into an AI-assisted prototype to align stakeholders before user testing. Common thread: understand problem deeply, ship fast, iterate.

Q: What design tools are you most proficient in?
A: Figma (Figma trainer), Claude + Google AI Studio for prototypes & research, Framer for interactive demos, Gamma for presentations, Antigravity / Xcode for vibe-coded front-ends.

Q: How do you handle disagreements with PMs or engineers?
A: Back position with data — customer verbatims, usage metrics, or a quick prototype that makes the idea tangible. Shifts conversation from "opinion vs opinion" to "what does the customer actually need."

Q: How do you measure design success after launch?
A: Set success criteria before starting — qualitative (support tickets, CS calls, sales feedback) and quantitative (adoption, retention, engagement). Also watch for silence on a feature that used to generate complaints.

Q: Which project was the most challenging?
A: Revamping the Awards Program & Looppanel's Highlights view — bulk tagging and summary of qualitative research notes with severe tech constraints. Required first-principles thinking about how researchers actually synthesize data.

Q: Example of using data to drive a decision?
A: Keka Wall engagement was falling. Usage trends + competitor benchmarking led to adding a dedicated "Wish" CTA, boosting engagement 5x.

## Roles & Career
Q: What roles is Karan looking for?
A: Lead, Staff or Design Manager roles in companies building complex B2B SaaS or enterprise software.

Q: Is Karan open to remote work?
A: Yes — remote-first is fine. Experienced in remote and hybrid setups across time zones.

Q: Does Karan manage other designers?
A: Yes — at Keka mentored junior and mid-level designers, ran critique sessions, shaped design culture. Open to lead or player-coach roles.

Q: What industries has Karan worked in?
A: HR Tech (Keka), UX Research Tools (Looppanel), Consumer Apps (Grab, Guesthouser), EdTech (FrontRow).

## Collaboration & Leadership
Q: How does Karan work with engineers?
A: Detailed Figma specs with annotated edge cases, component states, async Loom walkthroughs for complex flows, frequent syncs, and co-creation sessions.

Q: How does Karan approach stakeholder buy-in?
A: Making decisions visible early through lightweight prototypes, annotated explorations, and design reviews in Figma before code is written.

Q: How does Karan handle ambiguous briefs?
A: Ask "what does success look like in 6 months?" first, then map backward. Comfortable with ambiguity if there's a clear signal of what's broken.

## Handoff, Systems & Delivery
Q: Design handoff process?
A: Continuous handoff. Figma files organized by user flow with every state annotated. Dev Mode / Code Connect for specs and tokens. Loom videos for complex logic. Active in build channels for same-day answers.

Q: Working with design systems?
A: Read documentation thoroughly, reuse existing components. Propose new components with documentation when needed.

Q: Accessibility approach?
A: Built in at design stage (contrast ratios, focus states, alt-text guidance).

Q: Feedback & critique process?
A: Understand the problem fully before commenting, evaluate based on project goals.

Q: Onboarding onto a new team?
A: Audit existing flows, read documentation, understand the problem space first.

Q: Backlog prioritization?
A: Focus on what we are trying to solve and high-impact solutioning.

Q: Mistake learned from?
A: Designing only for the screen without thinking of user's physical context.

Q: Ideal team culture?
A: Teams that treat design as an equal strategic product partner.

Q: Mentoring designers?
A: Paired critique guiding designers to uncover reasoning gaps themselves.

## Contact & Resume
- Contact: LinkedIn (linkedin.com/in/karankapoorux) checked daily.
- Resume: Downloadable at kadankapoor.com/resume.
`;

        const { messages, pageContext, pageType } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages array' });
        }

        const isProjectPage = pageType !== 'home' && !!pageContext;

        const latestUserMessage = messages[messages.length - 1].content;

        let contextInstruction = "";
        if (pageContext) {
            contextInstruction = `\n\nCURRENT PAGE CONTENT / CASE STUDY TEXT:\n"${pageContext.slice(0, 3000)}"`;
        }

        const pageSpecificInstructions = isProjectPage
            ? `2. The user is reading a specific project case study. If asked to summarize it, provide a concise 3-bullet summary grounded in the CURRENT PAGE CONTENT above — do not invent details not present there.
3. If asked about Karan's role on this project, state his specific responsibilities (design lead, UX research, component design, engineering handoff) as they relate to this case study.
4. If asked about challenges, ground the answer in this specific project's constraints, not generic ones.`
            : `2. The user is on Karan's home/landing page — there is no single project in view. Do NOT offer to "summarize the project"; instead answer from his overall background, process, and career knowledge base.
3. If asked what he's looking for, point to roles, industries, and availability from the knowledge base.
4. If the question implies a specific case study, suggest browsing a project on the portfolio and answer generally in the meantime.`;

        const FINAL_SYSTEM_PROMPT = `
You are Agent Vinod, an AI assistant representing Karan Kapoor (Product Designer).
Your sole purpose is to answer the user's prompt directly, accurately, and politely based on Karan's portfolio, background, and current page context.

KNOWLEDGE BASE:
${interviewQaText}
${contextInstruction}

STRICT INSTRUCTIONS:
1. Always answer the user's EXACT question directly first.
${pageSpecificInstructions}
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

        // Output follow-up prompts, tailored to the page and skipping anything already asked
        const PROMPT_POOL = isProjectPage
            ? [
                "Can you summarize this project?",
                "What was my role here?",
                "What was the biggest challenge?",
                "What was the impact of this project?",
                "How did you work with engineers on this?"
            ]
            : [
                "What roles are you looking for?",
                "Are you open to remote work?",
                "What's your design process?",
                "How do you handle disagreements with PMs?",
                "How can I contact you?"
            ];

        const askedSoFar = messages
            .map((m: any) => (typeof m.content === 'string' ? m.content.toLowerCase() : ''))
            .join(' ');
        const nextPrompts = PROMPT_POOL
            .filter((p) => !askedSoFar.includes(p.toLowerCase()))
            .slice(0, 3);

        const followUpPrompts = `\n|${JSON.stringify(nextPrompts.length > 0 ? nextPrompts : PROMPT_POOL.slice(0, 3))}`;
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
