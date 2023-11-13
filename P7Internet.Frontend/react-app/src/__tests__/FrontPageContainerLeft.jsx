import { cleanup, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { FrontPageContainerLeft } from "../components";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

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

    render(
      // Wrapping the component in the Provider so it can connect to the store
      <Provider store={mockStore}>
        <FrontPageContainerLeft />
      </Provider>
    );
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
    expect(screen.getByTestId("AddIngredientsForm")).toBeInTheDocument();
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

