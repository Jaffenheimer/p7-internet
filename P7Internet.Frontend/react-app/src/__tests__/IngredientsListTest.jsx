import { screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  renderComponent,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import IngredientsList from "../components/IngredientsList.jsx";
import IngredientElement from "../components/IngredientElement.jsx";
import RecipeIngredientElement from "../components/RecipeIngredientElement.jsx";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { convertIngredientsToIngredientObjects } from "../helperFunctions/ingredientHelper.js";

afterEach(cleanup);

test("IngredientsList renders ingredients properly when given an ingredientElement as listElement", () => {
  const ingredients = [
    { text: "TestIngredient1", id: 1 },
    { text: "TestIngredient2", id: 2 },
  ];
  render(
    <IngredientsList
      ingredients={ingredients}
      ListElement={IngredientElement}
    />
  );
  expect(screen.getByTestId("IngredientsList")).toBeInTheDocument();
  expect(screen.getByText(/TestIngredient1/)).toBeInTheDocument();
  expect(screen.getByText(/TestIngredient2/)).toBeInTheDocument();
});

test("IngredientsList renders ingredients properly when given a RecipeIngredientElement as listElement", () => {
  const ingredients = [
    { text: "TestIngredient4", id: 4 },
    { text: "TestIngredient5", id: 5 },
  ];
  renderComponent(
    <IngredientsList
      ingredients={ingredients}
      ListElement={RecipeIngredientElement}
    />
  );
  expect(screen.getByTestId("IngredientsList")).toBeInTheDocument();
  expect(screen.getByText(/TestIngredient4/)).toBeInTheDocument();
  expect(screen.getByText(/TestIngredient5/)).toBeInTheDocument();
});