import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
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
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const hour = router?.query?.hour
  const day = router?.query?.date

  const save = async () => {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        day,
        hour,
        name,
        phone,
      }),
    })
    const json = await res.json()
    setSuccess(true)
  }

  return (
    <>
      <Head>
        <title>AgendaLá - Confirme seus dados</title>
      </Head>
      <h1 className='font-bold text-2xl'>
        Agendando para: {friendlyDate(day)} {hour}
      </h1>
      <p className='text-gray-500 mb-4'>Informe seus dados abaixo:</p>
      <p>
        <Link
          href={
            '/agende/' +
            router.query.startDate +
            '/' +
            router.query.endDate +
            '/' +
            router.query.date
          }
        >
          <a>Voltar</a>
        </Link>
      </p>
      <p>
        {success && (
          <div
            className='flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700'
            role='alert'
          >
            <svg
              className='w-5 h-5 inline mr-3'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <div>
              <span className='font-medium'>Agendado com sucesso!</span> muito
              obrigado.
            </div>
          </div>
        )}
        {!success && (
          <form>
            <label>Nome:</label>
            <br />
            <input
              type='text'
              name='name'
              onChange={(evt) => setName(evt.target.value)}
              value={name}
              className='mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
            <br />
            <label>Telefone:</label>
            <br />
            <input
              type='text'
              name='phone'
              onChange={(evt) => setPhone(evt.target.value)}
              value={phone}
              className='mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
            <br />
            <button
              type='button'
              onClick={save}
              className=' whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
            >
              Confirmar agendamento
            </button>
          </form>
        )}
      </p>
    </>
  )
}
export default AgendeDay
