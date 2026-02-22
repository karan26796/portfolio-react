const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

module.exports = async function handler(req, res) {
    // Allow requests from any origin (since this is public portfolio data)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { slug } = req.query;

    if (!slug) {
        return res.status(400).json({ message: 'Project slug is required' });
    }

    try {
        // 1. Query the database to find the page with the matching Name/Slug
        const databaseId = process.env.NOTION_DATABASE_ID;
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Name', // Assuming your title column is called "Name"
                title: {
                    equals: slug,
                },
            },
        });

        if (response.results.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const pageId = response.results[0].id;

        // 2. Fetch the blocks from the page and convert to markdown
        const mdblocks = await n2m.pageToMarkdown(pageId);
        let mdString = n2m.toMarkdownString(mdblocks);

        // Notion often wraps raw HTML pasted into it inside a ` ```markdown ` or ` ```html ` block.
        // We want to unwrap those so ReactMarkdown can render the raw HTML correctly.
        if (mdString.parent) {
            // Remove ```markdown <tag> ``` wrappers
            mdString.parent = mdString.parent.replace(/```(?:html|markdown)?\s*(<[\s\S]*?>)\s*```/g, '$1');
        }

        res.status(200).json({ content: mdString.parent });
    } catch (error) {
        console.error('Error fetching from Notion:', error.message || error);
        res.status(500).json({ message: 'Error fetching project data', error: error.message || error });
    }
}
