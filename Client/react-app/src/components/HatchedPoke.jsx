import React from 'react'

const HatchedPoke = ({name, img, goBack}) => {
  return (
    <div>
        <h1><label>{name} is hatched! </label></h1>
        <img src={img} alt={`${name} picture`} />
        <button onClick={goBack}>Let's go back to your journey with your new friend</button>
    </div>
  )
}

export default HatchedPoke