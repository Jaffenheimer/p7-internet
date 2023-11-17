import {
  cleanup,
  render,
  screen,
  fireEvent,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import { ExcludeList } from "../components";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ToastContainer } from "react-toastify";

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
    expect(screen.getByText(/Ingredient 0/)).toBeInTheDocument();
  });
  it("checks if all ingredients are rendered", () => {
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(`Ingredient ${i}`)).toBeInTheDocument();
    }
  });
});

test("checks if the ingredientlist is empty", () => {
  let mockStore;
  const mockState = {
    recipeGeneration: {
      excludeList: [],
    },
  };
  mockStore = configureMockStore()(mockState);

  render(
    <Provider store={mockStore}>
      <ExcludeList />
    </Provider>
  );
  const list = screen.queryByTestId("IngredientElement");
  expect(list).not.toBeInTheDocument();
});


