import useSWR from 'swr'
import Link from 'next/link'
import Head from 'next/head'

const fetcher = async (url) => {
  const data = await fetch(url)
  const json = await data.json()
  return json
}

const friendlyDate = (date) => date.split('-').reverse().join('/')

const Agende = () => {
  const { data } = useSWR('/api/weeks', fetcher)
  return (
    <>
      <Head>
        <title>AgendaLá - Selecione a semana</title>
      </Head>
      <h1 className='font-bold text-2xl'>Agende</h1>
      <p className='text-gray-500 mb-4'>
        Selecione uma semana para agendar seu horário:
      </p>
      {!data && <p>Carregando...</p>}
      {data && (
        <div className='grid grid-cols-3 gap-4'>
          {data.weeks.map((week) => {
            return (
              <Link href={'/agende/' + week.start.date + '/' + week.end.date}>
                <a className='text-center inline-block py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 hover:shadow-lg transition-all'>
                  Semana de {friendlyDate(week.start.date)} -{' '}
                  {friendlyDate(week.end.date)}
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
export default Agende
