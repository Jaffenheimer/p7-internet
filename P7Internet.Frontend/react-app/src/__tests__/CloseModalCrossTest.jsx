import React from "react";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CloseModalCross from "../components/CloseModalCross.jsx";

afterEach(cleanup);
test("renders close modal cross", () => {
  render(<CloseModalCross />);
  const cross = screen.getByTestId("CloseModalCross");
  expect(cross).toBeInTheDocument();
});

test("clicking the cross calls the onClick method", () => {
  const onClick = jest.fn();
  render(<CloseModalCross closeModal={onClick} />);
  const cross = screen.getByTestId("CloseModalCross");
  fireEvent.click(cross);
  expect(onClick).toHaveBeenCalled();
});
