import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { recipeGenerationReducer } from "../features/recipeGenerationSlice";
import { recipeReducer } from "../features/recipeSlice";
import { pageReducer } from "../features/pageSlice";
import { userReducer } from "../features/userSlice";
import { offersReducer } from "../features/offersSlice";
import { apiSlice } from "../services/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";

function configureDefaultStore() {
  return configureStore({
    reducer: {
      recipeGeneration: recipeGenerationReducer,
      recipe: recipeReducer,
      page: pageReducer,
      user: userReducer,
      offers: offersReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        apiSlice.middleware
      ),
  });
}

function renderComponent(component) {
  //this resets the store for each test
  const store = configureDefaultStore();
  render(<Provider store={store}>{component}</Provider>);
}

function renderComponentWithSpecificStore(component, store) {
  render(<Provider store={store}>{component}</Provider>);
}

function renderMultipleComponents(componentsList) {
  const store = configureDefaultStore();
  if (componentsList.length === 2)
    render(
      <Provider store={store}>
        {componentsList[0]} {componentsList[1]}
      </Provider>
    );
  //make new ones if necessary
}

function renderComponentWithDispatchActions(component, dispatchActions) {
  const store = configureDefaultStore();
  dispatchActions.forEach((dispatchAction) => {
    store.dispatch(dispatchAction);
  });
  render(<Provider store={store}>{component}</Provider>);
}

export {
  renderComponent,
  renderComponentWithSpecificStore,
  renderMultipleComponents,
  renderComponentWithDispatchActions,
};
