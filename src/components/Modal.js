import React, { useState, useEffect } from "react";

export default function Modal({
  isCorrect,
  turn,
  solution,
  newGame,
  setNewGameClick,
}) {
  // useEffect(() => {
  //   setSolution(getNewWord());
  // }, [newGame]);

  // const [newGameClick, setNewGameClick] = useState(false);

  // const newGames = () => {
  //   setTimeout(() => {
  //     setNewGameClick(true);
  //     setNewGameClick(false);
  //   }, 100);
  // };

  const handleNewGame = () => {
    setNewGameClick(true);
  };

  const handleGuessOutput = () => {
    if (turn === 1) {
      return <span>guess</span>;
    } else {
      return <span>guesses</span>;
    }
  };

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h2> You Win!!!</h2>

          <p className="solution">{solution} </p>
          <p className="youWon">
            You found the solution in {turn} {handleGuessOutput()}
          </p>
          <button onClick={() => window.location.reload(false)}>
            Play Again
          </button>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1> You Lost</h1>
          <p className="solution">{solution} </p>
          <p>Try again with a new word!!!</p>
          <button onClick={() => window.location.reload(false)}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
