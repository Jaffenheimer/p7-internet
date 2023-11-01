import React, { Component } from "react";

export default class RemoveAllButton extends Component {
  render() {
    const isDisabled = this.props.isDisabled;
    const handleClick = this.props.handleClick;

    return (
      <button
        type="button" //ensures that the button does not submit the form 
        id="RemoveAllExcludeIngredientsButton"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Fjern alle
      </button>
    );
  }
}
