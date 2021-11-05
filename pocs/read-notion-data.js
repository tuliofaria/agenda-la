require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '3663ad36c1fa47b6bfc19213493ea495',
    page_size: 100,
  })
  data.results.forEach((result) => {
    const blockedDate = result.properties.Date.date.start
    console.log(blockedDate)
  })
}

read()

console.log(process.env.NOTION_DB_AGENDA_NEG)
