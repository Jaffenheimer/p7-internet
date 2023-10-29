import { act, cleanup, fireEvent, getAllByRole, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import {renderComponent} from "../testSetupHelper/Helper.jsx";
import Allergens from "../components/Allergens";
import userEvent from '@testing-library/user-event'
import selectEvent from 'react-select-event'

afterEach(cleanup)

test("Renders the allergens caption", () => {
  renderComponent(<Allergens />);
  const linkElement = screen.getByText(/Allergener/);
  expect(linkElement).toBeInTheDocument();
});

test("Renders the select element with correct placeholder", () => {
    renderComponent(<Allergens />);
    const placeholder = screen.getByText(/Vælg allergener/);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });

  //vil gerne teste at de andre options ikke er valgt - dunnno how though
test("Default options is the placeholder", () => {
  renderComponent(<Allergens />);
  const placeholder = screen.getByText(/Vælg allergener/);
    expect(placeholder).toBeInTheDocument();
  });

test("Choosing an option - the option gets selected", () => {
  renderComponent(<Allergens />);
  let selectText = screen.getByText(/Vælg allergener/);
  expect(selectText).toBeInTheDocument(); //default text of Select is the placeholder
  
  fireEvent.change(screen.getByRole('combobox'), {
    target: {value: "Lactosefree"},
  });
  selectText = screen.getByText(/Laktosefri/);
  expect(selectText).toBeInTheDocument(); //after choosing an option, the Select text is the option
});

test("Choosing both options - the options gets selected", () => {
  renderComponent(<Allergens />);
  const selectElement = screen.getByRole('combobox');
  let selectText = screen.getByText(/Vælg allergener/);
  expect(selectText).toBeInTheDocument(); //default text of Select is the placeholder
  selectEvent.select(selectElement, ['Laktosefri', 'Glutenfri'])
  
  const selectTextGlutenfree = screen.getByText(/Glutenfri/);
  const selectTextLactosefree = screen.getByText(/Laktosefri/);
  //after selecting both options, they get selected instead
  expect(selectTextGlutenfree).toBeInTheDocument(); 
  expect(selectTextLactosefree).toBeInTheDocument();
});

test("Removing an option - the option gets removed", () => {
  renderComponent(<Allergens />);
  
  const placeholder = screen.getByText(/Vælg allergener/);
  const form = screen.getByTestId('AllergensForm');
  const selectElement = screen.getByRole('combobox');
  fireEvent.change(screen.getByRole('combobox'), {
    target: {value: "Lactosefree"},
  });
  const selectTextLactosefree = screen.getByText(/Laktosefri/);
  expect(selectTextLactosefree).toBeInTheDocument();
  userEvent.click(selectElement)
  userEvent.click(selectTextLactosefree)
  expect(selectTextLactosefree).toBeInTheDocument();
  
  
  // expect(form).toHaveFormValues({AllergenOptions: ''}); //no options are selected
  // selectEvent.select(selectElement, ['Lactosefree']); //selecting the option
  // expect(form).toBe(true)//toHaveFormValues({AllergenOptions: 'Laktosefri'}); //no options are selected
  //expect(selectTextLactosefree).toBe(true); //the option is selected
  // expect(selectTextLactosefree.selected).toBe(true); 
  
  // fireEvent.change(screen.getByRole('combobox'), {
  //   target: {value: "Lactosefree"},
  // }); //deselecting the option
  // expect(selectTextLactosefree).toBe(true); //the option is selected
  // expect(selectTextLactosefree.selected).toBe(false); 


//consider using a form outside of the select or maybe get the value of select some other way
//måske getbyrole for hver option
});





//vælg  option - den bliver valgt
//fjern option - den bliver fjernet
  //fjern alle options - alle bliver fjernet
//søg på lak - laktosefri dukker op

//noget firevent og så se om optionen dukker op - og om den handle change blev kaldt (måske også brug useselector og find ud af om den er i listen)



  //see this: https://stackoverflow.com/questions/41991077/testing-react-select-component