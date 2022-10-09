import React, { createContext, useEffect, useState } from "react";

const getInitialScores = () => {
  const scores = localStorage.getItem("scores");
  return scores ? JSON.parse(scores) : {};
};

export const ScoresContext = createContext();
export const ScoresProvider = (props) => {
  const [scores, setScores] = useState(getInitialScores);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return (
    <ScoresContext.Provider value={[scores, setScores]}>
      {props.children}
    </ScoresContext.Provider>
  );
};
