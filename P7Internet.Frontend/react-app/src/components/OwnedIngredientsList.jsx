import React, {useState} from 'react'
import cross from '../data/cross.svg'

const OwnedIngredientsList = () => {
	const [ownedList, setOwnedList] = useState(['Chicken Breast', 'Salt']);

	
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