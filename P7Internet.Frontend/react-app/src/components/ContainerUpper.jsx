import React from 'react'
import SearchBar from './SearchBar'
import OwnedIngredientsList from './OwnedIngredientsList'
import GenerateRecipeButton from './GenerateRecipeButton'


const ContainerUpper = () => {

  return (
    <div className='ContainerUpper'>
        <h1>Opskriftsgenerator</h1>
        <h2>Ingredienser jeg gerne vil bruge:</h2>
        <SearchBar/>

        <OwnedIngredientsList/>
        
       <GenerateRecipeButton/>
    </div>
  );
}

export default ContainerUpper