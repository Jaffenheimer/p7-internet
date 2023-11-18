import { cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import RemoveAllButton from "../components/RemoveAllButton";

afterEach(cleanup);

test("RemoveAllButton should run function on click", () => {
  onChange = jest.fn();
  renderComponent(< RemoveAllButton handleClick={onChange} />);
  const button = screen.getByRole("button");
  expect(screen.getByText("Fjern alle")).toBeInTheDocument();
  expect(onChange).toHaveBeenCalledTimes(0);
  fireEvent.click(button);
  expect(onChange).toHaveBeenCalledTimes(1);
});