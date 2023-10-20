import React from 'react'

//options is the english names for the code, optionsView is the translated names to be displayed on the page
//handleChecked is the function to be run when a checkbox is changed
const CheckBox = ({option, optionView, handleChecked}) => {
  return (
        <div className='CheckBox'>
          <input
            type="checkbox"
            name={option}
            id={option}
            onChange={handleChecked}
          />
          <label htmlFor={option}>{optionView}</label>
        </div>
  )
}

export default CheckBox