import { getRadiusValueBasedOnSliderValue } from "../../helperFunctions/radiusCalculation";

describe("getRadiusValueBasedOnSliderValue returns proper value based on input", () => {
  test.each([
    [1, "100 m"],
    [25, "900 m"],
    [79, "100 km"],
    [100, "700 km"],
    [50, "8 km"],
  ])(
    "when input is %i, it returns %s",
    (sliderUpdateValue, sliderUpdateActualValue) => {
      expect(getRadiusValueBasedOnSliderValue(sliderUpdateValue)).toBe(
        sliderUpdateActualValue
      );
    }
  );
});
