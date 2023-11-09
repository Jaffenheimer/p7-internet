import { cleanup, fireEvent, getByRole, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderComponent } from "../testSetupHelper/Helper.jsx";
import RadiusSlider from "../components/RadiusSlider";

afterEach(cleanup);

test("render radius slider with correct title and value", () => {
  const sliderValue = 1;
  const sliderActualValue = 100;
  renderComponent(<RadiusSlider />);
  const slider = screen.getByTestId("radiusSlider");
  expect(slider).toBeInTheDocument();
  expect(slider).toHaveValue(sliderValue.toString());
  expect(screen.getByText(/Radius:/)).toBeInTheDocument(); //h3 element
  expect(screen.getByText(`${sliderActualValue} m`)).toBeInTheDocument(); //p element
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
      renderComponent(<RadiusSlider />);
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