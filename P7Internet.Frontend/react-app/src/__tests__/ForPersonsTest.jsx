import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  renderComponent,
  renderComponentWithSpecificStore,
  renderMultipleComponents,
} from "../testSetupHelper/Helper.jsx";
import ForPersons from "../components/ForPersons.jsx";
import NumberOfPersonsField from "../components/NumberOfPersonsField.jsx";
import configureMockStore from "redux-mock-store";

afterEach(cleanup);

test("ForPersons renders properly with a default value of 4 persons", () => {
  renderComponent(<ForPersons />);
  expect(screen.getByText(/4 personer/)).toBeInTheDocument();
});

//renders store where numPeople is set to a specific value (2 here)
test("ForPersons renders properly with specific value of number of persons", () => {
  const mockState = {
    recipeGeneration: {
      numPeople: 2,
    },
  };
  // configureMockStore() returns a function that can be called with the initial state
  const mockStore = configureMockStore()(mockState);

  renderComponentWithSpecificStore(<ForPersons />, mockStore);
  expect(screen.getByText(/2 personer/)).toBeInTheDocument();
});

//integration test between NumberOfPersonsField and ForPersons
test("ForPersons renders properly when the number of persons is changed", () => {
  renderMultipleComponents([<NumberOfPersonsField />, <ForPersons />]);
  expect(screen.getByText(/4 personer/)).toBeInTheDocument();
  const plus = screen.getByText(/\+/);

  //making changes to numberOfPersonsField
  fireEvent.click(plus);
  fireEvent.click(plus);

  //checking if the changes are reflected in ForPersons
  expect(screen.getByText(/6 personer/)).toBeInTheDocument();
});
