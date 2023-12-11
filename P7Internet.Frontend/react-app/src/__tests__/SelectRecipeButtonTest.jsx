import React from "react";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectRecipeButton from "../components/SelectRecipeButton";
import { ToastContainer } from "react-toastify";
import {
  renderComponent,
  renderComponentWithDispatchActions,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import Recipe from "../objects/Recipe";
import configureMockStore from "redux-mock-store";
import { recipeActions } from "../features/recipeSlice.js";
import { pageActions } from "../features/pageSlice.js";

afterEach(cleanup);

test("renders select recipe button", () => {
  renderComponent(<SelectRecipeButton />);
  const button = screen.getByText("Vælg opskrift");
  expect(button).toBeInTheDocument();
});

describe("clicking the select recipe button:", () => {
  beforeEach(() => {
    const mockState = {
      recipe: {
        recipes: [new Recipe("title", ["ingredients"])],
      },
      offers: {
        stores: [],
        toggleStateIsRadius: false,
      },
      page: {
        additionalOwnedIngredientsModalContainerIsOpen: false,
      },
    };
    // configureMockStore() returns a function that can be called with the initial state
    const mockStore = configureMockStore()(mockState);
    renderComponentWithSpecificStore(<SelectRecipeButton />, mockStore);
  });

  test("clicking on the button, when toggleStateIsRadius is false and stores is empty, means toast appears", async () => {
    render(<ToastContainer position="top-center" />);
    const button = screen.getByText("Vælg opskrift");
    fireEvent.click(button);
    expect(
      await screen.findByText(/Tilføj mindst 1 butik for at vælge opskriften/)
    ).toBeInTheDocument();
  });

  test("clicking the button calls the onClick method", () => {
    const button = screen.getByText("Vælg opskrift");
    const onClick = jest.fn();
    button.onclick = onClick;
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

test("if additionalOwnedIngredientsModalContainerIsOpen is true the AdditionalOwnedIngredients modal is shown", async () => {
  const recipes = [new Recipe("title", ["ingredients"])];
  renderComponentWithDispatchActions(<SelectRecipeButton />, [
    recipeActions.addRecipes(recipes),
    pageActions.openAdditionalOwnedIngredientsModalContainer(),
  ]);

  const modal = await screen.findByText("Andre ingredienser du har?");
  expect(modal).toBeInTheDocument();
  expect(screen.findByTestId("AdditionalOwnedIngredientsModalContainer"));
});
