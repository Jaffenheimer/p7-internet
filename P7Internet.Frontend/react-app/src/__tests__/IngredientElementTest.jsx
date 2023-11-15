import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import IngredientElement from "../components/IngredientElement";

test("Renders the ingredient element with correct name", () => {
  const ingredient = { text: "TestIngredient", id: 1 };
  render(<IngredientElement ingredient={ingredient} />);
  const ingredientLi = screen.getByText(/TestIngredient/);
  expect(screen.getByTestId("IngredientElement")).toBeInTheDocument();
  expect(ingredientLi).toBeInTheDocument();
});

test("When clicking removeIngredientCross, the handleRemove function is called with the ingredient as argument", () => {
  const ingredient = { text: "TestIngredient", id: 1 };
  const handleRemove = jest.fn();
  render(
    <IngredientElement ingredient={ingredient} handleRemove={handleRemove} />
  );
  const removeIngredientCross = screen.getByTestId("RemoveIngredientCross");
  removeIngredientCross.click();
  expect(handleRemove).toHaveBeenCalled();

  // it should called with the event and the ingredient
  // expect.anything() is a matcher that will match any argument passed to the function
  expect(handleRemove).toHaveBeenCalledWith(expect.anything(), ingredient);
});
