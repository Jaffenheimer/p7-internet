import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";

const NumPersonsField = () => {
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
    <div className="NumPersonsField">
      <button className="PlusMinusButton" onClick={subtract}>
        -
      </button>
      <input
        id="InputNumPersonsField"
        data-testid="InputNumPersonsField"
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

export default NumPersonsField;
