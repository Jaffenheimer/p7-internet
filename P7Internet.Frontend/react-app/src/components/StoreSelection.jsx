import React from "react";
import CheckBoxes from "./CheckBoxes";
import stores from "../objects/Stores";
import { storesSlice } from "../features/storesSlice";
import { useDispatch } from "react-redux";
import { storesActions } from "../features/storesSlice";

const StoreSelection = () => {
  const dispatch = useDispatch();

  const handleChecked = (event) => {
    const name = event.target.name;
    //Strips spacing from the text
    const strippedValue = name.replace(/ +/g, "");
    //convert to lower case
    const loweredValue = strippedValue.toLowerCase();
    dispatch(storesActions.toggleStore(loweredValue));
  };

  return (
    <div className="StoreSelection">
      <p id="StoreSelectionText">Mulige Butikker:</p>
      <CheckBoxes
        id="StoreSelectionCheckBoxes"
        options={stores}
        optionsView={stores}
        handleChecked={handleChecked}
      ></CheckBoxes>
    </div>
  );
};

export default StoreSelection;
