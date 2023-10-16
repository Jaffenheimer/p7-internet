import React from "react";
import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";

const SelectRecipeButton = () => {
  const dispatch = useDispatch();

  function goToPageFullRecipeView() {
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    goToPageFullRecipeView();
  }

  return <button onClick={handleOnClick}>Vælg opskrift</button>;
};

export default SelectRecipeButton;
