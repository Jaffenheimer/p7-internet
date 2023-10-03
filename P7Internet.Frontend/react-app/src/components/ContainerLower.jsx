import React from 'react'
import {RecipeTitle} from '.'
import SelectArrows from './SelectArrows'

const ContainerLower = () => {
  const Ingredients = ['400g Chicken Breast', '400g Asparagus', '3dl Water', '1.5dl Milk']
	const ownedList = ['Chicken Breast', 'Salt', 'Water', 'Milk']

  function filterOwned(){
    let filtered = [];
    for (let i in Ingredients){
      const ingr = Ingredients[i].substring(Ingredients[i].indexOf(' ')+1)
      if (ownedList.includes(ingr)) filtered.push(Ingredients[i])
    }
    return filtered;
  }

  return (
    <div className='ContainerLower'>
        <RecipeTitle/>
        <ul>{Ingredients.map(ingredient => <li>{ingredient} 
        {filterOwned().includes(ingredient) ? ' Owned' : ''}
        </li>)}</ul>
        <button>Select</button>
        <SelectArrows/>
    </div>
  )
}

export default ContainerLower