import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import FavoritesModalContainer from "../components/FavoritesModalContainer.jsx";
import { pageActions } from "../features/pageSlice.js";
import { ToastContainer } from "react-toastify";
import ModalContent from "../components/ModalContent.jsx";

afterEach(cleanup);

test("renders ModalContent with correct title, back button, and container", () => {
  renderComponent(
    <ModalContent title="Title of Modal" Container={FavoritesModalContainer} />
  );
  const title = screen.getByText(/Title of Modal/);
  const backCross = screen.getByTestId("CloseModalCross");
  const container = screen.getByTestId("FavoritesModalContainer");
  expect(title).toBeInTheDocument();
  expect(backCross).toBeInTheDocument();
  expect(container).toBeInTheDocument();
});

test("Clicking on the back button calls onclick function", () => {
  renderComponent(
    <ModalContent title="Title of Modal" Container={FavoritesModalContainer} />
  );
  const backCross = screen.getByTestId("CloseModalCross");
  backCross.onclick = jest.fn();
  userEvent.click(backCross);
  expect(backCross.onclick).toHaveBeenCalled();
});
