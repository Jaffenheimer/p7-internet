import React from "react";

const IngredientsList = ({ ingredients, ListElement, handleRemove }) => {
    return (
        <div className="ingredientsList">
            <h2>Ingredienser:</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <ListElement
                        key={index}
                        ingredient={ingredient}
                        handleRemove={handleRemove}
                    />
                ))}
            </ul>
        </div>
    );
};

export default IngredientsList;
