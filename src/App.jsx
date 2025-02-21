import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center text-white text-4xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
    >
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Function to check for a winner
  const checkWinner = (newSquares) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        return newSquares[a]; // Return the winner (X or O)
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] !== null || winner) return; // Prevent changes if there's a winner

    const newSquares = [...squares];
    newSquares[index] = player;
    setSquares(newSquares);

    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X"); // Toggle player turn
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        Tic-Tac-Toe
      </h1>

      <div className="grid grid-cols-3 gap-4 bg-gray-800 p-6 rounded-xl shadow-xl">
        {squares.map((sqr, index) => (
          <Square key={index} value={sqr} onClick={() => handleClick(index)} />
        ))}
      </div>

      {winner ? (
        <h2 className="text-2xl font-bold text-green-400 mt-6 animate-bounce">
          🎉 Winner: {winner} 🎉
        </h2>
      ) : (
        <h2 className="text-xl font-semibold mt-6">Player Turn: <span className="text-blue-400">{player}</span></h2>
      )}

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-110"
      >
        🔄 Reset Game
      </button>
    </div>
  );
}

export default App;
