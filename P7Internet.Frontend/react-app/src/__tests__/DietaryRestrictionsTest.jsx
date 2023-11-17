import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import DietaryRestriction from "../components/DietaryRestrictions.jsx";

afterEach(cleanup);

test("Renders the select element with correct title, placeholder, and no values selected", () => {
  renderComponent(<DietaryRestriction />);
  const title = screen.getByText(/Kostbegrænsninger/);
  const selectElement = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
  expect(selectElement.value).toBe("");
});

test("Correct value in the select element after selecting a value", () => {
  renderComponent(<DietaryRestriction />);
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "Vegetar" } });
  expect(selectElement.value).toBe("Vegetar");
});


test("Incorrect value in the select element after selecting a value", () => {
    renderComponent(<DietaryRestriction />);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "Vegetar" } });
    expect(selectElement.value).not.toBe("Veganer");
    });
    