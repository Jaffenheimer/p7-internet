import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { recipeGenerationReducer } from "../features/recipeGenerationSlice";
import { recipeReducer } from "../features/recipeSlice";
import { pageReducer } from "../features/pageSlice";
import { userReducer } from "../features/userSlice";
import { offersReducer } from "../features/offersSlice";
import { configureStore } from "@reduxjs/toolkit";

function renderComponent(component) {
  //this resets the store for each test
  const store = configureStore({
    reducer: {
      recipeGeneration: recipeGenerationReducer,
      recipe: recipeReducer,
      page: pageReducer,
      user: userReducer,
      offers: offersReducer,
    },
  });
  render(<Provider store={store}>{component}</Provider>);
}

export { renderComponent };
