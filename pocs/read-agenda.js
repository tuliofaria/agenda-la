require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '07be9a4620b041669bf511b1e39d4e04',
    page_size: 100,
    filter: {
      and: [
        {
          property: 'Date',
          date: {
            on_or_after: '2021-11-03',
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: '2021-11-06',
          },
        },
      ],
    },
  })
  const dates = data.results[0].properties
  console.log(dates)
  const blockedDays = data.results
    .map((result) => result.properties.Date.date.start)
    .map((date) => date.split('T')[0])
    .reduce((prev, curr) => {
      if (!prev[curr]) {
        prev[curr] = 0
      }
      prev[curr]++
      return prev
    }, {})

  console.log(blockedDays)
}

read()
