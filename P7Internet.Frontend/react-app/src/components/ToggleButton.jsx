import React from 'react'

const ToggleButton = ({toggle, toggleState}) => {
  return (
    <div className='toggleButton'>
        {toggleState === "radius" ? <button className='toggleButtonLeft'>Radius</button>         : <button onClick={toggle} className='toggleButtonLeft'  style={{backgroundColor: '#808080'}}> Radius</button>}
        {toggleState === "store" ?  <button className='toggleButtonRight'>Vælg Butikker</button> : <button onClick={toggle} className='toggleButtonRight' style={{backgroundColor: '#808080'}}> Vælg Butikker</button>}
    </div>
  )
}

export default ToggleButton