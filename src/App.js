import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
import axios from "axios";
import useWordle from "./hooks/useWordle";
import nightMode from "./images/nightss.png";
function App() {
  const [solution, setSolution] = useState(null);
  const [clicked, setClicked] = useState("");
  const { getNewWord, newGame } = useWordle(solution);
  const [newGameClick, setNewGameClick] = useState(false);
  const [nightModes, setNightModes] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("./data/db.json")
  //     .then((res) => res.data.solutions)
  //     .then((json) => {
  //       const randomSolution = json[Math.floor(Math.random() * json.length)];
  //       setSolution(randomSolution.word);
  //     });
  // }, [setSolution]);

  useEffect(() => {
    setSolution(getNewWord());
  });

  const newGames = () => {
    setTimeout(() => {
      setNewGameClick(true);
      setNewGameClick(false);
    }, 100);
  };

  const handleNewGame = () => {
    newGame();
  };

  return (
    <div className="App">
      <h1>Shtickle (Wordle Clone)</h1>
      {/* <img
        src={nightMode}
        style={{ width: "40px" }}
        // onClick={setNightMode(true)}
        onClick={() => setNightModes(true)}
      /> */}
      {console.log(nightModes, "nightModes")}
      {/* {console.log(nightModes)} */}
      {solution && <Wordle solution={solution} nightModes={nightModes} />}
    </div>
  );
}

export default App;
