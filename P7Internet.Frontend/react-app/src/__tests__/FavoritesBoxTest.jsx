import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import FavoritesBox from "../components/FavoritesBox";
import { pageActions } from "../features/pageSlice";
import { ToastContainer } from "react-toastify";

afterEach(cleanup);
global.confirm = jest.fn();

test("Renders the favoriteBox with correct title, back button and for each favorite recipe added the element as well as the remove cross", () => {
  renderComponent(<FavoritesBox favoriteRecipes={["1", "2"]} />);
  const title = screen.getByText(/Favoritter/);
  const backCross = screen.getByTestId("CloseModalCross");
  const buttons = screen.getAllByRole("button");
  const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
  expect(title).toBeInTheDocument();
  expect(backCross).toBeInTheDocument();
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe("1");
  expect(buttons[1].textContent).toBe("2");
  expect(recipeCross.length).toBe(2);
});

test("Renders the favoriteBox with correct title and back button, and correct text when no favorite recipes are added", () => {
  renderComponent(<FavoritesBox favoriteRecipes={[]} />);
  const title = screen.getByText(/Favoritter/);
  const backCross = screen.getByTestId("CloseModalCross");
  const buttons = screen.queryAllByRole("button");
  expect(title).toBeInTheDocument();
  expect(backCross).toBeInTheDocument();
  expect(buttons.length).toBe(0);
  expect(
    screen.getByText(/Ingen opskrifter er blevet markeret som favorit./)
  ).toBeInTheDocument();
});

test("Clicking on the back button calls onclick function", () => {
  renderComponent(
    <FavoritesBox
      favoriteRecipes={[]}
      closeModal={pageActions.closeLoginModal}
    />
  );
  const backCross = screen.getByTestId("CloseModalCross");
  backCross.onclick = jest.fn();
  userEvent.click(backCross);
  expect(backCross.onclick).toHaveBeenCalled();
});

test("Selecting a recipe, calls onclick function without problems when the selected recipe is in the recipes object", () => {
  const recipes = [
    {
      title: "test",
      ingredients: [],
      method: [],
    },
  ];
  renderComponent(
    <FavoritesBox
      favoriteRecipes={["test", "2"]}
      recipes={recipes}
      closeModal={pageActions.closeLoginModal}
    />
  );
  const buttons = screen.getAllByRole("button");
  buttons[0].onclick = jest.fn();
  userEvent.click(buttons[0]);
  expect(buttons[0].onclick).toHaveBeenCalled();
});

test("Selecting a recipe, makes toast appears when the selected recipe is not in the recipes object", async () => {
  const recipes = [];
  renderComponent(
    <FavoritesBox
      favoriteRecipes={["1", "2"]}
      recipes={recipes}
      closeModal={pageActions.closeLoginModal}
    />
  );
  render(<ToastContainer position="top-center" />);
  const buttons = screen.getAllByRole("button");
  userEvent.click(buttons[0]);
  expect(
    await screen.findByText(
      /1 er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift./
    )
  ).toBeInTheDocument();
});

test("Clicking on the remove cross calls onclick function", () => {
  renderComponent(
    <FavoritesBox
      favoriteRecipes={["1", "2"]}
      closeModal={pageActions.closeLoginModal}
    />
  );
  const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
  recipeCross[0].onclick = jest.fn();
  userEvent.click(recipeCross[0]);
  expect(recipeCross[0].onclick).toHaveBeenCalled();
});
