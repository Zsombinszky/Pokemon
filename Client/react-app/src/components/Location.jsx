import React from "react";

const Location = ({ name, onClick }) => {
  return (
    <li>
      <button onClick={onClick}>{name}</button>
    </li>
  );
};

export default Location;
