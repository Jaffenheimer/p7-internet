import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import DietaryRestrictions from "../components/DietaryRestrictions.jsx";

afterEach(cleanup);

test("Renders the select element with correct title, placeholder, and no values selected", () => {
  renderComponent(<DietaryRestrictions />);
  const title = screen.getByText(/Kostbegrænsninger/);
  const selectElement = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
  expect(selectElement.value).toBe("");
});

test("Correct value in the select element after selecting a value", () => {
  renderComponent(<DietaryRestrictions />);
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "Vegetar" } });
  expect(selectElement.value).toBe("Vegetar");
});

test("Incorrect value in the select element after selecting a value", () => {
  renderComponent(<DietaryRestrictions />);
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "Vegetar" } });
  expect(selectElement.value).not.toBe("Veganer");
});

test("Only defaultOptions are shown when no dietary restriction has been selected", () => {
  renderComponent(<DietaryRestrictions />);

  // Open the dropdown
  const selectElement = screen.getByRole("combobox");
  fireEvent.mouseDown(selectElement);

  // Check that only the defaultOptions are shown
  const ingenOption = screen.queryByText("Ingen");
  expect(ingenOption).not.toBeInTheDocument();

  const pescetarOption = screen.queryByText("Pescetar");
  const veganerOption = screen.queryByText("Veganer");
  const vegetarOption = screen.queryByText("Vegetar");
  expect(pescetarOption).toBeInTheDocument();
  expect(veganerOption).toBeInTheDocument();
  expect(vegetarOption).toBeInTheDocument();
});

test("'Ingen' is an option when a dietary restriction has been selected", async () => {
  renderComponent(<DietaryRestrictions />);

  // Select a dietary restriction
  const selectElement = screen.getByRole("combobox");
  fireEvent.mouseDown(selectElement);
  const vegetarOption = await screen.findByText("Vegetar");
  fireEvent.click(vegetarOption);

  // Open the dropdown again
  fireEvent.mouseDown(selectElement);

  // Check that 'Ingen' is an option
  const ingenOption = await screen.findByText("Ingen");
  expect(ingenOption).toBeInTheDocument();
});
