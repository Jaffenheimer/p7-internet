import React from 'react'
import heart from '../data/heart.svg'

const RecipeTitle = () => {
  const title = "Title";

  function handleClick() {
    alert('You clicked me!');
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