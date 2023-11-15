import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { ExcludeList } from "../components";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

describe("ExcludeList", () => {
  let mockStore;
  beforeEach(() => {
    // Mocking the store such that the component can be rendered
    const mockState = {
      recipeGeneration: {
        excludeList: [{ id: 1, text: "Ingredient 1" }],
      },
    };
    // configureMockStore() returns a function that can be called with the initial state
    mockStore = configureMockStore()(mockState);

    render(
      // Wrapping the component in the Provider so it can connect to the store
      <Provider store={mockStore}>
        <ExcludeList />
      </Provider>
    );
  });
  it("checks if ExcludeList is rendered", () => {
    expect(screen.getByTestId("ExcludeList")).toBeInTheDocument();
  });
  it("checks if the header is rendered", () => {
    expect(screen.getByText(/Ekskluder ingredienser:/)).toBeInTheDocument();
  });
  it("checks if the add ingredient form is rendered", () => {
    expect(screen.getByTestId("AddIngredientsForm")).toBeInTheDocument();
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
    expect(screen.getByText(/Ingredient 1/)).toBeInTheDocument();
  });
});
