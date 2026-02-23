require('dotenv').config({ path: '.env' });
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function checkSchema() {
    try {
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log("Database Title:", response.title[0]?.plain_text);
        console.log("--- PROPERTIES ---");
        for (const [key, value] of Object.entries(response.properties)) {
            console.log(`- ${key} (${value.type})`);
        }
    } catch (error) {
        console.error("Error:", error.message || error);
    }
}

checkSchema();
