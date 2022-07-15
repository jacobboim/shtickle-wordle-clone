import React, { useState } from "react";

export default function Row({ guess, currentGuess, solution }) {
  const [fname, setFname] = useState("");

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (
          <div key={i} className={l.color}>
            {l.key}
          </div>
        ))}
      </div>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(solution.length - letters.length)].map((_, i) => (
          <div key={i}> </div>
        ))}
      </div>
    );
  }

  if (solution && solution.length === 6) {
    const handleChange = (e) => {
      setFname(e.target.value);
    };
    return (
      <div className="row">
        <div>
          {/* <input type="text" value={fname} onChange={handleChange} /> */}
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  //   return (
  //     <div className="row">
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //     </div>
  //   );
}
