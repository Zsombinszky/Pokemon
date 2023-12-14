import React from 'react'

const Egg = ({hatch, goAway}) => {
  return (
    <div>
        <h1>Wow Trainer! Luckily you found here a really rare egg! What will you do?</h1>
        <img src="https://64.media.tumblr.com/tumblr_lvwmhdE0lN1qg0dcvo1_500.gif"></img>
        <button onClick={hatch}>Hatch the egg!</button>
        <button onClick={goAway}>I don't want the egg, I go back to the locations</button>
    </div>
  )
}

export default Egg