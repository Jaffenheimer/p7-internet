import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Provider } from "react-redux";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft.jsx";
import userEvent from "@testing-library/user-event";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import Pages from "../objects/Pages";
import configureMockStore from "redux-mock-store";
import { stores } from "../objects/Stores";

afterEach(cleanup);

test("Render RecipeSelectionContainerLeft with expected recipe", () => {
  renderComponent(<RecipeSelectionContainerLeft />);
  expect(screen.getByText(/Spaghetti Aglio e Olio/)).toBeInTheDocument();
  expect(screen.getByText(/400g spaghetti/)).toBeInTheDocument();
  expect(screen.getByText(/4 cloves garlic, minced/)).toBeInTheDocument();
  expect(screen.getByText(/1\/4 cup olive oil/)).toBeInTheDocument();
  expect(
    screen.getByText(/1\/2 teaspoon red pepper flake/)
  ).toBeInTheDocument();
  expect(screen.getByText(/Salt and pepper to taste/)).toBeInTheDocument();
  expect(screen.getByText(/Grated Parmesan cheese/)).toBeInTheDocument();
});

test("Check heart in RecipeTitle and SelectArrows renders properly ", () => {
  renderComponent(<RecipeSelectionContainerLeft />);
  const images = screen.getAllByRole("img");

  expect(images[0]).toHaveAttribute("src", "heart-hollow.svg");
  expect(images[1]).toHaveAttribute("src", "leftArrow.svg");
  expect(images[2]).toHaveAttribute("src", "rightArrow.svg");
});

test("Check recipe changes after pressing arrow right", () => {
  renderComponent(<RecipeSelectionContainerLeft />);
  const rightArrow = screen.getAllByRole("img")[2];

  expect(screen.getByText(/Spaghetti Aglio e Olio/)).toBeInTheDocument(); //recipe title
  fireEvent.click(rightArrow);
  expect(screen.getByText(/Chicken Stir-Fry/)).toBeInTheDocument(); //recipe title
});

test("Check recipe changes after pressing arrow left", () => {
  renderComponent(<RecipeSelectionContainerLeft />);
  const leftArrow = screen.getAllByRole("img")[1];

  expect(screen.getByText(/Spaghetti Aglio e Olio/)).toBeInTheDocument(); //recipe title
  fireEvent.click(leftArrow);
  expect(screen.getByText(/Caprese Salad/)).toBeInTheDocument(); //recipe title
});

describe("integration tests for RecipeSelectionContainerLeft", () => {
  let mockStore;
  beforeEach(() => {
    const mockState = {
      recipeGeneration: {
        ownedIngredients: [],
      },
      offers: {
        stores: stores,
        toggleRadius: true,
        radius: "100 m",
      },
      page: {
        page: Pages.RecipeSelection,
      },
      recipe: {
        recipes: [
          {
            title: "Spaghetti",
            ingredients: ["400g spaghetti", "4 cloves"],
            method: ["cook spaghetti", "etc."],
          },
          {
            title: "Chicken Stir-Fry",
            ingredients: ["1 onion", "2 bell peppers"],
            method: ["heat", "etc."],
          },
        ],
        currentRecipeIndex: 0,
      },
      user: {
        loggedIn: true,
      },
    };
    mockStore = configureMockStore()(mockState);

    render(
      <Provider store={mockStore}>
        <RecipeSelectionContainerLeft />
      </Provider>
    );
  });

  it("Click the Heart button", () => {
    const heart = screen.getAllByRole("img")[0];
    expect(heart).toHaveAttribute("src", heartHollow);
    userEvent.click(heart);
    expect(heart).toHaveAttribute("src", heartSolid);
  });

  it("Click the Heart button, press arrow right expect heart hollow", async () => {
    const rightArrow = screen.getAllByRole("img")[2];
    const heart = screen.getAllByRole("img")[0];
    userEvent.click(heart);
    expect(heart).toHaveAttribute("src", heartSolid);
    userEvent.click(rightArrow);
    setTimeout(() => {
      expect(heart).toHaveAttribute("src", heartHollow);
    }, 100);
  });
});
