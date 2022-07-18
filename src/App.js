import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
import axios from "axios";
import useWordle from "./hooks/useWordle";
function App() {
  const [solution, setSolution] = useState(null);
  const [clicked, setClicked] = useState("");
  const { getNewWord, newGame } = useWordle(solution);
  const [newGameClick, setNewGameClick] = useState(false);

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

      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
