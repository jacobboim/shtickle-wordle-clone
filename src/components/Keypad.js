import React, { useEffect, useState } from "react";
import axios from "axios";
import useWordle from "../hooks/useWordle";

export default function Keypad({ usedKeys, handleKeyUps, solution }) {
  const [letters, setLetters] = useState(null);
  const [lettersFirstRowUpper, setLettersFirstRowUpper] = useState(null);
  const [lettersSecondRowUpper, setLettersSecondRowUpper] = useState(null);
  const [lettersThirdRowUpper, setLettersThirdRowUpper] = useState(null);

  const {
    currentGuess,
    handleKeyUp,
    guesses,
    isCorrect,
    turn,
    setCurrentGuess,
    handleKeyUpKeyboard,
  } = useWordle(solution);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.letters)
      .then((json) => {
        setLetters(json);
      });
  }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.lettersFirstRowUpper)
      .then((json) => {
        setLettersFirstRowUpper(json);
      });
  }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.lettersSecondRowUpper)
      .then((json) => {
        setLettersSecondRowUpper(json);
      });
  }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.lettersThirdRowUpper)
      .then((json) => {
        setLettersThirdRowUpper(json);
      });
  }, []);

  // useEffect(() => {
  //   window.addEventListener("keyup", handleKeyUp);

  //   if (isCorrect) {
  //     console.log("you won");
  //     window.removeEventListener("keyup", handleKeyUp);
  //   }

  //   if (turn > solution.length) {
  //     setTimeout(() => {}, 2000);
  //     window.removeEventListener("keyup", handleKeyUp);
  //   }
  //   return () => {
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, [handleKeyUp, isCorrect, turn, solution]);
  const handleClick = (e) => {
    const key = e.target.innerText;
    handleKeyUp(key);
    setCurrentGuess(key);
    console.log(key);
    console.log(currentGuess, "currentGuess");
  };

  const handleKeyUpKeyboards = (e) => {
    const key = e.target.innerText;
    // handleKeyUp(key);
    const lowerCaseKey = key.toLowerCase();
    handleKeyUpKeyboard(key);

    // setCurrentGuess(key);
    console.log(key);
  };

  const handleEnter = (e) => {
    if (e.target.innerText === "Enter") {
      handleKeyUp(e);
      setCurrentGuess((prev) => prev + e);
      console.log(e, " you clicked enter");
      // setCurrentGuess("");
    }
  };

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              <button onClick={handleKeyUpKeyboards}>{l.key}</button>
            </div>
          );
        })}
      <button onClick={handleEnter}>Enter</button>
    </div>
    // <div className="keypad">
    //   <div className="firstRow">
    //     {lettersFirstRowUpper &&
    //       lettersFirstRowUpper.map((l) => {
    //         const color = usedKeys[l.key];
    //         return (
    //           <div key={l.key} className={color} onClick={handleKeyUpKeyboards}>
    //             {l.key}
    //           </div>
    //         );
    //       })}
    //   </div>
    //   <div className="secondRow">
    //     {lettersSecondRowUpper &&
    //       lettersSecondRowUpper.map((l) => {
    //         const color = usedKeys[l.key];
    //         return (
    //           <div key={l.key} className={color} onClick={handleKeyUpKeyboards}>
    //             {l.key}
    //           </div>
    //         );
    //       })}
    //   </div>{" "}
    //   <div className="thirdRow">
    //     {lettersThirdRowUpper &&
    //       lettersThirdRowUpper.map((l) => {
    //         const color = usedKeys[l.key];
    //         return (
    //           <div key={l.key} className={color} onClick={handleKeyUpKeyboards}>
    //             {l.key}
    //           </div>
    //         );
    //       })}
    //   </div>
    // </div>
  );
}
