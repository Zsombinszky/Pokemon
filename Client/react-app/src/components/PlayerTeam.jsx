

const PlayerTeam = ({ name, img, hp, attack, def, handleSelectPokemon}) => {
  return (
    <>
      <div className="poke" onClick={handleSelectPokemon}>
        <h1>
          <label>Name: </label>
          {name}
        </h1>
        <p>
          <label>Hp: </label>
          {hp}
        </p>
        <p>
          <label>Attack: </label>
          {attack}
        </p>
        <p>
          <label>Defense: </label>
          {def}
        </p>
        <img src={img} alt={`${name} picture`} />
      </div>
    </>
  );
};

export default PlayerTeam;
