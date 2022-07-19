import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
import axios from "axios";
import useWordle from "./hooks/useWordle";
import nightMode from "./images/nightss.png";
import useLocalStorage from "use-local-storage";

function App() {
  const [solution, setSolution] = useState(null);
  const [clicked, setClicked] = useState("");
  const { getNewWord, newGame } = useWordle(solution);
  const [newGameClick, setNewGameClick] = useState(false);
  const [nightModes, setNightModes] = useState(false);
  // const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [theme, setTheme] = useLocalStorage(
  //   "theme",
  //   defaultDark ? "dark" : "light"
  // );

  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    setSolution(getNewWord());
  });
  const switchTheme = (e) => {
    e.preventDefault();
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
  };

  // useEffect(() => {
  //   axios
  //     .get("./data/db.json")
  //     .then((res) => res.data.solutions)
  //     .then((json) => {
  //       const randomSolution = json[Math.floor(Math.random() * json.length)];
  //       setSolution(randomSolution.word);
  //     });
  // }, [setSolution]);

  const newGames = () => {
    setTimeout(() => {
      setNewGameClick(true);
      setNewGameClick(false);
    }, 100);
  };

  const handleNewGame = () => {
    newGame();
  };

  // console.log(setThemeMode, "setThemeMode in app");

  return (
    <div
      className="App"
      // style={{
      //   backgroundColor: setThemeMode === "dark" ? "#10172a" : "white",
      // }}
    >
      {/* <button onClick={switchTheme}>
        switch to {themeMode === "light" ? "dark" : "light"} theme
      </button> */}
      {/* <img
        src={nightMode}
        style={{ width: "40px" }}
        // onClick={setNightMode(true)}
        onClick={() => setNightModes(true)}
      /> */}
      {solution && (
        <Wordle
          solution={solution}
          nightModes={nightModes}
          setThemeMode={setThemeMode}
        />
      )}
    </div>
  );
}

export default App;
