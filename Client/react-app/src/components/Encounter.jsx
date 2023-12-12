import React from 'react'

const Encounter = ({ enemyname, enemyimg, enemyhp, enemyattack, enemydef, name, img, hp, attack, def }) => {
    return (
        <>
            <div>Encounter</div>
            <div>
                <div><label>Wild pokemon</label>
                    {enemyimg}
                </div>
                <div>
                    <p>{enemyname}</p>
                    <p><label>Hp: </label>{enemyhp}</p>
                    <p><label>Attack: </label>{enemyattack}</p>
                    <p><label>Defense: </label>{enemydef}</p>
                </div>
            </div>
            <div>
            </div>
            <div>
                {img}
            </div>
            <div><label htmlFor="My pokemon"></label>
                <p>{name}</p>
                <p><label>Hp: </label>{hp}</p>
                <p><label>Attack: </label>{attack}</p>
                <p><label>Defense: </label>{def}</p>
            </div>
            <div>
            <button /* onClick={} */>Attack</button>
            </div>
        </>
    )
}

export default Encounter