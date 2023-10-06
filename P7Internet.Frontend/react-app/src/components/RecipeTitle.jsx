import React from 'react'
import heart from '../data/heart.svg'
import heartSolid from '../data/heart-solid.svg'

const RecipeTitle = ({title}) => {

  function handleClick(e) {
		const solid = 'http://localhost:3000/static/media/heart-solid.6baa036489430148c6c13ee25dc4935e.svg'
		if (e.target.src === solid) e.target.src = 'http://localhost:3000/static/media/heart.b8460c938c0732c645a81f16c95c05f9.svg'
		else e.target.src = solid
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