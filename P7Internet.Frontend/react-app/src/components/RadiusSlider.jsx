import React from "react";

const RadiusSlider = ({ sliderValue, shownRadius, onChange }) => {
  return (
    <div className="SliderContainer">
      <br />
      <h3>Radius:</h3>
      <p>{shownRadius}</p>
      <input
        type="range"
        min="1"
        max="100"
        defaultValue={sliderValue}
        onChange={onChange}
        data-testid="radiusSlider"
      />
    </div>
  );
};

export default RadiusSlider;
