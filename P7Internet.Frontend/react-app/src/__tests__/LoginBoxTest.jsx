import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import LoginBox from "../components/LoginBox";

afterEach(cleanup);

test("Renders the expected text in login box", () => {
  renderComponent(<LoginBox />);
  expect(screen.getByText(/Brugernavn/)).toBeInTheDocument();
  expect(screen.getByText(/Kodeord/)).toBeInTheDocument();
  expect(screen.getByText(/Ingen bruger:/)).toBeInTheDocument();
});

test("Renders the expected image in login box", () => {
  renderComponent(<LoginBox />);
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "cross.svg");
});

test("Renders the expected button in login box", () => {
  renderComponent(<LoginBox />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Renders the cross image in login box and it is clickable", () => {
  const mockCallBack = jest.fn(() => {});
  renderComponent(<LoginBox closeModal={mockCallBack} />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  fireEvent.click(image);
  expect(mockCallBack.mock.calls).toHaveLength(1);
});
