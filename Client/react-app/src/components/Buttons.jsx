import React from "react";

const Buttons = ({ handleFlee, handleAttack }) => {
  return (
    <>
      <button onClick={handleFlee}>Flee</button>
      <button onClick={handleAttack}>Attack</button>
    </>
  );
};

export default Buttons;
