import React from "react";
import { useState } from "react";

const RadiusSlider = () => {
  const [sliderValue, setSliderValue] = useState(1);

  function sliderChange(event) {
    event.preventDefault();
    setSliderValue(event.target.value);
  }

  // Calculates the position from 1 to 100 by logarithmically taking the min and max distance range
  // and scaling the value relative to the sliders min and max value.
  function getPositionByLogarithmScaling(position) {
    var minPosition = 1;
    var maxPosition = 100;

    // The result should be between 100m and 700km
    var minValue = Math.log(100);
    var maxValue = Math.log(700000);

    // calculate adjustment factor
    var scale = (maxValue - minValue) / (maxPosition - minPosition);
    return Math.exp(minValue + scale * (position - minPosition));
  }

  // used in filterSliderValue to round the number to the closest step,
  // e.g. step=50 means round() rounds to the nearest 50.
  function round(value, step) {
    var inverse = 1.0 / step;
    return Math.round(value * inverse) / inverse;
  }

  function filterSliderValue(value) {
    if (value >= 300000) return `${round(value / 1000, 100)} km`;
    else if (value >= 200000) return `${round(value / 1000, 50)} km`;
    else if (value >= 100000) return `${round(value / 1000, 25)} km`;
    else if (value >= 10000) return `${round(value / 1000, 5)} km`;
    else if (value >= 1000) return `${round(value / 1000, 0.5)} km`;
    else if (value > 1) return `${round(value, 100)} m`;
  }

  return (
    <div className="SliderContainer">
      <br />
      <h3>Radius:</h3>{" "}
      <p>{filterSliderValue(getPositionByLogarithmScaling(sliderValue))}</p>
      <input
        type="range"
        min="1"
        max="100"
        value={sliderValue}
        onChange={sliderChange}
        data-testid="radiusSlider"
      />
    </div>
  );
};

export default RadiusSlider;
