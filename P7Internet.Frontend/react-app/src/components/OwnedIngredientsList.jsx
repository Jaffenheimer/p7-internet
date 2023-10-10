import React from 'react'
import cross from '../data/cross.svg'

const OwnedIngredientsList = ({ownedList, onRemoveItem}) => {
	//const ownedList = ['Chicken Breast', 'Salt']
	
	function handleClick(index) {
		onRemoveItem(index);
    //alert('You clicked me!');
  }

  return (
	<ul>
		{ownedList.map((ingredient, index) => 
			<li key={index}>{ingredient} 
				<img src={cross} alt='cross' onClick={() => handleClick(index)}/>
			</li>)
		}
	</ul>
)
}

export default OwnedIngredientsList