import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import ContainerUpper from "../components/ContainerUpper";
import {renderComponent} from "../testSetupHelper/Helper.jsx";

test("Renders the title of the recipe", () => {
  renderComponent(<ContainerUpper />);
  const linkElement = screen.getByText(/Opskriftsgenerator/);
  expect(linkElement).toBeInTheDocument();
});