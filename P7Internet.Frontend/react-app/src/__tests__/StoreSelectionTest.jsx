import { cleanup, fireEvent, getByRole, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import StoreSelection from "../components/StoreSelection";

test("render store selection with correct title and all shops present", () => {
  renderComponent(<StoreSelection />);
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
