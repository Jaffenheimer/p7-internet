
import React, { useState } from 'react'
import heartHollow from '../data/heart-hollow.svg'
import heartSolid from '../data/heart-solid.svg'

const RecipeTitle = ({title}) => {
  const [solid, setSolid] = useState(false)
  function handleClick(event) {
    event.preventDefault()
    setSolid(!solid)
		if (solid) 
      event.target.src = heartHollow
		else 
      event.target.src = heartSolid
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