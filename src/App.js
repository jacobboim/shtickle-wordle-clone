import React, { useEffect, useState } from "react";
import "./App.css";
import Wordle from "./components/Wordle";
import axios from "axios";
function App() {
  const [solution, setSolution] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3001/solutions")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const randomSolution = json[Math.floor(Math.random() * json.length)];
  //       setSolution(randomSolution.word);
  //     });
  // }, [setSolution]);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => res.data.solutions)
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  // useEffect(() => {
  //   axios
  //     .get("./data/db.json")
  //     .then((res) => console.log(res.data.solutions))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
