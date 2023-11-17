import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import FavoritesModalContainer from "../components/FavoritesModalContainer";
import { pageActions } from "../features/pageSlice";
import { ToastContainer } from "react-toastify";

afterEach(cleanup);
jest.spyOn(window, "confirm").mockImplementation(() => {});

test("Renders the favoriteBox for each favorite recipe added the element as well as the remove cross", () => {
  renderComponent(<FavoritesModalContainer favoriteRecipes={["1", "2"]} />);

  const buttons = screen.getAllByRole("button");
  const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe("1");
  expect(buttons[1].textContent).toBe("2");
  expect(recipeCross.length).toBe(2);
});

test("Renders the favoritesModalContainer with correct text when no favorite recipes are added", () => {
  renderComponent(<FavoritesModalContainer favoriteRecipes={[]} />);
  const buttons = screen.queryAllByRole("button");
  expect(buttons.length).toBe(0);
  expect(
    screen.getByText(/Ingen opskrifter er blevet markeret som favorit./)
  ).toBeInTheDocument();
});

// test("Clicking on the back button calls onclick function", () => {
//   renderComponent(
//     <FavoritesModalContainer
//       favoriteRecipes={[]}
//       closeModal={pageActions.closeLoginModal}
//     />
//   );
//   const backCross = screen.getByTestId("CloseModalCross");
//   backCross.onclick = jest.fn();
//   userEvent.click(backCross);
//   expect(backCross.onclick).toHaveBeenCalled();
// });

// test("Selecting a recipe, calls onclick function without problems when the selected recipe is in the recipes object", () => {
//   const recipes = [
//     {
//       title: "test",
//       ingredients: [],
//       method: [],
//     },
//   ];
//   renderComponent(
//     <FavoritesModalContainer
//       favoriteRecipes={["test", "2"]}
//       recipes={recipes}
//       closeModal={pageActions.closeLoginModal}
//     />
//   );
//   const buttons = screen.getAllByRole("button");
//   buttons[0].onclick = jest.fn();
//   userEvent.click(buttons[0]);
//   expect(buttons[0].onclick).toHaveBeenCalled();
// });

// test("Selecting a recipe, makes toast appears when the selected recipe is not in the recipes object", async () => {
//   const recipes = [];
//   renderComponent(
//     <FavoritesModalContainer
//       favoriteRecipes={["1", "2"]}
//       recipes={recipes}
//       closeModal={pageActions.closeLoginModal}
//     />
//   );
//   render(<ToastContainer position="top-center" />);
//   const buttons = screen.getAllByRole("button");
//   userEvent.click(buttons[0]);
//   expect(
//     await screen.findByText(
//       /1 er ikke i listen af opskrifter på databasen. Prøv at vælge en anden opskrift./
//     )
//   ).toBeInTheDocument();
// });

// test("Clicking on the remove cross calls onclick function", () => {
//   renderComponent(
//     <FavoritesModalContainer
//       favoriteRecipes={["1", "2"]}
//       closeModal={pageActions.closeLoginModal}
//     />
//   );
//   const recipeCross = screen.getAllByTestId("RemoveFavoriteRecipeCross");
//   recipeCross[0].onclick = jest.fn();
//   userEvent.click(recipeCross[0]);
//   expect(recipeCross[0].onclick).toHaveBeenCalled();
// });
