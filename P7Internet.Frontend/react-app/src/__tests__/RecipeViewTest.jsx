import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import RecipeView from "../components/RecipeView";
import heartHollow from "../data/heart-hollow.svg";


test("test", () => {
  renderComponent(<RecipeView />)
  const heart = screen.getByRole("img");
  expect(screen.getByText(/Spaghetti Aglio e Olio/)).toBeInTheDocument();
  expect(heart).toBeInTheDocument();
  expect(heart).toHaveAttribute('src', heartHollow)
  expect(screen.getByText(/400g spaghetti/)).toBeInTheDocument();
  expect(screen.getByText(/4 cloves garlic, minced/)).toBeInTheDocument();
  expect(screen.getByText(/1\/4 cup olive oil/)).toBeInTheDocument();
  expect(screen.getByText(/1\/2 teaspoon red pepper flake/)).toBeInTheDocument();
  expect(screen.getByText(/Salt and pepper to taste/)).toBeInTheDocument();
  expect(screen.getByText(/Grated Parmesan cheese/)).toBeInTheDocument();
});