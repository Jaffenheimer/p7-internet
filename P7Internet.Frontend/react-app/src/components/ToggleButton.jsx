import React from 'react'

const ToggleButton = ({toggle, toggleState}) => {
  return (
    <div className='toggleButton'>
  
        {toggleState === "radius" ? <button style={{borderRadius: '5px 0px 0px 5px'}}>Radius</button> : <button onClick={toggle} style={{borderRadius: '5px 0px 0px 5px', backgroundColor: '#808080'}}>Radius</button>}
        {toggleState === "store" ? <button  style={{borderRadius: '0px 5px 5px 0px'}}>Vælg Butikker</button> : <button onClick={toggle} style={{borderRadius: '0px 5px 5px 0px', backgroundColor: '#808080'}}>Vælg Butikker</button>}
    </div>
  )
}

export default ToggleButton