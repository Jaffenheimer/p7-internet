import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import FrontPageButton from "../components/FrontPageButton";

afterEach(cleanup);

test("Renders the button with correct text", () => {
  renderComponent(<FrontPageButton buttonText="test" />);
  const button = screen.getByTestId("FrontPageButtonTest");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("test");
});

test("Clicking the button calls the onClick function", () => {
  renderComponent(<FrontPageButton />);
  const button = screen.getByTestId("FrontPageButtonTest");
  const goToPageFrontPage = jest.fn();
  button.onclick = goToPageFrontPage;
  fireEvent.click(button);
  expect(goToPageFrontPage).toHaveBeenCalled();
});
