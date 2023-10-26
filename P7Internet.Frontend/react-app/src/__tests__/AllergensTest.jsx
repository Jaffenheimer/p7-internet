import { cleanup, getAllByRole, screen } from "@testing-library/react";
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

test("Renders the select element with correct placeholder", () => {
    renderComponent(<Allergens />);
    const linkElement = screen.getByRole('combobox');
    const placeholder = screen.getByText(/Vælg allergener/);
    expect(linkElement).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });

  //vil gerne teste at de andre options ikke er valgt - dunnno how though
test("Default options is the placeholder", () => {
    renderComponent(<Allergens />);
    const placeholder = screen.getByText(/Vælg allergener/);
    expect(placeholder).toBeInTheDocument();
  });

//vælg  option - den bliver valgt
//fjern option - den bliver fjernet
  //fjern alle options - alle bliver fjernet
//søg på lak - laktosefri dukker op

//noget firevent og så se om optionen dukker op - og om den handle change blev kaldt (måske også brug useselector og find ud af om den er i listen)



  //see this: https://stackoverflow.com/questions/41991077/testing-react-select-component