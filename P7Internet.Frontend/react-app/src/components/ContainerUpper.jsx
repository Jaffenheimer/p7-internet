import React from 'react'
import SearchBar from './SearchBar'
import OwnedIngredientsList from './OwnedIngredientsList'
import GenerateRecipeButton from './GenerateRecipeButton'


const ContainerUpper = () => {

  return (
    <div className='ContainerUpper'>
        <h1>Recipe Generator</h1>
        <h2>Owned Ingredients</h2>
        <SearchBar/>

        <OwnedIngredientsList/>
        
       <GenerateRecipeButton></GenerateRecipeButton>
    </div>
  );
}

export default ContainerUpper