import React from 'react'
import { useState } from "react";


const NumberField = () => {

  //Set the intial value of the number field 
  const [value, setValue] = useState(69);

  //Set the min and max values of the number field
  const minValue = 1;
  const maxValue = 100;

  
  //Every time the user changes the numberfield we check if the value is within the expected values
  function updateNumberField(event){
    if (event.target.value < minValue) {
      setValue(minValue);
      alert("minimum is 1");
    }
    else if (event.target.value > maxValue) {
        setValue(maxValue);
        alert("maximum is 100");
    }
    else {
        setValue(event.target.value);
    }
  }

  function add(){
    setValue(value + 1);
  }

  function subtract(){
    setValue(value - 1);
  }

  return (
    <div className="NumberField">
      <button class="plusMinusButton" onClick={subtract}>-</button>
      <input
        id='inputNumberField'
        type="number"
        size={3}
        value={value}
        onChange={updateNumberField}
      />
      <button class="plusMinusButton" onClick={add}>+</button>
    </div>
  );
};

export default NumberField;
