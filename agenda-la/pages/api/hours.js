import { getAvailableHours } from '../../lib/notion'

export default async function (req, res) {
  const { date } = req.query
  const hours = await getAvailableHours(date)

  res.send({
    hours,
  })
}
