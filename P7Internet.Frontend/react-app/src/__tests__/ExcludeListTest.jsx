import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { ExcludeList } from "../components";
import configureMockStore from "redux-mock-store";
import {
  renderComponentWithSpecificStore,
  renderComponentWithDispatchActions,
} from "../testSetupHelper/Helper";
import { recipeGenerationActions } from "../features/recipeGenerationSlice";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

describe("ExcludeList", () => {
  let mockStore;
  beforeEach(() => {
    // Mocking the store such that the component can be rendered
    const mockState = {
      recipeGeneration: {
        excludeList: [
          { id: 0, text: "Ingredient 0" },
          { id: 1, text: "Ingredient 1" },
          { id: 2, text: "Ingredient 2" },
          { id: 3, text: "Ingredient 3" },
          { id: 4, text: "Ingredient 4" },
          { id: 5, text: "Ingredient 5" },
          { id: 6, text: "Ingredient 6" },
          { id: 7, text: "Ingredient 7" },
          { id: 8, text: "Ingredient 8" },
          { id: 9, text: "Ingredient 9" },
        ],
      },
    };
    // configureMockStore() returns a function that can be called with the initial state
    mockStore = configureMockStore()(mockState);
    renderComponentWithSpecificStore(<ExcludeList />, mockStore);
  });
  it("checks if ExcludeList is rendered", () => {
    expect(screen.getByTestId("ExcludeList")).toBeInTheDocument();
  });
  it("checks if the header is rendered", () => {
    expect(screen.getByText(/Ekskluder ingredienser:/)).toBeInTheDocument();
  });
  it("checks if the add ingredient form is rendered", () => {
    expect(
      screen.getByTestId("ExcludedIngredientsAddIngredientsForm")
    ).toBeInTheDocument();
  });
  it("checks if the ingredients list is rendered", () => {
    expect(screen.getByTestId("IngredientsList")).toBeInTheDocument();
  });
  it("checks if the add button is rendered", () => {
    expect(screen.getByText(/Tilføj/)).toBeInTheDocument();
  });
  it("checks if the remove all button is rendered", () => {
    expect(screen.getByText(/Fjern alle/)).toBeInTheDocument();
  });
  it("checks if the an ingredient is rendered", () => {
    expect(screen.getByText(/Ingredient 0/)).toBeInTheDocument();
  });
  it("checks if all ingredients are rendered", () => {
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(`Ingredient ${i}`)).toBeInTheDocument();
    }
  });
});

test("checks if the ingredientlist is empty if no elements are in exclude list", () => {
  let mockStore;
  const mockState = {
    recipeGeneration: {
      excludeList: [],
    },
  };
  mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<ExcludeList />, mockStore);
  const list = screen.queryByTestId("IngredientElement");
  expect(list).not.toBeInTheDocument();
});

test("when cross is clicked ingredient is removed", () => {
  renderComponentWithDispatchActions(<ExcludeList />, [
    recipeGenerationActions.addExcludedIngredient("Ingredient 1"),
    recipeGenerationActions.addExcludedIngredient("Ingredient 2"),
  ]);
  const crosses = screen.getAllByTestId("RemoveIngredientCross");
  expect(screen.queryByText("Ingredient 1")).toBeInTheDocument();
  userEvent.click(crosses[0]);
  expect(screen.queryByText("Ingredient 1")).not.toBeInTheDocument();
});
