import { useState } from 'react'
import BoardImage from './assets/Connect4Board.png'
import Column from './Column'
import Tile from './Tile'
import Board from './Board'


function App() {
  const [columns, setColumns] = useState([[],[],[],[],[],[], []])

  const removeTiles = (column) => {
    if (columns[column].length == 0) return
    const row = columns[column].length - 1
    
    const color = columns[column][-1]
    
    const newColumns = [...columns]

    //checking bottom left to top right
    let streakLeft = 0
    for (let c = column - 1; c >= 0; c--) {
      if (columns[c].length > row - c && (columns[c][row - (column - c)] === color || columns[c][row - (column - c)] === 'remove')) streakLeft++
      else break
    }
    let streakRight = 0
    for (let c = column + 1; c < 7; c++) {
      if (columns[c].length > row + c && (columns[c][row + (c - column)] === color || columns[c][row + (c - column)] === 'remove')) streakRight++
      else break
    }
    console.log(streakLeft, streakRight)

    if (streakLeft + streakRight + 1 >= 4) {
      for (let c = column - streakLeft; c <= column + streakRight; c++) { 
        newColumns[c][row-streakLeft+c] = 'remove'
      }
    }

    //Check top left to bottom right
    streakLeft = 0
    for (let c = column - 1; c >= 0; c--) {
      if (columns[c].length > row - c && (columns[c][row + (column - c)] === color && columns[c][row + (column - c)] !== 'remove')) streakLeft++
      else break
    }
    streakRight = 0
    for (let c = column + 1; c < 7; c++) {
      if (columns[c].length > row + c && (columns[c][row - (c - column)] === color && columns[c][row - (c - column)] !== 'remove')) streakRight++
      else break
    }
    console.log(streakLeft, streakRight)
    if (streakLeft + streakRight + 1 >= 4) {
      for (let c = column - streakLeft; c <= column + streakRight; c++) { 
        newColumns[c][row+streakLeft-(c-column-streakLeft)] = 'remove'
      }
    }
    for (let column of newColumns) {
      for (let tile of column) {
        if (tile === 'remove') column.splice(column.indexOf(tile), 1)
      }
    }
    setColumns(newColumns)
  }

  const addTile = (columnIndex) => () => {
    if (columns[columnIndex].length > 6) return
    const newColumns = [...columns]
    newColumns[columnIndex].push("red")
    setColumns(newColumns)
    removeTiles(columnIndex)
  }

  return (
    <>
      <Board />
      <div onClick={addTile}>
        <div className="h-[29.7rem] ml-4 absolute flex space-x-[1.2rem]">
          {columns.map((column, index) =>  
            <div className="flex justify-end h-auto" key={index} onClick={addTile(index)}>
              <Column tiles={column} />
            </div>)
          }
        </div>
        
        <img src={BoardImage} alt="board" />

      </div>
    </>
  )
}

export default App
