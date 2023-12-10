// import "@testing-library/jest-dom";
// import { cleanup, screen } from "@testing-library/react";
// import React from "react";
// import {
//   renderComponent,
//   renderComponentWithSpecificStore,
// } from "../testSetupHelper/Helper.jsx";
// import RecipeIngredientElement from "../components/RecipeIngredientElement.jsx";
// import configureMockStore from "redux-mock-store";

// afterEach(cleanup);

// test("Renders the recipe ingredient element with correct name", () => {
//   const ingredient = { text: "TestIngredient", id: 1 };
//   renderComponent(<RecipeIngredientElement ingredient={ingredient} />);
//   const ingredientLi = screen.getByText(/TestIngredient/);
//   expect(screen.getByTestId("RecipeIngredientElement")).toBeInTheDocument();
//   expect(ingredientLi).toBeInTheDocument();
// });

// test("When ingredient is owned, the text 'Ejet' is rendered", () => {
//   const mockState = {
//     recipeGeneration: {
//       ownedIngredients: [{ text: "TestIngredient", id: 1 }],
//     },
//   };
//   // configureMockStore() returns a function that can be called with the initial state
//   const mockStore = configureMockStore()(mockState);
//   const ingredient = { text: "TestIngredient", id: 1 };
//   renderComponentWithSpecificStore(
//     <RecipeIngredientElement ingredient={ingredient} />,
//     mockStore
//   );
//   expect(screen.getByText(/TestIngredient/)).toBeInTheDocument();
//   expect(screen.getByText(/Ejet/)).toBeInTheDocument();
// });

// test("When ingredient is not owned, the text 'Ejet' is not rendered", () => {
//   const mockState = {
//     recipeGeneration: {
//       ownedIngredients: [{ text: "TestIngredient1", id: 1 }],
//     },
//   };
//   // configureMockStore() returns a function that can be called with the initial state
//   const mockStore = configureMockStore()(mockState);
//   const ingredient = { text: "TestIngredient2", id: 2 };
//   renderComponentWithSpecificStore(
//     <RecipeIngredientElement ingredient={ingredient} />,
//     mockStore
//   );
//   expect(screen.getByText(/TestIngredient2/)).toBeInTheDocument();
//   expect(screen.queryByText(/Ejet/)).not.toBeInTheDocument();
// });
