import { useDispatch } from "react-redux";
import { pageActions } from "../features/pageSlice";
import Pages from "../objects/Pages";
import React from "react";

function FullRecipeView() {
  const dispatch = useDispatch();

  function goToPageRecipeSelection() {
    //pt har vi ikke den side, så det er bare frontpage
    dispatch(pageActions.goToPage(Pages.frontPage));
  }

  return (
    <div>
      FullRecipeView
      <h1>h12</h1>
      <button onClick={goToPageRecipeSelection}>Go to RecipeSelection</button>
    </div>
  );
}

export default FullRecipeView;
