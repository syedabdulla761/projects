import { useState } from "react"
import Gameboard from "./components/Gameboard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    'X': "Player 1",
    'O': "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns)

  let gameboard = [...initialGameboard.map(array => [...array])];

  let winner = null;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combination[0].row][combination[0].column];
    const secondSquare = gameboard[combination[1].row][combination[1].column];
    const thirdSquare = gameboard[combination[2].row][combination[2].column];

    if (firstSquare && firstSquare == secondSquare && firstSquare == thirdSquare) {
      winner = players[firstSquare];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newPlayer) {
    setPlayers(existing => (
      {
        ...existing,
        [symbol]: newPlayer
      }
    ));
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            OnChangeName={handlePlayerNameChange} />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            OnChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} OnRematch={handleRematch} />}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          Board={gameboard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
