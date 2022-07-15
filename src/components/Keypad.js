import React, { useEffect, useState } from "react";
import axios from "axios";
import useWordle from "../hooks/useWordle";

export default function Keypad({ usedKeys, handleKeyUps, solution }) {
  const [letters, setLetters] = useState(null);
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn } =
    useWordle(solution);

  // useEffect(() => {
  //   fetch("http://localhost:3001/letters")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setLetters(json);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.letters)
      .then((json) => {
        setLetters(json);
      });
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      console.log("you won");
      window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > solution.length) {
      setTimeout(() => {}, 2000);
      window.removeEventListener("keyup", handleKeyUp);
    }
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, isCorrect, turn, solution]);
  const handleClick = (e) => {
    const key = e.target.innerText;
    handleKeyUp(key);

    console.log(key);
  };
  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color} onClick={handleClick}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
