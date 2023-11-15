import { nanoid } from "@reduxjs/toolkit";

function convertIngredientsToIngredientObjects(ingredients) {
  var ingredientObjects = [];
  for (const ingredient of ingredients) {
    ingredientObjects.push({ text: ingredient, id: nanoid() });
  }
  return ingredientObjects;
}

export { convertIngredientsToIngredientObjects };
