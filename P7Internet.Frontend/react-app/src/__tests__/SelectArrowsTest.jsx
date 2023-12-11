import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import React from "react";
import SelectArrows from "../components/SelectArrows";
import configureMockStore from "redux-mock-store";
import { renderComponentWithSpecificStore } from "../testSetupHelper/Helper";

afterEach(cleanup);

describe("SelectArrows", () => {
  const mockState = {
    recipe: {
      recipes: [],
      currentRecipeIndex: 0,
    },
  };
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<SelectArrows />, mockStore);

  it("Renders the arrows", () => {
    const arrows = screen.getAllByRole("img");
    expect(arrows[0]).toBeInTheDocument();
    expect(arrows[1]).toBeInTheDocument();
    expect(screen.getByTestId("SelectArrows")).toBeInTheDocument();
    expect(screen.getByTestId("SelectArrows")).toHaveAttribute("tabIndex", "0");
  });
});

test("Clicking the right arrow means dispatch calls the setCurrentRecipeIndex with payload of 1, when there are more than 1 recipe and the currentRecipeIndex is 0", () => {
  const mockState = {
    recipe: {
      recipes: [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
      ],
      currentRecipeIndex: 0,
    },
  };
  const mockStore = configureMockStore()(mockState);
  const spy = jest.spyOn(mockStore, "dispatch");

  renderComponentWithSpecificStore(<SelectArrows />, mockStore);
  const rightArrow = screen.getByTestId("selectArrowRight");
  fireEvent.click(rightArrow);
  expect(spy).toHaveBeenCalledWith({
    payload: 1,
    type: "recipe/setCurrentRecipeIndex",
  });
});

describe("Clicking the right arrow means dispatch calls the setCurrentRecipeIndex with payload of 0 (that is that it loops around to the first recipe), when", () => {
  test.each([
    [1, 0, [{ title: "Recipe 1", ingredients: ["ingredient 1"] }]],
    [
      2,
      1,
      [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
      ],
    ],
    [
      5,
      4,
      [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
        { title: "Recipe 3", ingredients: ["ingredient 3"] },
        { title: "Recipe 4", ingredients: ["ingredient 4"] },
        { title: "Recipe 5", ingredients: ["ingredient 5"] },
      ],
    ],
  ])(
    "there are %i recipes and the currentRecipeIndex is %i (the max index)",
    (numberOfRecipes, currentRecipeIndex, recipes) => {
      const mockState = {
        recipe: {
          recipes: recipes,
          currentRecipeIndex: currentRecipeIndex,
        },
      };
      const mockStore = configureMockStore()(mockState);
      const spy = jest.spyOn(mockStore, "dispatch");

      renderComponentWithSpecificStore(<SelectArrows />, mockStore);
      const rightArrow = screen.getByTestId("selectArrowRight");
      fireEvent.click(rightArrow);
      expect(spy).toHaveBeenCalledWith({
        payload: 0,
        type: "recipe/setCurrentRecipeIndex",
      });
    }
  );
});

describe("Clicking the left arrow means dispatch calls the setCurrentRecipeIndex with payload of the max index (that is that it loops around to the last recipe), when", () => {
  test.each([
    [1, 0, [{ title: "Recipe 1", ingredients: ["ingredient 1"] }]],
    [
      2,
      1,
      [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
      ],
    ],
    [
      5,
      4,
      [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
        { title: "Recipe 3", ingredients: ["ingredient 3"] },
        { title: "Recipe 4", ingredients: ["ingredient 4"] },
        { title: "Recipe 5", ingredients: ["ingredient 5"] },
      ],
    ],
  ])(
    "there are %i recipes and the currentRecipeIndex is 0, then the payload is %i (the max index)",
    (numberOfRecipes, maxIndex, recipes) => {
      const mockState = {
        recipe: {
          recipes: recipes,
          currentRecipeIndex: 0,
        },
      };
      const mockStore = configureMockStore()(mockState);
      const spy = jest.spyOn(mockStore, "dispatch");

      renderComponentWithSpecificStore(<SelectArrows />, mockStore);
      const leftArrow = screen.getByTestId("selectArrowLeft");
      fireEvent.click(leftArrow);
      expect(spy).toHaveBeenCalledWith({
        payload: maxIndex,
        type: "recipe/setCurrentRecipeIndex",
      });
    }
  );
});

test("Clicking the left arrow means dispatch calls the setCurrentRecipeIndex with payload of 0, when there are more than 1 recipe and the currentRecipeIndex is 1", () => {
  const mockState = {
    recipe: {
      recipes: [
        { title: "Recipe 1", ingredients: ["ingredient 1"] },
        { title: "Recipe 2", ingredients: ["ingredient 2"] },
      ],
      currentRecipeIndex: 1,
    },
  };
  const mockStore = configureMockStore()(mockState);
  const spy = jest.spyOn(mockStore, "dispatch");

  renderComponentWithSpecificStore(<SelectArrows />, mockStore);
  const leftArrow = screen.getByTestId("selectArrowLeft");
  fireEvent.click(leftArrow);
  expect(spy).toHaveBeenCalledWith({
    payload: 0,
    type: "recipe/setCurrentRecipeIndex",
  });
});
