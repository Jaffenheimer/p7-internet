import React, { Component } from 'react'

export class AddIngredientInput extends Component {
  render() {

    const ingredient = this.props.ingredient
    const handleChange = this.props.handleChange
    const placeholder = this.props.placeholder

    return (
        <input
        type="text"
        name="ingredient"
        value={ingredient}
        onChange={handleChange}
        placeholder={placeholder}
      />
    )
  }
}

export default AddIngredientInput