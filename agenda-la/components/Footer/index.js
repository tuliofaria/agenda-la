import DevPlenoLogo from './DevPlenoLogo'

const Footer = () => {
  return (
    <footer className='mt-12 text-center'>
      <div>
        <a href='https://go.devpleno.com/fsm'>
          <img src='/fsm.png' className='inline-block mx-2' />
        </a>
        <a href='https://devpleno.com'>
          <DevPlenoLogo className='inline-block mx-2' />
        </a>
      </div>
      <p className='font-bold'>Agenda Lá</p>
      <p>Projeto construido durante o Fullstack Academy</p>
      <p>
        do <a href='https://devpleno.com'>DevPleno</a>
      </p>
    </footer>
  )
}
export default Footer
