import React, { Component } from "react";

export default class RemoveAllButton extends Component {
  render() {
    const handleClick = this.props.handleClick;

    return (
      <button
        type="button" //ensures that the button does not submit the form
        className="RemoveAllExcludeIngredientsButton"
        onClick={handleClick}
      >
        Fjern alle
      </button>
    );
  }
}
