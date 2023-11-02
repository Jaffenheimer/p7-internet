import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectRecipeButton = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.stores.stores);

  function goToPageFullRecipeView() {
    dispatch(pageActions.goToPage(Pages.fullRecipeView));
  }

  //handles all the logic for when the button is clicked
  function handleOnClick() {
    if (stores.length === 0) {
      toast.error("Tilføj mindst 1 butik for at vælge opskriften");
      return;
    }
    goToPageFullRecipeView();
  }

  return (
    <button id="selectRecipeButton" onClick={handleOnClick}>
      Vælg opskrift
    </button>
  );
};

export default SelectRecipeButton;
