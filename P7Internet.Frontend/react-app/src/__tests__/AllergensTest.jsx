import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import Allergens from "../components/Allergens";

afterEach(cleanup);
beforeEach(() => {
  renderComponent(<Allergens />);
});

test("Renders the select element with correct title, placeholder, and no values selected", () => {
  const title = screen.getByText(/Allergener/);
  const placeholder = screen.getByText(/Vælg allergener/);
  const selectElement = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
  expect(selectElement).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
  expect(selectElement.value).toBe("");
});

test("Choosing an option - the option gets selected", () => {
  const selectElement = screen.getByRole("combobox");
  expect(screen.getByText(/Vælg allergener/)).toBeInTheDocument(); //default text of Select is the placeholder

  fireEvent.change(selectElement, {
    target: { value: "Lactosefree" },
  });
  expect(selectElement.value).toBe("Lactosefree"); //after choosing an option, the option gets selected
  expect(screen.getByText(/Laktosefri/)).toBeInTheDocument(); //and the text of the option is displayed
});

test("Removing an option - the option gets removed", () => {
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, {
    target: { value: "Lactosefree" },
  }); //selecting the option

  expect(selectElement.value).toBe("Lactosefree"); //after choosing an option, the option gets selected
  expect(screen.getByText(/Laktosefri/)).toBeInTheDocument(); //the option is visible

  fireEvent.change(selectElement, {
    target: { value: "" },
  }); //deselecting the option

  expect(selectElement.value).toBe(""); //after deselecting the option, the value of the select is empty
  expect(screen.getByText(/Vælg allergener/)).toBeInTheDocument(); //placeholder is back after deleting the option
});
