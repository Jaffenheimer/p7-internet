import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";

const NumberField = () => {
  //Set the intial value of the number field
  const numPeople = useSelector((state) => state.recipeGeneration.numPeople);
  const dispatch = useDispatch();

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;

  const add = () => {
    if (numPeople < maxValue) dispatch(recipeGenerationActions.addPerson());
    else alert("maximum is 10");
  };

  const subtract = () => {
    if (numPeople > minValue) dispatch(recipeGenerationActions.removePerson());
    else alert("minimum is 1");
  };

  return (
    <div className="NumberField">
      <button className="PlusMinusButton" onClick={subtract}>
        -
      </button>
      <input
        id="InputNumberField"
        type="number"
        size={3}
        value={numPeople}
        readOnly
      />
      <button className="PlusMinusButton" onClick={add}>
        +
      </button>
    </div>
  );
};

export default NumberField;
