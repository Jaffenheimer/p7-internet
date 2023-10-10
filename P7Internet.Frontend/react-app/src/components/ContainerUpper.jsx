import React, {useState} from 'react'
import {OwnedIngredientsList,  SearchBar, GenerateRecipeButton} from '.'

const ContainerUpper = () => {
  const[list, setList] = useState([]);

  const handleAddToList = (ingredient) => {
    setList([...list, ingredient]); 
  }

  const removeFromListHandler = (index) => {
    const newList = list.filter((ingredient, i) => i !== index);
    setList(newList);
  }


  return (
    <div className='ContainerUpper'>
        <h1>Recipe Generator</h1>
        <h2>Owned Ingredients</h2>
        <SearchBar onSubmit={handleAddToList}/>

        <OwnedIngredientsList ownedList={list} onRemoveItem={removeFromListHandler}/>
        
       <GenerateRecipeButton></GenerateRecipeButton>
    </div>
  );
}

export default ContainerUpper