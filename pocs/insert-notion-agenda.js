require('dotenv').config()

const { Client } = require('@notionhq/client')

const registro = {
  Confirmado: { id: 'QRub', type: 'checkbox', checkbox: false },
  Paciente: {
    id: 'cdqn',
    type: 'rich_text',
    rich_text: [{ text: { content: 'Tulio Faria 3' } }],
  },
  Date: {
    id: 'edEd',
    type: 'date',
    date: { start: '2021-11-02T12:00:00.000-03:00', end: null },
  },
  Name: {
    id: 'title',
    type: 'title',
    title: [{ text: { content: 'Tulio Faria 3' } }],
  },
}

const insert = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const inserted = await notion.pages.create({
    parent: {
      database_id: '07be9a4620b041669bf511b1e39d4e04',
    },
    properties: registro,
  })
  console.log(inserted)

  /*
  const data = await notion.databases.query({
    database_id: '07be9a4620b041669bf511b1e39d4e04',
    page_size: 100,
  })
  data.results.forEach((result) => {
    const properties = result.properties
    console.log(properties)
    console.log(properties.Name)
    console.log(properties.Paciente)
  })*/
}

insert()

console.log(process.env.NOTION_DB_AGENDA_NEG)
