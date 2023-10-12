
import React, { useState } from 'react'
import heartHollow from '../data/heart-hollow.svg'
import heartSolid from '../data/heart-solid.svg'

const RecipeTitle = ({title}) => {
  const [solid, setSolid] = useState(false)
  function handleClick(e) {
    e.preventDefault()
    setSolid(!solid)
		if (solid) 
      e.target.src = heartHollow
		else 
      e.target.src = heartSolid
  }

  return (
    <div className='RecipeTitle'>
        <h1>{title} 
        <img src={heartHollow} alt='heart' onClick={handleClick}/>
        </h1>
    </div>
  )
}

export default RecipeTitle