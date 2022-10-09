import React, { useState, useEffect, useContext } from "react";
import { CommentsContext } from "../CommentsContext";
import { ScoresContext } from "../ScoresContext";

const CommentScore = ({ score, id }) => {
  const [comments, setComments] = useContext(CommentsContext);
  const [scores, setScores] = useContext(ScoresContext);

  const increaseScore = () => {
    let updatedScores = { ...scores };
    updatedScores[id] = scores[id] + 1;
    console.log(updatedScores);
    setScores((prev) => updatedScores);
  };
  const decreaseScore = () => {
    let updatedScores = { ...scores };
    updatedScores[id] = scores[id] - 1;
    setScores((prev) => updatedScores);
  };

  return (
    <div className="w-10 h-fit m-4 ml-2 flex flex-col items-center flex-shrink-0 bg-lightgray px-3 py-1 rounded-md">
      <button
        onClick={increaseScore}
        className="text-midblue opacity-50 hover:opacity-100"
      >
        +
      </button>
      <div className="text-midblue my-1">{scores[id]}</div>
      <button
        onClick={decreaseScore}
        className="text-midblue opacity-50 hover:opacity-100"
      >
        -
      </button>
    </div>
  );
};

export default CommentScore;
