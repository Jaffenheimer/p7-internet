import React from 'react'
import leftArrow from '../data/leftArrow.svg'
import rightArrow from '../data/rightArrow.svg'

const SelectArrows = () => {
  function clickLeft(){
    alert("left!")
  }
  function clickRight(){
    alert("right!")
  }
  return (
    <div className='SelectArrows'>
        <img src={leftArrow} alt='Left Arrow' onClick={clickLeft}/>
        <img src={rightArrow} alt='right Arrow' onClick={clickRight}/>
    </div>
  )
}

export default SelectArrows