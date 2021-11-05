require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '07be9a4620b041669bf511b1e39d4e04',
    page_size: 100,
  })
  data.results.forEach((result) => {
    const properties = result.properties
    console.log(properties)
  })
}

read()

console.log(process.env.NOTION_DB_AGENDA_NEG)
