import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RecipeView from "../components/RecipeView";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

afterEach(cleanup);

describe("RecipeView tests", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      recipeGeneration: {
        ownedIngredients: [],
      },
      user: {
        loggedIn: true,
      },
      recipe: {
        currentRecipeIndex: 0,
      },
    };
    mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <RecipeView />
      </Provider>
    );
  });

  it("render expected default recipe", () => {
    const heart = screen.getByRole("img");
    expect(screen.getByText(/Spaghetti Aglio e Olio/)).toBeInTheDocument();
    expect(heart).toBeInTheDocument();
    expect(heart).toHaveAttribute("src", heartHollow);
    expect(screen.getByText(/400g spaghetti/)).toBeInTheDocument();
    expect(screen.getByText(/4 cloves garlic, minced/)).toBeInTheDocument();
    expect(screen.getByText(/1\/4 cup olive oil/)).toBeInTheDocument();
    expect(
      screen.getByText(/1\/2 teaspoon red pepper flake/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Salt and pepper to taste/)).toBeInTheDocument();
    expect(screen.getByText(/Grated Parmesan cheese/)).toBeInTheDocument();
  });

  it("Heart should be clickable while logged in", () => {
    const heart = screen.getByRole("img");
    expect(heart).toHaveAttribute("src", heartHollow);
    fireEvent.click(heart);
    expect(heart).toHaveAttribute("src", heartSolid);
  });
});
