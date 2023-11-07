import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import FrontPageButton from "../components/FrontPageButton";
import test from "node:test";

afterEach(cleanup);

test("Renders the button with correct text", () => {
  renderComponent(<FrontPageButton />);
  const button = screen.getByText(/Tilbage til forsiden/);
  expect(button).toBeInTheDocument();
});

test("Clicking the button calls the goToPageFrontPage function", () => {
  renderComponent(<FrontPageButton />);
  const button = screen.getByText(/Tilbage til forsiden/);
  const goToPageFrontPage = jest.fn();
  button.onclick = goToPageFrontPage;
  fireEvent.click(button);
  expect(goToPageFrontPage).toHaveBeenCalled();
});
