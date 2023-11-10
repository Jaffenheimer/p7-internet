import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {
  renderComponent,
  renderComponentWithChangeToStore,
} from "../testSetupHelper/Helper.jsx";
import RecipeSelectionContainerRight from "../components/RecipeSelectionContainerRight.jsx";

test("elements in RecipeSelectionContainerRight renders properly when geolocation is disabled", () => {
  renderComponent(<RecipeSelectionContainerRight />);
  //toggle button
  global.localStorage.setItem("geolocation", "test");
  const radius = screen.getByText(/Radius/);
  const stores = screen.getByText(/Vælg Butikker/);
  expect(radius).toBeInTheDocument();
  expect(stores).toBeInTheDocument();

  //store selection
  const title = screen.getByText(/Mulige Butikker:/);
  const select = screen.getByRole("combobox");
  expect(title).toBeInTheDocument();
  expect(select).toBeInTheDocument();

  global.localStorage.removeItem("geolocation");
});

test("elements in RecipeSelectionContainerRight renders properly when geolocation is enabled", () => {
  //forces the toggle state to be radius, which would be the case if geolocation is enabled (geolocation cannot be enabled before rendering the component)
  renderComponentWithChangeToStore(
    <RecipeSelectionContainerRight />,
    "offers/setToggleState",
    true
  );
  //toggle button
  const radiusToggleButton = screen.getAllByText(/Radius/)[0]; //there are 2 elements, both the toggle and the one for the radius slider
  const stores = screen.getByText(/Vælg Butikker/);
  expect(radiusToggleButton).toBeInTheDocument();
  expect(stores).toBeInTheDocument();

  //radius slider
  const slider = screen.getByTestId("radiusSlider");
  expect(slider).toBeInTheDocument();
});

test("radius slider is rendered when geolocation gets enabled, and radius is selected", () => {
  renderComponent(<RecipeSelectionContainerRight />);
  global.localStorage.setItem("geolocation", "test");
  //toggle button
  const radius = screen.getByText(/Radius/);
  const stores = screen.getByText(/Vælg Butikker/);
  expect(radius).toBeInTheDocument();
  expect(stores).toBeInTheDocument();

  fireEvent.click(radius);
  //radius slider
  const slider = screen.getByTestId("radiusSlider");
  expect(slider).toBeInTheDocument();

  global.localStorage.removeItem("geolocation");
});

describe("slider value changes properly in radius slider component", () => {
  test.each([
    [1, "100 m"],
    [25, "900 m"],
    [79, "100 km"],
    [100, "700 km"],
    [50, "8 km"],
  ])(
    "when slider value is updated to %i, the actual value is %s",
    (sliderUpdateValue, sliderUpdateActualValue) => {
      const sliderValue = 1;
      const sliderActualValue = 100;
      //forces the toggle state to be radius, which would be the case if geolocation is enabled (geolocation cannot be enabled before rendering the component)
      renderComponentWithChangeToStore(
        <RecipeSelectionContainerRight />,
        "offers/setToggleState",
        true
      );
      const slider = screen.getByTestId("radiusSlider");
      expect(slider).toHaveValue(sliderValue.toString());
      expect(screen.getByText(/Radius:/)).toBeInTheDocument(); //h3 element
      expect(screen.getByText(`${sliderActualValue} m`)).toBeInTheDocument(); //p element

      fireEvent.change(slider, { target: { value: sliderUpdateValue } });
      expect(slider).toHaveValue(sliderUpdateValue.toString());
      expect(screen.getByText(/Radius:/)).toBeInTheDocument(); //h3 element
      expect(screen.getByText(sliderUpdateActualValue)).toBeInTheDocument(); //p element
    }
  );
});
