import React, { useState, useEffect } from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn, solution }) {
  // use state for componentDidMount
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    setTimeout(() => {
      setMount(false);
    }, 2500);

    console.log(mount);
  }, []);
  return (
    <div className={mount ? "slideHelp" : ""}>
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
