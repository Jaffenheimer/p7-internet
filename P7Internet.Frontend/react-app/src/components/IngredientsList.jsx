import React from 'react'

const IngredientsList = ({ingredients}) => {

  return (
    <div className="ingredients">
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>
              {ingredient}
              
            </li>
          ))}
        </ul>
      </div>
  )
}

export default IngredientsList