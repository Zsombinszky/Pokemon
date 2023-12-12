import React from 'react'

const Encounter = ({ enemyname, enemyimg, enemyhp, enemyattack, enemydef, name, img, hp, attack, def }) => {
    return (
        <>
            <div>Encounter</div>
            <div>
                <div><label>Wild pokemon</label>
                    <img src={enemyimg} alt={`${enemyname} picture`} />
                </div>
                <div>
                    <p>{enemyname}</p>
                    <p><label>Hp: </label>{enemyhp}</p>
                    <p><label>Attack: </label>{enemyattack}</p>
                    <p><label>Defense: </label>{enemydef}</p>
                </div>
            </div>
            <div>
                <img src={img} alt={`${name} picture`} />
            </div>
            <div><label htmlFor="My pokemon"></label>
                <p>{name}</p>
                <p><label>Hp: </label>{hp}</p>
                <p><label>Attack: </label>{attack}</p>
                <p><label>Defense: </label>{def}</p>
            </div>
        </>
    )
}

export default Encounter