require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

async function testFetch() {
    console.log('Testing Notion API...');
    console.log('Using DB ID:', process.env.NOTION_DATABASE_ID);

    try {
        const databaseId = process.env.NOTION_DATABASE_ID;
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Name',
                title: {
                    equals: 'Project6',
                },
            },
        });

        console.log(`Found ${response.results.length} results matching 'Project6'.`);

        if (response.results.length === 0) {
            console.log('Try querying without the filter to see what is available...');
            const allRes = await notion.databases.query({ database_id: databaseId });
            console.log(`Total rows in DB: ${allRes.results.length}`);

            if (allRes.results.length > 0) {
                // Log the properties to see what the 'Name' column is actually called
                console.log('Available properties for the first row:', Object.keys(allRes.results[0].properties));
            }
            return;
        }

        const pageId = response.results[0].id;
        console.log('Found page ID:', pageId);

        const mdblocks = await n2m.pageToMarkdown(pageId);
        const mdString = n2m.toMarkdownString(mdblocks);

        console.log('\n--- Markdown Content Preview ---');
        console.log(mdString.parent?.substring(0, 200) + '...');
        console.log('--------------------------------\n');
        console.log('Success!');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testFetch();
