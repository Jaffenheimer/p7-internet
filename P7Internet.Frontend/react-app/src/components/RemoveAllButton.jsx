import React, { Component } from "react";

export default class RemoveAllButton extends Component {
  render() {
    const handleClick = this.props.handleClick;

    return (
      <button
        data-testid="RemoveAllButton"
        type="button" //ensures that the button does not submit the form
        className="RemoveAllButton"
        onClick={handleClick}
      >
        Fjern alle
      </button>
    );
  }
}
