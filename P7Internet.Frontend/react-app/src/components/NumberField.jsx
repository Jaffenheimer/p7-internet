import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { recipeGenerationActions } from '../features/recipeGenerationSlice';



const NumberField = () => {

  //Set the intial value of the number field 
  const numPeople = useSelector((state) => state.recipeGeneration.numPeople);
  const dispath = useDispatch();

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;


  const Add = () => {
    if (numPeople < maxValue)
      dispath(recipeGenerationActions.addPerson());
    else 
      alert("maximum is 10");
  }

  const Subtract = () =>{
    if(numPeople > minValue)
      dispath(recipeGenerationActions.removePerson());
    else
      alert("minimum is 1");
  }

  return (
    <div className="NumberField">
      <button className="PlusMinusButton" onClick={Subtract}>-</button>
      <input
        id='InputNumberField'
        type="number"
        size={3}
        value={numPeople}
        readOnly
      />
      <button className="PlusMinusButton" onClick={Add}>+</button>
    </div>
  );
};

export default NumberField;
