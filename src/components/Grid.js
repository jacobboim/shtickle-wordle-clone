import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn, solution }) {
  return (
    <div className="slideHelp">
      {guesses.map((g, i) => {
        if (turn === i) {
          return (
            <div>
              <Row key={i} currentGuess={currentGuess} solution={solution} />
            </div>
          );
        }
        return <Row key={i} guess={g} solution={solution} />;
      })}
    </div>
  );
}
