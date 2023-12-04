import React, { Component } from "react";

export class AddIngredientInput extends Component {
  render() {
    const ingredient = this.props.ingredient;
    const handleChange = this.props.handleChange;

    return (
      <input
        type="text"
        name="ingredient"
        value={ingredient}
        onChange={handleChange}
        placeholder="Tilføj en ingrediens..."
        data-testid="AddIngredientInput"
      />
    );
  }
}

export default AddIngredientInput;
