import { cleanup, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import OwnedIngredientsList from "../components/OwnedIngredientsList";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

test("RemoveAllButton should run function on click", () => {
  const mockState = {
    recipeGeneration: {
      ownedIngredients: [
        { id: 1, text: "Ingredient 1" },
        { id: 2, text: "Ingredient 2" },
      ],
    },
  };
  let mockStore = configureMockStore()(mockState);

  render(
    <Provider store={mockStore}>
      <OwnedIngredientsList />
    </Provider>
  );
  const images = screen.getAllByRole("img");
  expect(images[0]).toBeInTheDocument(); // cross image to remove element from list
  expect(images[1]).toBeInTheDocument(); // cross image
  expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
  expect(screen.getByText("Ingredient 2")).toBeInTheDocument();
});
