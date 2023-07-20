import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'



function Cell({ value, onCellClick }) {
  return <button className="cell"
  onClick={onCellClick}>
    {value}
  </button>;
}

export default function GameContainer() {
  const [xIsNext, setXIsNext] = useState(true);
  const [cells, setCells] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (cells[i] || calculateWinner(cells)) {
      return;
    }
    const nextCells = cells.slice();
    if (xIsNext) {
      nextCells[i] = "X";
    } else {
      nextCells[i] = "O";
    }
    setCells(nextCells);
    setXIsNext(!xIsNext);
  }



  const winner = calculateWinner(cells);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
    <span className="status">{status}</span>
    <div className="game-container">
        <Cell value={cells[0]} onCellClick={() => handleClick(0)} />
        <Cell value={cells[1]} onCellClick={() => handleClick(1)} />
        <Cell value={cells[2]} onCellClick={() => handleClick(2)} />
      </div>
      <div className="game-container">
        <Cell value={cells[3]} onCellClick={() => handleClick(3)} />
        <Cell value={cells[4]} onCellClick={() => handleClick(4)} />
        <Cell value={cells[5]} onCellClick={() => handleClick(5)} />
      </div>
      <div className="game-container">
        <Cell value={cells[6]} onCellClick={() => handleClick(6)} />
        <Cell value={cells[7]} onCellClick={() => handleClick(7)} />
        <Cell value={cells[8]} onCellClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

