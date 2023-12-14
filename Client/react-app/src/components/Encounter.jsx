import React from "react";

const Encounter = ({
  enemyname,
  enemyimg,
  enemyhp,
  enemyattack,
  enemydef,
  name,
  img,
  hp,
  attack,
  def,
  maxplayerhp,
  maxenemyhp,
}) => {
  return (
    <>
      <div></div>
      <div>
        <div className="enemypokepic">
          <img className="enemypic" src={enemyimg} alt={`${enemyname} picture`} />
          <progress className="enemy-progress" value={enemyhp} max={maxenemyhp} />
        </div>
        <div className="enemystats">
          <p>{enemyname}</p>
          <p>
            <label>Hp: </label>
            {enemyhp}
          </p>

          <p>
            <label>Attack: </label>
            {enemyattack}
          </p>
          <p>
            <label>Defense: </label>
            {enemydef}
          </p>
        </div>
      </div>
      <div className="playerpokepic">
        <img className="playerpic" src={img} alt={`${name} picture`} />
        <progress className="player-progress" value={hp} max={maxplayerhp} />
      </div>
      <div className="playerstats">
        <label htmlFor="My pokemon"></label>
        <p>{name}</p>
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
      </div>
    </>
  );
};

export default Encounter;
