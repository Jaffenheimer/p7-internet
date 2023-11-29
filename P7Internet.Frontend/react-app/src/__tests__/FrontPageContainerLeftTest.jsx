import {
  cleanup,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { FrontPageContainerLeft } from "../components";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { renderComponentWithSpecificStore } from "../testSetupHelper/Helper";

afterEach(cleanup);

describe("FrontPageContainerLeft", () => {
  let mockStore;

  beforeEach(() => {
    // Mocking the store such that the component can be rendered
    const mockState = {
      recipeGeneration: {
        ownedIngredients: [
          { id: 1, name: "Ingredient 1" },
          { id: 2, name: "Ingredient 2" },
        ],
      },
    };
    // configureMockStore() returns a function that can be called with the initial state
    mockStore = configureMockStore()(mockState);
    renderComponentWithSpecificStore(<FrontPageContainerLeft />, mockStore);
  });

  it("checks if FrontPageContainerLeft is rendered", () => {
    expect(
      screen.getByTestId("FrontPageContainerLeftTest")
    ).toBeInTheDocument();
  });
  it("checks if the generate button is rendered", () => {
    expect(screen.getByText(/Generer opskrifter/)).toBeInTheDocument();
  });
  it("checks if the add ingredient form is rendered", () => {
    expect(
      screen.getByTestId("OwnedIngredientsAddIngredientsForm")
    ).toBeInTheDocument();
  });
  it("checks if the add button is rendered", () => {
    expect(screen.getByText(/Tilføj/)).toBeInTheDocument();
  });
  it("checks if the remove all button is rendered", () => {
    expect(screen.getByText(/Fjern alle/)).toBeInTheDocument();
  });
  it("checks if the header is rendered", () => {
    expect(
      screen.getByText(/Ingredienser jeg gerne vil bruge:/)
    ).toBeInTheDocument();
  });
  it("checks if the owned ingredients list is rendered", () => {
    expect(screen.getByTestId("OwnedIngredientsList")).toBeInTheDocument();
  });
});

test("checks if a user has added an ingredient no toast appears when clicking generate recipe button", async () => {
  let mockStore;
  const mockState = {
    recipeGeneration: {
      excludeList: [],
      ownedIngredients: [],
    },
  };
  mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<FrontPageContainerLeft />, mockStore);
  const input = screen.getByTestId("AddIngredientInput");
  const addButton = screen.getByTestId("AddButton");
  userEvent.type(input, "test");
  fireEvent.click(addButton);
  const button = screen.getByTestId("GenerateRecipesButton");
  await act(() => fireEvent.click(button));
  await expect(() =>
    screen.getByText(
      /Du skal tilføje mindst 1 ingrediens for at generere opskrifter/
    )
  ).toThrow("Unable to find an element");
});
