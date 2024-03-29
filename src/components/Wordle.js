import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import axios from "axios";
import finalBlack from "../images/finalBlack.gif";
import finalWhite from "../images/FinalWhite.gif";
import moonDark from "../images/moonDark.gif";
import sunSvg from "../images/sunSvg.svg";

import blackSunFilled from "../images/blackSunFilled.svg";
import whiteSunFilled from "../images/whiteSunFilled.svg";
import newBlackSunSvg from "../images/newBlackSunSvg.svg";
import newWhiteSunSvg from "../images/newWhiteSunSvg.svg";
import s from "../images/My project-1_adobe_express.svg";
import useLocalStorage from "use-local-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";
// import indexCSS from "../index.css";

import "../index.scss";

export default function Wordle({ solution, nightModes, setThemeMode }) {
  const {
    currentGuess,
    handleKeyUp,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    newGame,
    getNewWord,
    setCurrentGuess,
    handleKeyUpKeyboard,
  } = useWordle(solution);

  const [showModal, setShowModal] = useState(false);
  const [newGameClick, setNewGameClick] = useState(false);
  const [letters, setLetters] = useState(null);
  const [lettersFirstRow, setLettersFirstRow] = useState(null);
  const [lettersSecondRow, setLettersSecondRow] = useState(null);
  const [lettersFirstRowUpper, setLettersFirstRowUpper] = useState(null);
  const [lettersSecondRowUpper, setLettersSecondRowUpper] = useState(null);
  const [lettersThirdRowUpper, setLettersThirdRowUpper] = useState(null);

  const [lettersThirdRow, setLettersThirdRow] = useState(null);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  // const [themeMode, setThemeModes] = useState("light");

  const switchTheme = (e) => {
    e.preventDefault();
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // setThemeMode(newTheme);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (newGameClick === true) {
      setShowModal(false);
    }

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
      .then((res) => res.data.lettersFirstRow)
      .then((json) => {
        setLettersFirstRow(json);
      });
  }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.lettersSecondRow)
      .then((json) => {
        setLettersSecondRow(json);
      });
  }, []);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.lettersThirdRow)
      .then((json) => {
        setLettersThirdRow(json);
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

  const sixLetters = () => {
    if (solution.length === 6) {
      return <div>This is a 6 letter word</div>;
    }
    if (solution.length === 5) {
      return <div>This is a 5 letter word</div>;
    }
  };

  console.log(solution);
  const handleKeyUpKeyboards = (e) => {
    const key = e.target.innerText;
    const lowerCaseKey = key.toLowerCase();
    // console.log(key.toLowerCase());
    handleKeyUpKeyboard(lowerCaseKey);

    // setCurrentGuess(key);
    console.log(lowerCaseKey);
  };

  const handleEnter = (e) => {
    handleKeyUpKeyboards(e);
  };

  const notify = () =>
    toast.error("Not a Word!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="changeBack" data-theme={theme}>
      {/* Wordle solution = {solution} */}
      <h1>Shtickle</h1>
      <div className="toaster">
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer
          className="not-valid-word-toast"
          bodyClassName="toast-body"
          toastClassName="toast-body"
        />
      </div>

      <h3 className="madeBy">Made by: Jacob Boim</h3>

      <div className="wordleimg">
        <img
          className="sun-icon"
          src={theme === "light" ? finalBlack : finalWhite}
          onClick={switchTheme}
        />

        {/* <img
          src={theme === "light" ? blackSunFilled : whiteSunFilled}
          className="sun-icon"
          onClick={switchTheme}
        /> */}
      </div>

      {/* <div className="letterWord" style={{ fontSize: " 25px" }}>
        {sixLetters()}
      </div> */}

      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        solution={solution}
      />

      <div className="keyboardAnimation">
        <div className="firstRow">
          {lettersFirstRow &&
            lettersFirstRow.map((l) => {
              const color = usedKeys[l.key];
              return (
                <div
                  key={l.key}
                  className={color}
                  onClick={handleKeyUpKeyboards}
                >
                  {l.key}
                </div>
              );
            })}
        </div>
        <div className="secondRow">
          {lettersSecondRow &&
            lettersSecondRow.map((l) => {
              const color = usedKeys[l.key];
              return (
                <div
                  key={l.key}
                  className={color}
                  onClick={handleKeyUpKeyboards}
                >
                  {l.key}
                </div>
              );
            })}
        </div>
        <div className="handleEnterwidth">
          <div className="Enter" onClick={handleEnter}>
            <h2 className="enterText">Enter</h2>
          </div>
          <div className="thirdRow">
            {lettersThirdRow &&
              lettersThirdRow.map((l) => {
                const color = usedKeys[l.key];
                return (
                  <div
                    key={l.key}
                    className={color}
                    onClick={handleKeyUpKeyboards}
                  >
                    {l.key}
                  </div>
                );
              })}
          </div>
          <div className="backSpaceWidth" onClick={handleEnter}>
            <h2 className="enterText">Backspace</h2>
          </div>
        </div>
        <div>
          <div className="mobileSubmit">
            <div className="enterMobile" onClick={handleEnter}>
              <h2 className="enterTextMobile">Enter</h2>
            </div>
            <div className="backspaceMobile" onClick={handleEnter}>
              <h2 className="backTextMobile">Backspace</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <Keypad
        usedKeys={usedKeys}
        handleKeyUp={handleKeyUp}
        currentGuess={currentGuess}
        solution={solution}
        setCurrentGuess={setCurrentGuess}
        handleKeyUpKeyboard={handleKeyUpKeyboard}
      /> */}
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          newGame={newGame}
          setNewGameClick={setNewGameClick}
        />
      )}
    </div>
  );
}
