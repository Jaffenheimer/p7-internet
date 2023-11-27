import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import RadiusSlider from "../components/RadiusSlider";
import { getRadiusValueBasedOnSliderValue } from "../helperFunctions/radiusCalculation.js";

afterEach(cleanup);

test("render radius slider with correct title and value", () => {
  const sliderValue = 1;
  const sliderActualValue = 100;
  renderComponent(
    <RadiusSlider
      sliderValue={sliderValue}
      shownRadius={getRadiusValueBasedOnSliderValue(sliderValue)}
    />
  );
  const slider = screen.getByTestId("radiusSlider");
  expect(slider).toBeInTheDocument();
  expect(slider).toHaveValue(sliderValue.toString());
  expect(screen.getByText(/Radius:/)).toBeInTheDocument(); //h3 element
  expect(screen.getByText(`${sliderActualValue} m`)).toBeInTheDocument(); //p element
});

test("changing radius slider calls onChange function", () => {
  onChange = jest.fn();
  renderComponent(<RadiusSlider />);
  const slider = screen.getByTestId("radiusSlider");
  slider.onchange = onChange;
  fireEvent.change(slider, { target: { value: "2" } });
  expect(onChange).toHaveBeenCalledTimes(1);
});
