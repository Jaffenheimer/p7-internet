import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import AddIngredientInput from "../components/AddIngredientInput.jsx";

afterEach(cleanup);

test("Renders the input field with correct placehold", () => {
  renderComponent(<AddIngredientInput placeholder="Tilføj en ingrediens..." />);
  const inputField = screen.getByTestId("AddIngredientInput");
  expect(inputField).toBeInTheDocument();
  expect(inputField.placeholder).toBe("Tilføj en ingrediens...");
});

test("Typing in the input field changes the value of the input field and calls onchangefunction", () => {
  mockOnChange = jest.fn();
  renderComponent(<AddIngredientInput handleChange={mockOnChange} />);
  const inputField = screen.getByTestId("AddIngredientInput");
  fireEvent.change(inputField, {
    target: { value: "test" },
  });
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(inputField.value).toBe("test");
});
