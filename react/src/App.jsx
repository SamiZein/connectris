import { useState } from 'react'
import Board from './assets/Connect4Board.png'
import Column from './Column'

function App() {

  return (
    <div>
      <div className="h-[29.7rem] ml-4 absolute flex items-end space-x-[1.2rem]">
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
      </div>
      
      <img src={Board} alt="board" />

    </div>
  )
}

export default App
