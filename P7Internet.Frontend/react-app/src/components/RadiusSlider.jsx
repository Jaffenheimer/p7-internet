import React from 'react'
import {useState} from 'react'

const RadiusSlider = () => {
  const [sliderValue, setSliderValue] = useState(1);

  function sliderChange(event) {
    event.preventDefault()
    setSliderValue(event.target.value)
  }

  function logSlider(position) {
    var minp = 1;
    var maxp = 100;
  
    // The result should be between 100m and 700km
    var minv = Math.log(100);
    var maxv = Math.log(700000);
  
    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(position-minp));
  }

  function round(value, step) {
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }

  function filterSliderValue(value){
    if (value >= 300000)
        return `${round(value/1000, 100)} km`
    else if (value >= 200000)
        return `${round(value/1000, 50)} km`
    else if (value >= 100000)
        return `${round(value/1000, 25)} km`
    else if (value >= 10000)
        return `${round(value/1000, 5)} km`
    else if (value >= 1000)
        return `${round(value/1000, 0.50)} km`
    else if (value > 1)
        return `${round(value, 100)} m`
  }

  return (
    <div class="slidecontainer">
        <p>Radius: {filterSliderValue(logSlider(sliderValue))}</p>
        <input type="range" min="1" max="100" value={sliderValue} onChange={sliderChange}/>
    </div>
  )
}

export default RadiusSlider