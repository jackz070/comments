import React from "react";

const BigButton = ({ text, action }) => {
  return (
    <button
      onClick={action}
      className="bg-midblue text-white rounded-md px-8 py-2 uppercase w-28 h-10 hover:opacity-50 active:opacity-75"
    >
      {text}
    </button>
  );
};

export default BigButton;
