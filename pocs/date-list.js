const agora = new Date()

// dias possiveis
// desconsiderando sabados e domingos
const diasPossiveis = []
for (let i = 0; i < 60; i++) {
  agora.setDate(agora.getDate() + 1)
  const dayOfWeek = agora.getDay()
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    diasPossiveis.push({
      date: agora.toString(),
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
