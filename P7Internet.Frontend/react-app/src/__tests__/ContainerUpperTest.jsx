import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import ContainerUpper from "../components/ContainerUpper";

test("Renders the title of the recipe", () => {
  render(<Provider store={store}><ContainerUpper /></Provider>);
  const linkElement = screen.getByText(/Opskriftsgenerator/);
  expect(linkElement).toBeInTheDocument();
});