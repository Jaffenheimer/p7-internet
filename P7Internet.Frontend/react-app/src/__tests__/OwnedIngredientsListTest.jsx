import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import OwnedIngredientsList from "../components/OwnedIngredientsList";
import { renderComponentWithDispatchActions } from "../testSetupHelper/Helper";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

beforeEach(() => {
  renderComponentWithDispatchActions(<OwnedIngredientsList />, [
    recipeGenerationActions.addOwnedIngredient("Ingredient 1"),
    recipeGenerationActions.addOwnedIngredient("Ingredient 2"),
  ]);
});

test("renders ingredients with their respective cross to remove them", () => {
  const crosses = screen.getAllByTestId("RemoveIngredientCross");
  expect(crosses[0]).toBeInTheDocument();
  expect(crosses[1]).toBeInTheDocument();
  expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
  expect(screen.getByText("Ingredient 2")).toBeInTheDocument();
});

test("when cross is clicked ingredient is removed", () => {
  const crosses = screen.getAllByTestId("RemoveIngredientCross");
  expect(screen.queryByText("Ingredient 1")).toBeInTheDocument();
  userEvent.click(crosses[0]);
  expect(screen.queryByText("Ingredient 1")).not.toBeInTheDocument();
});
