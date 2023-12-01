import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import ToggleButton from "../components/ToggleButton.jsx";

test("render toggle button with correct text, when radius is toggled, stores gets untoggled styling", () => {
  renderComponent(<ToggleButton toggleStateIsRadius={true} />);
  const radius = screen.getByText(/Radius/);
  const stores = screen.getByText(/Vælg Butikker/);
  expect(radius).toBeInTheDocument();
  expect(stores).toBeInTheDocument();

  //since stores is not toggled, it has this styling applied (the styling for what is toggled is in the css and not in the component)
  expect(stores).toHaveStyle("backgroundColor: #113946");
  expect(stores).toHaveStyle("color: white");
});

test("render toggle button with correct text, when stores is toggled, radius gets untoggled styling", () => {
  renderComponent(<ToggleButton toggleStateIsRadius={false} />);
  const radius = screen.getByText(/Radius/);
  const stores = screen.getByText(/Vælg Butikker/);
  expect(radius).toBeInTheDocument();
  expect(stores).toBeInTheDocument();

  //since radius is not toggled, it has this styling applied (the styling for what is toggled is in the css and not in the component)
  expect(radius).toHaveStyle("backgroundColor: #113946");
  expect(radius).toHaveStyle("color: white");
});

test("when toggle button is clicked, toggle function is called", () => {
  const toggle = jest.fn();
  renderComponent(<ToggleButton toggle={toggle} />);
  const radius = screen.getByText(/Radius/);
  fireEvent.click(radius);
  expect(toggle).toHaveBeenCalledTimes(1);
});
