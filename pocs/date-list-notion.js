require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '3663ad36c1fa47b6bfc19213493ea495',
    page_size: 100,
    filter: {
      property: 'Date',
      date: {
        after: new Date(),
      },
    },
  })

  const blockedDays = data.results.map(
    (result) => result.properties.Date.date.start
  )

  console.log(blockedDays)

  const agora = new Date()

  // dias possiveis
  // desconsiderando sabados e domingos

  const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6
  const zeroPad = (number) => (number < 10 ? '0' + number : number.toString())
  const toDateString = (date) =>
    `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
      date.getDate()
    )}`
  const isBlocked = (date) => blockedDays.indexOf(date) >= 0

  const diasPossiveis = []
  for (let i = 0; i < 60; i++) {
    agora.setDate(agora.getDate() + 1)
    const dayOfWeek = agora.getDay()
    if (!isWeekend(dayOfWeek) && !isBlocked(toDateString(agora))) {
      diasPossiveis.push({
        date: toDateString(agora),
        dayOfWeek,
      })
    }
  }

  // dado uma lista de dias, separa em semanas
  let primeiroDia = null
  const semanas = []
  diasPossiveis.forEach((dia) => {
    if (primeiroDia === null) {
      primeiroDia = dia
    }
    if (dia.dayOfWeek === 5) {
      semanas.push({
        start: primeiroDia,
        end: dia,
      })
      primeiroDia = null
    }
  })
  console.log(semanas)
}

read()

/*
console.log(diasPossiveis)
*/
/*
console.log({
  agora,
  day: agora.getDate(),
  month: agora.getMonth(),
  year: agora.getFullYear(),
  dayOfWeek: agora.getDay(),
})
*/
