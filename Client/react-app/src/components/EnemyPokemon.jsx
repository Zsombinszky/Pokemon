import React from "react";

const EnemyPokemon = ({ name, img, hp, attack, def }) => {
  return (
    <>
      <div>
        <h1><label>Wild pokemon: </label>{name}</h1>
        <p><label>Hp: </label>{hp}</p>
        <p><label>Attack: </label>{attack}</p>
        <p><label>Defense: </label>{def}</p>
      </div>
      <div>
        <img src={img} alt={`${name} picture`} />
      </div>
    </>
  );
};

export default EnemyPokemon;
