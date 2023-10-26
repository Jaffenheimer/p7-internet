import React, { Component } from "react";

export class AddButton extends Component {
  //ensures that it is rendered when its disabled state is changed
  render() {
    return <button disabled={this.props.isDisabled}>Tilføj</button>;
  }
}

export default AddButton;
