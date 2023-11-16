import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import StoreSelection from "../components/StoreSelection";
import { allStoreObjects } from "../objects/Stores.js";

afterEach(cleanup)

test("render store selection with correct title and all shops present", () => {
  renderComponent(<StoreSelection values={allStoreObjects} options={[]} />);
  const title = screen.getByText(/Mulige Butikker:/);
  const select = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
  expect(select).toBeInTheDocument();
  expect(screen.getByText(/Bilka/)).toBeInTheDocument();
  expect(screen.getByText(/Rema 1000/)).toBeInTheDocument();
  expect(screen.getByText(/Netto/)).toBeInTheDocument();
  expect(screen.getByText(/Føtex/)).toBeInTheDocument();
  expect(screen.getByText(/Kvickly/)).toBeInTheDocument();
  expect(screen.getByText(/Fakta/)).toBeInTheDocument();
  expect(screen.getByText(/Lidl/)).toBeInTheDocument();
});

test("changing store selection calls onChange function", () => {
  onChange = jest.fn();
  renderComponent(<StoreSelection values={allStoreObjects} options={[]} />);
  const select = screen.getByRole("combobox");
  select.onchange = onChange;
  fireEvent.change(select, { target: { value: "2" } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("remove all but one store from the store selection", () => {
  setStoreValues = jest.fn();
  renderComponent(<StoreSelection values={allStoreObjects} setValues={setStoreValues} setOptions={() => {}} options={[]} />);
  
  let buttons = screen.getAllByRole("button");
  expect(buttons.length).toBe(7);

  for (let i = 0; i < buttons.length - 1; i++){
    expect(buttons[i]).toBeInTheDocument();
    fireEvent.click(buttons[i]);
  }

  buttons = screen.getAllByRole("button");
  expect(setStoreValues).toHaveBeenCalledTimes(6);
  expect(screen.getByText(/Lidl/)).toBeInTheDocument();
});
