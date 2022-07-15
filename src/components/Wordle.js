import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
export default function Wordle({ solution, letters }) {
  const {
    currentGuess,
    handleKeyUp,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    newGame,
  } = useWordle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      console.log("you won");
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (solution.length === 6 && turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      console.log("out of turns");
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > solution.length) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      console.log("out of turns");
      window.removeEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, isCorrect, turn, solution]);

  const sixLetters = () => {
    if (solution.length === 6) {
      return <div>This is a 6 letter word</div>;
    }
    if (solution.length === 5) {
      return <div>This is a 5 letter word</div>;
    }
  };

  return (
    <div>
      {/* Wordle solution = {solution} */}

      {console.log(solution)}

      {/* <button onClick={newGame}>click me</button> */}

      <div style={{ fontSize: " 25px" }}>{sixLetters()}</div>
      {/* <div>Current Guess - {currentGuess}</div> */}
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        solution={solution}
      />
      <Keypad
        usedKeys={usedKeys}
        handleKeyUp={handleKeyUp}
        currentGuess={currentGuess}
        solution={solution}
      />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
