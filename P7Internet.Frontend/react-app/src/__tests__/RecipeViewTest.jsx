import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RecipeView from "../components/RecipeView";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import configureMockStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  renderComponentWithDispatchActions,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft.jsx";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice.js";
import Recipe from "../objects/Recipe.js";

afterEach(cleanup);

test("Renders expected default recipe not marked as favorite by default", () => {
  const recipes = {
    id: "0",
    title: "Recipe 1",
    ingredients: ["ingredient 1", "ingredient 2"],
  };
  renderComponentWithDispatchActions(<RecipeSelectionContainerLeft />, [
    recipeActions.addRecipes(recipes),
  ]);
  const heart = screen.getByTestId("heartImage");
  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument();
  expect(heart).toBeInTheDocument();
  expect(heart).toHaveAttribute("src", heartHollow);
  expect(screen.getByText(/ingredient 1/)).toBeInTheDocument();
  expect(screen.getByText(/ingredient 2/)).toBeInTheDocument();
});

test("Renders expected default recipe not marked as favorite by default when currentRecipeIndex is changed", () => {
  const recipe1 = {
    id: "1",
    title: "Recipe 1",
    ingredients: ["ingredient 1", "ingredient 2"],
    method: ["method"],
    shortIngredients: ["1", "2"],
  };
  const recipe2 = {
    id: "1",
    title: "Recipe 2",
    ingredients: ["ingredient 3", "ingredient 4"],
    method: ["method"],
    shortIngredients: ["1", "2"],
  };
  // const mockStore = getMockStoreWithMultipleRecipesWithRecipeIndexOf(0);
  // expect(defaultRecipes).toHaveLength(2);
  renderComponentWithDispatchActions(<RecipeView />, [
    recipeActions.addRecipes(recipe1),
    recipeActions.addRecipes(recipe2),
    recipeActions.setCurrentRecipeIndex(1),
  ]);

  const heart = screen.getByTestId("heartImage");
  expect(screen.getByText(/Recipe 2/)).toBeInTheDocument();
  expect(heart).toBeInTheDocument();
  expect(heart).toHaveAttribute("src", heartHollow);
  expect(screen.getByText(/ingredient 3/)).toBeInTheDocument();
  expect(screen.getByText(/ingredient 4/)).toBeInTheDocument();
});

test("When clicking heart, the dispatch method for adding it to favorites is called", async () => {
  const recipe1 = {
    title: "Recipe 1",
    ingredients: ["ingredient 1", "ingredient 2"],
  };
  const mockState = {
    recipeGeneration: {
      ownedIngredients: [],
    },
    offers: {},
    page: {},
    recipe: {
      recipes: [
        {
          title: "Recipe 1",
          ingredients: ["ingredient 1", "ingredient 2"],
        },
      ],
      currentRecipeIndex: 0,
    },
    user: {
      loggedIn: true,
    },
  };
  const mockStore = configureMockStore()(mockState);
  const spy = jest.spyOn(mockStore, "dispatch");
  renderComponentWithSpecificStore(<RecipeView />, mockStore);
  const heart = screen.getByTestId("heartImage");
  userEvent.click(heart);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(userActions.addFavoriteRecipe(recipe1));
});

test("heart is solid when recipe is marked as favorite", () => {
  //new Recipe(response.recipeId, title, filteredingredientList, methodArray, response.ingredients);

  const recipes = {
    id: "1",
    title: "Recipe 1",
    ingredients: ["1", "2"],
    method: ["method"],
    shortIngredients: ["1", "2"],
  };

  renderComponentWithDispatchActions(<RecipeView />, [
    recipeActions.addRecipes("heart: ", recipes),
    userActions.addFavoriteRecipe(recipes[0]),
  ]);

  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument();
  expect(screen.getByTestId("heartImage")).toHaveAttribute("src", heartSolid);
});
