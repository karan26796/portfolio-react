require('dotenv').config({ path: '.env' });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const projects = [
    {
        id: "6",
        description: 'Designed a flexible, points-based recognition system that secured 10+ enterprise clients within 5 months.',
        title: "Building a Continuous Rewards Ecosystem",
        img: "/project-imgs/continuous rewards/Thumb.webp",
        tags: ["Systems Thinking", "Revenue Growth"],
        type: "client",
        details: "Keka / 2024",
        meta: {
            duration: "Jun 2024 – Nov 2024",
            role: "Lead Product Designer",
            scope: "B2B Reward & Recognition System",
            impact: "Directly contributed to securing 10+ enterprise accounts."
        }
    },
    {
        id: "2",
        description: "Architected qualitative data analysis tools to streamline insight discovery for global research teams.",
        title: "Looppanel: Data to Insight Pipeline",
        img: "/project-imgs/looppanel-insights/insight-thumb.gif",
        tags: ["Data Analysis", "Research Ops"],
        type: "client",
        details: "Looppanel / Founding Designer",
        meta: {
            duration: "Apr 2022 – Jun 2022",
            role: "Founding Designer",
            scope: "Qualitative Data Analysis Suite",
            impact: "Significantly improved insight discovery velocity for cross-functional teams."
        }
    },
    {
        id: "7",
        description: 'Scaled weekly engagement from 15k to 100k users by redesigning the workplace celebrations framework.',
        title: "Revolutionizing Workplace Celebrations at Keka",
        img: "/project-imgs/kekawish/thumb-cr.webp",
        tags: ["Product Design", "Design Strategy"],
        type: "client",
        details: "Keka / 2025",
        meta: {
            duration: "Nov 2024 – Jan 2025",
            role: "Design Strategy & Execution",
            scope: "Enterprise Engagement System",
            impact: "5x increase in employee engagement and 3x adoption growth."
        }
    },
    {
        id: "1",
        description: "Designed a Zoom-integrated note-taker that reduced research time-to-insights by 5x.",
        title: "Accelerating Research Workflows at Looppanel",
        img: "/project-imgs/loop-note/loop-note.gif",
        tags: ["AI & Automation", "Productivity"],
        type: "client",
        details: "Looppanel / Founding Designer",
        meta: {
            duration: "Jan 2022 – Mar 2022",
            role: "Founding Designer",
            scope: "AI-Powered Research Bot",
            impact: "Reduced synthesis time by 5x through workflow automation."
        }
    },
    {
        id: "5",
        description: "Found ways to better discoverabilty of features & data organization.",
        title: "Product redesign for features discovery & data re-organization.",
        img: "/project-imgs/loop-research/loop-research.gif",
        tags: ["Product", "Design research"],
        type: "client",
        details: "Looppanel / Founding Designer",
        meta: {
            duration: "Mid 2022",
            role: "Product Designer",
            scope: "Information Architecture revamp",
            impact: "Increased discoverability of features and customer satisfaction."
        }
    },
    {
        id: "4",
        description: "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
        title: "Mindful Hardware: Tackling Binge Behavior",
        img: "/project-imgs/binge-eating/binge.gif",
        tags: ["IoT", "Behavioral Design"],
        type: "client",
        details: "Master's Project / NID",
        meta: {
            duration: "Aug 2022 – Oct 2022",
            role: "Research & Industrial Design",
            scope: "Behavioral Intervention Device",
            impact: "Developed a functional prototype for emotional regulation."
        }
    }
];

// For the image URL, since they are local paths like /project-imgs/...,
// we need to give them a raw URL. We'll link to the github raw or the production URL.
const baseUrl = "https://kadankapoor.com";

async function pushToNotion() {
    console.log("Starting migration...");

    // 1. Fetch existing pages to decide creating vs updating
    const existingPages = {};
    const queryResponse = await notion.databases.query({ database_id: databaseId });
    for (const page of queryResponse.results) {
        if (page.properties.Name && page.properties.Name.title.length > 0) {
            existingPages[page.properties.Name.title[0].plain_text] = page.id;
        }
    }

    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        const projectName = `Project${p.id}`;

        // We didn't get Type from User schema, so we push `type` to tags
        const allTags = [...p.tags.map(t => ({ name: t }))];

        const props = {
            "Name": { title: [{ text: { content: projectName } }] },
            "Title": { rich_text: [{ text: { content: p.title } }] },
            "Description": { rich_text: [{ text: { content: p.description } }] },
            "Details": { rich_text: [{ text: { content: p.details } }] },
            "Role": { rich_text: [{ text: { content: p.meta.role } }] },
            "Scope": { rich_text: [{ text: { content: p.meta.scope } }] },
            "Impact": { rich_text: [{ text: { content: p.meta.impact } }] },
            "Duration": { rich_text: [{ text: { content: p.meta.duration } }] },
            "Order": { number: i + 1 },
            "Published": { checkbox: true },
            "tags": { multi_select: allTags },
            "Thumbnail URL": { url: `${baseUrl}${p.img}` }
        };

        try {
            if (existingPages[projectName]) {
                console.log(`Updating existing page for ${projectName}...`);
                await notion.pages.update({
                    page_id: existingPages[projectName],
                    properties: props
                });
            } else {
                console.log(`Creating new page for ${projectName}...`);
                await notion.pages.create({
                    parent: { database_id: databaseId },
                    properties: props
                });
            }
            console.log(`✓ Success: ${projectName}`);
        } catch (e) {
            console.error(`X Failed: ${projectName}`, e?.body ? e.body : e.message);
        }
    }
    console.log("Migration complete!");
}

pushToNotion();
