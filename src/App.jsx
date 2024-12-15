import { useState } from 'react'
import './App.css'
import Game from './pages/components/Game'

function App()
{
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container mx-auto'>
        <Game />
      </div>
    </>
  )
}

export default App
