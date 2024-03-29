import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";

const NumberOfPersonsField = () => {
  //Set the intial value of the number field
  const numPeople = useSelector((state) => state.recipeGeneration.numPeople);
  const dispatch = useDispatch();

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 10;

  const add = () => {
    if (numPeople < maxValue) dispatch(recipeGenerationActions.addPerson());
    else toast.error("Maximum er 10");
  };

  const subtract = () => {
    if (numPeople > minValue) dispatch(recipeGenerationActions.removePerson());
    else toast.error("Minimum er 1");
  };

  return (
    <div className="NumberOfPersonsField" data-testid="NumberOfPersonsField">
      <button className="PlusMinusButton" onClick={subtract}>
        -
      </button>
      <input
        id="InputNumberOfPersonsField"
        data-testid="InputNumberOfPersonsField"
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

export default NumberOfPersonsField;
