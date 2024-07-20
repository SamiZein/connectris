import React, { useState } from 'react';

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = () => {
  let board = [];
  for (let row = 0; row < ROWS; row++) {
    board[row] = Array(COLS).fill(null);
  }
  return board;
};

const ConnectFour = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [isProcessing, setIsProcessing] = useState(false);
  const [redScore, setRedScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);



  const dropTile = (col) => {
    if (isProcessing) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = board.map((row) => row.slice());
        newBoard[row][col] = currentPlayer;
        setTimeout(() => {
          setBoard(newBoard);
       }, 100);
        setIsProcessing(true);
        handleConnectFours(newBoard);
        setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
        setIsProcessing(false);
        return;
      }
    }
    alert('Column is full!');
  };

  const handleConnectFours = (board) => {
    let markedBoard = markAllWins(board);
    if (markedBoard) {
      setTimeout(() => {
          setBoard(markedBoard);
          setTimeout(() => {
            const newBoard = removeMarkedTiles(markedBoard);
            setBoard(newBoard);
            handleConnectFours(newBoard);
          }, 500);
      }, 500);
      
      
    }
  };

  const markAllWins = (board) => {
    const directions = [
      { rowDir: 1, colDir: 0 },
      { rowDir: 0, colDir: 1 },
      { rowDir: 1, colDir: 1 },
      { rowDir: 1, colDir: -1 }
    ];

    let markedBoard = board.map(row => row.slice());
    let hasConnectFour = false;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col] !== null) {
          for (let { rowDir, colDir } of directions) {
            if (checkDirection(board, row, col, board[row][col], rowDir, colDir, markedBoard)) {
              hasConnectFour = true;
            }
          }
        }
      }
    }
    return hasConnectFour ? markedBoard : null;
  };

  const checkDirection = (board, row, col, player, rowDir, colDir, markedBoard) => {
    let count = 0;
    let positions = [];

    for (let i = 0; i < 4; i++) {
      const newRow = row + i * rowDir;
      const newCol = col + i * colDir;
      if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== player) {
        break;
      }
      positions.push({ row: newRow, col: newCol });
      count++;
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - i * rowDir;
      const newCol = col - i * colDir;
      if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== player) {
        break;
      }
      positions.push({ row: newRow, col: newCol });
      count++;
    }

    if (count >= 4) {
      for (let pos of positions) {
        markedBoard[pos.row][pos.col] = null;
      }
      return true;
    }
    return false;
  };

  const removeMarkedTiles = (board) => {
    let newBoard = board.map(row => row.slice());

    for (let col = 0; col < COLS; col++) {
      let newCol = newBoard.map(row => row[col]).filter(cell => cell !== null);
      while (newCol.length < ROWS) {
        newCol.unshift(null);
      }
      for (let row = 0; row < ROWS; row++) {
        newBoard[row][col] = newCol[row];
      }
    }
    return newBoard;
  };

  return (
    <div>
      <h1>Connect Four</h1>
      <div className="flex">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 64px)` }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                className={`border border-black ${!cell?'bg-white':cell=='Red'?'bg-red-500':'bg-yellow-300'} rounded-full w-16 h-16 items-center`}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => dropTile(colIndex)}
              />
            ))
          )}
        </div>
        <button onClick={() => {
          setBoard(createEmptyBoard());
          setCurrentPlayer('Red');
        }}>Reset Game</button>
        <div>
          <h2>Score Board</h2>
          <div className="flex space-x-3">
            <div className="flex flex-col items-center">
              <div className={`size-4 rounded-full ${currentPlayer=='Red'?'bg-red-500':'bg-gray-500'}`} />
              <h3>Red</h3>
              <h3>{redScore}</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className={`size-4 rounded-full ${currentPlayer=='Yellow'?'bg-yellow-300':'bg-gray-500'}`} />
              <h3>Yellow</h3>
              <h3>{yellowScore}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectFour;
