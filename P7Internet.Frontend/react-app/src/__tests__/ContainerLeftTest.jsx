import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import ContainerLeft from "../components/ContainerLeft";
import {renderComponent} from "../testSetupHelper/Helper.jsx";

test("Renders the title of the recipe", () => {
  renderComponent(<ContainerLeft />);
  const linkElement = screen.getByText(/Opskriftsgenerator/);
  expect(linkElement).toBeInTheDocument();
});