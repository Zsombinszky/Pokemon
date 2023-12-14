import React from "react";

const Location = ({ name, onClick }) => {
  return (
    <li>
      <button className="locations" onClick={onClick}>{name}</button>
    </li>
  );
};

export default Location;
