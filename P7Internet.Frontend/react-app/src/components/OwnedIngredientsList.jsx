import React, {useState} from 'react'
import cross from '../data/cross.svg'

const OwnedIngredientsList = () => {
	const ownedList = ['Kyllingebryst', 'Salt']
	
	function handleClick() {
    alert('You clicked me!');
  }

	
	return (
		<ul>{ownedList.map(ingredient => 
					<li>{ingredient} 
						<img src={cross} alt='cross'
						     onClick={() => {setOwnedList(ownedList.filter(i => i !== ingredient))}}/>
					</li>)
			}
		</ul>
	)
}

export default OwnedIngredientsList