

const Buttons = ({ handleFlee, handleAttack }) => {
  return (
    <>
    <div className="encounterbtndiv">
      <button onClick={handleAttack}>Attack</button>
      <button onClick={handleFlee}>Flee</button>
    </div>
    </>
  );
};

export default Buttons;
