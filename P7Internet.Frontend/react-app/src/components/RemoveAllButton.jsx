import React, { Component } from "react";

export default class RemoveAllButton extends Component {
  render() {
    const isDisabled = this.props.isDisabled;
    const handleClick = this.props.handleClick;

    return (
      <button
        id="RemoveAllExcludeIngredientsButton"
        disabled={isDisabled}
        onClick={handleClick}
      >
        Fjern alle
      </button>
    );
  }
}
