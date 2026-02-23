const { Client } = require("@notionhq/client");

// Initialize Notion client (Vercel automatically injects env vars)
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async function handler(req, res) {
    // Setup CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') // Allow all origins for the portfolio
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    equals: true
                }
            },
            sorts: [
                {
                    property: "Order",
                    direction: "ascending"
                }
            ]
        });

        const projects = response.results.map((page) => {
            const getRichText = (prop) => (prop && prop.rich_text && prop.rich_text.length > 0) ? prop.rich_text[0].plain_text : "";

            const rawName = (page.properties.Name && page.properties.Name.title.length > 0) ? page.properties.Name.title[0].plain_text : "";
            // Strip out "Project" from the name if it exists to just get the ID integer string
            const id = rawName.replace("Project", "").trim();

            const tags = page.properties.tags ? page.properties.tags.multi_select.map(t => t.name) : [];
            let type = "client"; // default
            if (tags.includes("personal") || tags.includes("Personal")) {
                type = "personal";
            }

            let img = "";
            if (page.cover) {
                if (page.cover.type === "external") {
                    img = page.cover.external.url;
                } else if (page.cover.type === "file") {
                    img = page.cover.file.url;
                }
            }
            if (!img && page.properties["Thumbnail URL"] && page.properties["Thumbnail URL"].url) {
                img = page.properties["Thumbnail URL"].url;
            }

            return {
                id: id || rawName,
                title: getRichText(page.properties.Title),
                description: getRichText(page.properties.Description),
                img: img,
                tags: tags,
                type: type,
                details: getRichText(page.properties.Details),
                meta: {
                    duration: getRichText(page.properties.Duration),
                    role: getRichText(page.properties.Role),
                    scope: getRichText(page.properties.Scope),
                    impact: getRichText(page.properties.Impact),
                }
            };
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects from Notion:', error.message || error);
        res.status(500).json({ message: 'Error fetching project data', error: error.message || error });
    }
}
