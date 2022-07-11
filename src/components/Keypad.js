import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);

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

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
