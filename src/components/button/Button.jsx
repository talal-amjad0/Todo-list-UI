import React from 'react';

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-white ${bgColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
