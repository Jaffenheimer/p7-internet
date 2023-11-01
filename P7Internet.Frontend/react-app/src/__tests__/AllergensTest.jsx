import { cleanup, fireEvent, screen  } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import Allergens from "../components/Allergens";

afterEach(cleanup)

test("Renders the allergens caption", () => {
  renderComponent(<Allergens />);
  const linkElement = screen.getByText(/Allergener/);
  expect(linkElement).toBeInTheDocument();
});

test("Renders the select element with correct placeholder and no values selected", () => {
    renderComponent(<Allergens />);
    const placeholder = screen.getByText(/Vælg allergener/);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
    expect(selectElement.value).toBe('')
  });

test("Choosing an option - the option gets selected", () => {
  renderComponent(<Allergens />);
  const selectElement = screen.getByRole('combobox');
  expect(screen.getByText(/Vælg allergener/)).toBeInTheDocument(); //default text of Select is the placeholder
  
  fireEvent.change(selectElement, {
    target: {value: "Lactosefree"},
  });
  expect(selectElement.value).toBe('Lactosefree') //after choosing an option, the option gets selected
  expect(screen.getByText(/Laktosefri/)).toBeInTheDocument(); //and the text of the option is displayed
});

test("Removing an option - the option gets removed", () => {
    renderComponent(<Allergens />);
    
    const placeholder = screen.getByText(/Vælg allergener/);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, {
      target: {value: "Lactosefree"},
    }); //selecting the option

    expect(selectElement.value).toBe('Lactosefree') //after choosing an option, the option gets selected
    expect(screen.getByText(/Laktosefri/)).toBeInTheDocument(); //the option is visible
    
    fireEvent.change(selectElement, {
      target: {value: ""},
    }); //deselecting the option

    expect(selectElement.value).toBe('') //after deselecting the option, the value of the select is empty
    expect(screen.getByText(/Vælg allergener/)).toBeInTheDocument(); //placeholder is back after deleting the option
  });
    
//other tests to make i i knew how to do it:
test("Choosing both options - both options get selected", () => {

});

test("Removing both options - both options get removed", () => {

});

test("searching for 'Lak' - 'Laktosefri' shows up", () => {
  
  });

  //see this: https://stackoverflow.com/questions/41991077/testing-react-select-component