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

test("renders ModalContent with correct title and back button", () => {
  // renderComponent(<ModalContent title="Title of Modal" />);
  // const title = screen.getByText(/Title of Modal/);
  // const backCross = screen.getByTestId("CloseModalCross");
  // expect(title).toBeInTheDocument();
  // expect(backCross).toBeInTheDocument();
});
