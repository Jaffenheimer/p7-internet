import {
  cleanup,
  fireEvent,
  screen,
  render,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  renderComponent,
  renderComponentWithDispatchActions,
} from "../testSetupHelper/Helper.jsx";
import GenerateRecipesButton from "../components/GenerateRecipesButton.jsx";
import { ToastContainer } from "react-toastify";
import { recipeGenerationActions } from "../features/recipeGenerationSlice.js";

afterEach(cleanup);

test("GenerateRecipesButton renders properly", () => {
  renderComponent(<GenerateRecipesButton />);
  expect(screen.getByTestId("GenerateRecipesButton")).toBeInTheDocument();
  expect(screen.getByText(/Generer opskrifter/)).toBeInTheDocument();
});

test("toast appears when GenerateRecipesButton is clicked if no ingredients are added", async () => {
  renderComponent(<GenerateRecipesButton />);
  render(<ToastContainer position="top-center" />);
  const button = screen.getByTestId("GenerateRecipesButton");
  await act(() => fireEvent.click(button));
  expect(
    await screen.findByText(
      /Du skal tilføje mindst 1 ingrediens for at generere opskrifter/
    )
  ).toBeInTheDocument();
});

test("GenerateRecipesButton calls onclick function when clicked", () => {
  renderComponent(<GenerateRecipesButton />);
  const button = screen.getByTestId("GenerateRecipesButton");
  button.onclick = jest.fn();
  fireEvent.click(button);
  expect(button.onclick).toHaveBeenCalled();
});
