import React from 'react'
import cross from '../data/cross.svg'

const OwnedIngredientsList = () => {
	const ownedList = ['Chicken Breast', 'Salt']
	
	function handleClick() {
    alert('You clicked me!');
  }

	return (
		<ul>{ownedList.map(ingredient => 
					<li>{ingredient} 
						<img src={cross} alt='cross' style={{height: '1em'}}
						     onClick={handleClick}/>
					</li>)
				}
		</ul>
	)
}

export default OwnedIngredientsList