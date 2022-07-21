import { useState, useRef } from "react";
import useWordBank from "./useWordBank";
// import axios from "axios";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const toastId = useRef(null);

  const { wordBankCheck } = useWordBank();

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formatedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //find the letters in the solution that match the current guess
    formatedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formatedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formatedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formatedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });
    return formatedGuess;
  };

  // const toast = () => {
  //   toast.success("You won!", {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  const alreadyUsed = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("ALREADY USED", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
        theme: "colored",
      });
    }
  };

  const notVaildWordToast = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("NOT A VALID WORD", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
        theme: "colored",
      });
    }
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > solution.length) {
        console.log("you used all your guesses!");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried that word.");
        // alert("ALREADY USED");
        alreadyUsed();

        return;
      }
      if (!wordBankCheck.includes(currentGuess)) {
        console.log("NOT A VALID WORD");
        // alert("NOT A VALID WORD");
        notVaildWordToast();
        return;
      }
      // check word is 5 chars
      if (currentGuess.length !== solution.length) {
        console.log("word must be 5 chars.");
        return;
      }
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < solution.length) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };
  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyUpKeyboard = (key) => {
    if (key === "Enter") {
      // only add guess if turn is less than 5
      if (turn > solution.length) {
        console.log("you used all your guesses!");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried that word.");
        // alert("ALREADY USED");
        alreadyUsed();

        return;
      }
      if (!wordBankCheck.includes(currentGuess)) {
        console.log("NOT A VALID WORD");
        // alert("NOT A VALID WORD");
        notVaildWordToast();
        return;
      }
      // check word is 5 chars
      if (currentGuess.length !== solution.length) {
        console.log("word must be 5 chars.");
        return;
      }
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < solution.length) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  const newGame = () => {
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  };

  const getWordLengthsConst = (str) => {
    let len = [];
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].length >= 5 && words[i].length <= 6) {
        len.push(words[i]);
      }
    }
    return len;
  };

  // function getWordLengths(str) {
  //   let len = [];
  //   let words = str.split(" ");
  //   for (let i = 0; i < words.length; i++) {
  //     if (words[i].length < 6) {
  //       len.push(words[i]);
  //     }
  //   }
  //   return len;
  // }

  // console.log(changeWords.split("\n"));

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyUp,
    newGame,
    setCurrentGuess,
    handleKeyUpKeyboard,
    getWordLengthsConst,
  };
};

export default useWordle;
