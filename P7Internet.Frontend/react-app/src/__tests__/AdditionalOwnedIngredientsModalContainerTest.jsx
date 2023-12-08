import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdditionalOwnedIngredientsModalContainer from "../components/AdditionalOwnedIngredientsModalContainer.jsx";
import { renderComponentWithSpecificStore } from "../testSetupHelper/Helper.jsx";
import Recipe from "../objects/Recipe";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

test("renders AdditionalOwnedIngredientsModalContainer with continue button", () => {
  const mockState = {
    user: {
      favoriteRecipes: ["1", "2"],
      loggedIn: true,
    },
    recipe: {
      recipes: [new Recipe(",", "title", ["1", "2"], "method")],
      currentRecipeIndex: 0,
    },
    recipeGeneration: {
      ownedIngredients: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(
    <AdditionalOwnedIngredientsModalContainer />,
    mockStore
  );

  expect(
    screen.getByTestId("AdditionalOwnedIngredientsModalContainer")
  ).toBeInTheDocument();
  expect(screen.getByText("Fortsæt")).toBeInTheDocument();
});

describe("checkboxes and continue button", () => {
  beforeEach(() => {
    const mockState = {
      user: {
        loggedIn: true,
      },
      recipe: {
        recipes: [new Recipe("1", "title", ["1", "2"], "method")],
        currentRecipeIndex: 0,
      },
      recipeGeneration: {
        ownedIngredients: [],
      },
    };
    // configureMockStore() returns a function that can be called with the initial state
    const mockStore = configureMockStore()(mockState);

    renderComponentWithSpecificStore(
      <AdditionalOwnedIngredientsModalContainer />,
      mockStore
    );
  });
  test("renders checkboxes for each unowned ingredient", () => {
    expect(screen.getAllByRole("checkbox").length).toBe(2);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
  test("clicking on checkbox should check it", () => {
    const firstIngredient = screen.getAllByTestId("IngredientCheckbox")[0];
    fireEvent.click(firstIngredient);
    expect(firstIngredient).toBeChecked();
  });
  test("clicking on continue button should call onclick function", () => {
    const onClick = jest.fn();

    const continueButton = screen.getByText("Fortsæt");
    continueButton.onclick = onClick;
    fireEvent.click(continueButton);
    expect(onClick).toHaveBeenCalled();
  });
  test("clicking on continue button changes overflow styling of body to visible", () => {
    //when the modal is open, the body should have overflow hidden
    document.body.style.overflow = "hidden";
    expect(document.body).toHaveStyle("overflow: hidden");

    const continueButton = screen.getByText("Fortsæt");
    fireEvent.click(continueButton);

    expect(document.body).toHaveStyle("overflow: visible");
  });
});
