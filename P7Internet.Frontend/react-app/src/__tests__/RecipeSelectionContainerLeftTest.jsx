import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponentWithDispatchActions } from "../testSetupHelper/Helper.jsx";
import RecipeSelectionContainerLeft from "../components/RecipeSelectionContainerLeft.jsx";
import userEvent from "@testing-library/user-event";
import heartHollow from "../data/heart-hollow.svg";
import heartSolid from "../data/heart-solid.svg";
import leftArrow from "../data/leftArrow.svg";
import rightArrow from "../data/rightArrow.svg";
import { recipeActions } from "../features/recipeSlice";
import { userActions } from "../features/userSlice.js";
import Recipe from "../objects/Recipe.js";

afterEach(cleanup);


test("Content of left container is rendered correctly ", () => {
  const recipes = [
    new Recipe("1", "Recipe 1", ["ingredient 1", "ingredient 2"]),
    new Recipe("2", "Recipe 2", ["ingredient 3", "ingredient 4"]),
  ];
  renderComponentWithDispatchActions(<RecipeSelectionContainerLeft />, [
    recipeActions.addRecipes(recipes),
  ]);
  const heart = screen.getByTestId("heartImage");
  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument();
  expect(screen.getByText(/ingredient 1/)).toBeInTheDocument();
  expect(screen.getByText(/ingredient 2/)).toBeInTheDocument();
  expect(heart).toBeInTheDocument();
  expect(heart).toHaveAttribute("src", heartHollow);
  expect(screen.getByTestId("selectArrowLeft")).toHaveAttribute(
    "src",
    leftArrow
  );
  expect(screen.getByTestId("selectArrowRight")).toHaveAttribute(
    "src",
    rightArrow
  );
});

test("Recipe changes after pressing arrow right", async () => {
  const recipes = [
    new Recipe("1","Recipe 1", ["ingredient 1", "ingredient 2"]),
    new Recipe("2","Recipe 2", ["ingredient 3", "ingredient 4"]),
    new Recipe("3","Recipe 3", ["ingredient 5", "ingredient 6"]),
  ];
  renderComponentWithDispatchActions(<RecipeSelectionContainerLeft />, [
    recipeActions.addRecipes(recipes),
  ]);
  const rightArrow = screen.getByTestId("selectArrowRight");

  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument(); //recipe title
  fireEvent.click(rightArrow);
  expect(await screen.getByText(/Recipe 2/)).toBeInTheDocument(); //recipe title
});

test("Recipe changes after pressing arrow left", async () => {
  const recipes = [
    new Recipe("1", "Recipe 1", ["ingredient 1", "ingredient 2"]),
    new Recipe("2", "Recipe 2", ["ingredient 3", "ingredient 4"]),
    new Recipe("3", "Recipe 3", ["ingredient 5", "ingredient 6"]),
  ];
  renderComponentWithDispatchActions(<RecipeSelectionContainerLeft />, [
    recipeActions.addRecipes(recipes),
  ]);
  const leftArrow = screen.getByTestId("selectArrowLeft");

  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument(); //recipe title
  fireEvent.click(leftArrow);
  expect(await screen.getByText(/Recipe 3/)).toBeInTheDocument(); //recipe title
});

test("Marking one recipe as favorite, changes state of the heart icon for that recipe, but remaining recipes are not marked as favorite", async () => {
  const recipes = [
    new Recipe("1","Recipe 1", ["ingredient 1", "ingredient 2"]),
    new Recipe("2","Recipe 2", ["ingredient 3", "ingredient 4"]),
    new Recipe("3","Recipe 3", ["ingredient 5", "ingredient 6"]),
  ];
  renderComponentWithDispatchActions(<RecipeSelectionContainerLeft />, [
    recipeActions.addRecipes(recipes),
    userActions.addFavoriteRecipe(recipes[0]), //mark first recipe as favorite
  ]);

  const rightArrow = screen.getByTestId("selectArrowRight");
  const heartFirstRecipe = screen.getByTestId("heartImage");
  expect(screen.getByText(/Recipe 1/)).toBeInTheDocument(); //first recipe title
  expect(heartFirstRecipe).toHaveAttribute("src", heartSolid); //marked as favorite
  //move to second recipe
  userEvent.click(rightArrow);
  expect(screen.getByText(/Recipe 2/)).toBeInTheDocument(); //second recipe title
  expect(heartFirstRecipe).toHaveAttribute("src", heartHollow); //not marked as favorite
  //move to third recipe
  userEvent.click(rightArrow);
  expect(screen.getByText(/Recipe 3/)).toBeInTheDocument(); //third recipe title
  expect(heartFirstRecipe).toHaveAttribute("src", heartHollow); //not marked as favorite
});
