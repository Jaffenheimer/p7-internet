
import React, { useState } from 'react'
import heart from '../data/heart.svg'

const RecipeTitle = ({title}) => {
  const [solid, setSolid] = useState(false)
  function handleClick(e) {
    e.preventDefault()
    setSolid(!solid)
		if (solid) e.target.src = 'http://localhost:3000/static/media/heart.9e1e9c6d121d45e8ca15c9933a759ad1.svg'
		else e.target.src = 'http://localhost:3000/static/media/heart-solid.6baa036489430148c6c13ee25dc4935e.svg'
  }

  return (
    <div className='RecipeTitle'>
        <h1>{title} 
        <img src={heart} alt='heart' onClick={handleClick}/>
        </h1>
    </div>
  )
}

export default RecipeTitle