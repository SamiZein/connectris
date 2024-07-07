import { useState } from 'react'
import Board from './assets/Connect4Board.png'
import Column from './Column'
import Tile from './Tile'


function App() {
  const [columns, setColumns] = useState([[],[],[],[],[],[], []])
  const addTile = (columnIndex) => () => {
    
    if (columns[columnIndex].length > 6) return
    console.log(columnIndex)
    console.log("in addTile function")
    const newColumns = [...columns]
    newColumns[columnIndex].push(<Tile className="bg-red-500" />)
    setColumns(newColumns)
  }

  return (
    <div onClick={addTile}>
      <div className="h-[29.7rem] ml-4 absolute flex space-x-[1.2rem]">
        {columns.map((column, index) =>  
          <div className="h-auto flex justify-end" key={index} onClick={addTile(index)}>
            <Column tiles={column} />
          </div>)
        }
      </div>
      
      <img src={Board} alt="board" />

    </div>
  )
}

export default App
