import { getBlockedDays } from '../../lib/notion'
import { extractPossibleWeeks, getPossibleDays } from '../../lib/date-handler'

export default async function (req, res) {
  const days = await getBlockedDays()
  const possibleDays = getPossibleDays(days)
  const weeks = extractPossibleWeeks(possibleDays)
  res.send({
    weeks,
  })
}
