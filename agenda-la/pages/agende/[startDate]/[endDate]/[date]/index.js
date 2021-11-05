import useSWR from 'swr'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

const fetcher = async (url) => {
  const data = await fetch(url)
  const json = await data.json()
  return json
}

const friendlyDate = (date) => (date ? date.split('-').reverse().join('/') : '')

const daysOfWeekNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const AgendeDay = () => {
  const router = useRouter()
  const { data } = useSWR(
    router.query.startDate ? '/api/hours?date=' + router.query.date : null,
    fetcher
  )

  return (
    <>
      <Head>
        <title>AgendaLá - Selecione o horário</title>
      </Head>
      <h1 className='font-bold text-2xl'>Agende</h1>
      <p className='text-gray-500 mb-4'>
        Selecione um dia para agendar seu horário: (semana selecionada:{' '}
        {friendlyDate(router.query.startDate)} -{' '}
        {friendlyDate(router.query.endDate)} )
      </p>
      <p>
        <Link
          href={
            '/agende/' + router.query.startDate + '/' + router.query.endDate
          }
        >
          <a>Voltar</a>
        </Link>
      </p>
      {!data && <p>Carregando...</p>}
      {data && (
        <div className='grid grid-cols-3 gap-4'>
          {data.hours.map((hour) => {
            if (hour.available) {
              return (
                <Link
                  href={
                    '/agende/' +
                    router.query.startDate +
                    '/' +
                    router.query.endDate +
                    '/' +
                    router.query.date +
                    '/' +
                    hour.hour
                  }
                >
                  <a className='text-center inline-block py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 hover:shadow-lg transition-all'>
                    {hour.hour} <br />
                  </a>
                </Link>
              )
            }
            return (
              <span className='text-center inline-block py-2 px-4 bg-gray-300 rounded text-gray-400 cursor-not-allowed'>
                {hour.hour}
              </span>
            )
          })}
        </div>
      )}
    </>
  )
}
export default AgendeDay
