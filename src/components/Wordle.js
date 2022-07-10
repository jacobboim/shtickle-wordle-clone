import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      console.log("you won");
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > solution.length) {
      console.log("out of turns");
      window.removeEventListener("keyup", handleKeyUp);
    }
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, isCorrect, turn]);

  const sixLetters = () => {
    if (solution.length === 6) {
      return <div>This is a 6 letter word</div>;
    }
  };

  return (
    <div>
      Wordle solution = {solution}
      <div>{sixLetters()}</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        solution={solution}
      />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
}
