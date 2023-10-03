import React from 'react'
import {OwnedIngredientsList,  SearchBar} from '.'

const ContainerUpper = () => {

  return (
    <div className='ContainerUpper'>
        <h1>Recipe Generator</h1>
        <h2>Owned Ingredients</h2>
        <SearchBar/>

        <OwnedIngredientsList/>
        
        <button>Generate</button>
    </div>
  );
}

export default ContainerUpper