import React from 'react'

const GenerateButton = () => {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      GENERATE
    </button>
  );
}

export default GenerateButton