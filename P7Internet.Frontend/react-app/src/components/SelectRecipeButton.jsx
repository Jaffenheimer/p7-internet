import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";

const SelectRecipeButton = () => {
  const dispatch = useDispatch();

  const stores = useSelector(state => state.stores.stores);
  const [buttonIsDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    if (stores.length > 0) setButtonDisabled(false);
      else setButtonDisabled(true);
    }, [stores]);




  function goToPageFullRecipeView() {
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    goToPageFullRecipeView();
  }

  return (
    <button id="selectRecipeButton" onClick={handleOnClick} disabled={buttonIsDisabled}>
      Vælg opskrift
    </button>
  );
};

export default SelectRecipeButton;
