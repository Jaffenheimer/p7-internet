import React, {useState} from 'react'
import {RecipeTitle} from '.'
import SelectArrows from './SelectArrows'
import leftArrow from '../data/leftArrow.svg'
import rightArrow from '../data/rightArrow.svg'

const ContainerLower = () => {
	const ownedList = ['Chicken Breast', 'Salt', 'Water', 'Milk']

  const Ingredients = [
    ['400g Chicken Breast', '400g Asparagus', '3dl Water', '1.5dl Milk'],
    ['400g Chicken Breast', '400g Asparagus', '3dl Water'],
    ['400g Chicken Breast', '400g Asparagus'],
    ['400g Chicken Breast']
  ];

  const [tab, setTab] = useState(0)

  const clickLeft = () => {setTab(Math.max(0,tab-1))}
  const clickRight = () => {setTab(Math.min(tab+1,Ingredients.length-1))}

  function filterOwned(){
    let filtered = [];
    for (let i in Ingredients[tab]){
      const ingr = Ingredients[tab][i].substring(Ingredients[tab][i].indexOf(' ')+1)
      if (ownedList.includes(ingr)) filtered.push(Ingredients[tab][i])
    }
    return filtered;
  }

  return (
    <div className='ContainerLower'>
        <RecipeTitle/>
        <ul>{Ingredients[tab].map(ingredient => <li>{ingredient} 
        {filterOwned().includes(ingredient) ? ' Owned' : ''}
        </li>)}</ul>
        <button>Select</button>
        
        <div className='SelectArrows'>
          <img src={leftArrow} alt='Left Arrow' onClick={clickLeft}/>
          <img src={rightArrow} alt='right Arrow' onClick={clickRight}/>
        </div>
    </div>
  )
}

export default ContainerLower