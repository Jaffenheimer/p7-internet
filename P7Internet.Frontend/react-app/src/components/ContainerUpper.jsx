import React from 'react'
import {OwnedIngredientsList,  SearchBar, GenerateRecipeButton} from '.'

const ContainerUpper = () => {

  return (
    <div className='ContainerUpper'>
        <h1>Recipe Generator</h1>
        <h2>Owned Ingredients</h2>
        <SearchBar/>

        <OwnedIngredientsList/>
        
       <GenerateRecipeButton/>
    </div>
  );
}

export default ContainerUpper