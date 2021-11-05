const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6
export const zeroPad = (number) =>
  number < 10 ? '0' + number : number.toString()
const toDateString = (date) =>
  `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
    date.getDate()
  )}`
const isBlocked = (blockedDays, date) => blockedDays.indexOf(date) >= 0

export const getPossibleDays = (blockedDays = [], numberOfDays = 60) => {
  const today = new Date()
  const possibleDays = []
  for (let i = 0; i < numberOfDays; i++) {
    today.setDate(today.getDate() + 1)
    const dayOfWeek = today.getDay()
    if (!isWeekend(dayOfWeek) && !isBlocked(blockedDays, toDateString(today))) {
      possibleDays.push({
        date: toDateString(today),
        dayOfWeek,
      })
    }
  }
  return possibleDays
}

export const extractPossibleWeeks = (possibleDays) => {
  let firstDayOfWeek = null
  const weeks = []
  possibleDays.forEach((currentDay) => {
    if (firstDayOfWeek === null) {
      firstDayOfWeek = currentDay
    }
    if (currentDay.dayOfWeek === 5) {
      weeks.push({
        start: firstDayOfWeek,
        end: currentDay,
      })
      firstDayOfWeek = null
    }
  })
  return weeks
}
