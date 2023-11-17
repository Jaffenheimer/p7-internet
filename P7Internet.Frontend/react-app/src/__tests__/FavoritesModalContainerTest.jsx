import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  renderComponent,
  renderComponentWithSpecificStore,
} from "../testSetupHelper/Helper.jsx";
import FavoritesModalContainer from "../components/FavoritesModalContainer";
import { pageActions } from "../features/pageSlice";
import { ToastContainer } from "react-toastify";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);
jest.spyOn(window, "confirm").mockImplementation(() => {});

test("", () => {});

test("Renders the favoriteBox for each favorite recipe added the element as well as the remove cross", () => {
  const mockState = {
    user: {
      favoriteRecipes: ["1", "2"],
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<FavoritesModalContainer />, mockStore);

  const buttons = screen.getAllByRole("button");
  const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe("1");
  expect(buttons[1].textContent).toBe("2");
  expect(recipeCross.length).toBe(2);
});

test("Renders the favoritesModalContainer with correct text when no favorite recipes are added", () => {
  const mockState = {
    user: {
      favoriteRecipes: [],
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<FavoritesModalContainer />, mockStore);

  //   renderComponentWithSpecificStore(<FavoritesModalContainer />);
  const buttons = screen.queryAllByRole("button");
  expect(buttons.length).toBe(0);
  expect(
    screen.getByText(/Ingen opskrifter er blevet markeret som favorit./)
  ).toBeInTheDocument();
});

test("if user is not logged in the there are no favorite recipes", () => {
  renderComponent(<FavoritesModalContainer />);

  const buttons = screen.queryAllByRole("button");
  expect(buttons.length).toBe(0);
  expect(
    screen.getByText(/Ingen opskrifter er blevet markeret som favorit./)
  ).toBeInTheDocument();
});

test("Selecting a recipe, makes toast appears when the selected recipe is not in the recipes object", async () => {
  const mockState = {
    user: {
      favoriteRecipes: ["1", "2"],
      loggedIn: true,
    },
    recipe: {
      recipes: [],
    },
  };
  const mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<FavoritesModalContainer />, mockStore);
  render(<ToastContainer position="top-center" />);
  const buttons = screen.getAllByRole("button");
  userEvent.click(buttons[0]);
  expect(
    await screen.findByText(
      /1 er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift./
    )
  ).toBeInTheDocument();
});

test("Selecting a recipe, calls onclick function without problems when the selected recipe is in the recipes object", () => {
  const mockState = {
    user: {
      favoriteRecipes: ["1", "2"],
      loggedIn: true,
    },
    recipe: {
      recipes: ["1", "2"],
    },
  };
  const mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<FavoritesModalContainer />, mockStore);
  const buttons = screen.getAllByRole("button");
  buttons[0].onclick = jest.fn();
  userEvent.click(buttons[0]);
  expect(buttons[0].onclick).toHaveBeenCalled();
});

test("Clicking on the remove cross calls onclick function", () => {
  const mockState = {
    user: {
      favoriteRecipes: ["1", "2"],
      loggedIn: true,
    },
    recipe: {
      recipes: ["1", "2"],
    },
  };
  const mockStore = configureMockStore()(mockState);
  renderComponentWithSpecificStore(<FavoritesModalContainer />, mockStore);
  const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
  recipeCross[0].onclick = jest.fn();
  userEvent.click(recipeCross[0]);
  expect(recipeCross[0].onclick).toHaveBeenCalled();
});
