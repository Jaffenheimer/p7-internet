import { nanoid } from "nanoid";

function ingredientIsOwned(ingredient, ownedIngredients) {
  for (const ownedIngredient of ownedIngredients) {
    if (ownedIngredient.text === ingredient.text) {
      return true;
    }
  }
  return false;
}

function convertIngredientsToIngredientObjects(ingredients) {
  var ingredientObjects = [];
  console.log("ingredients: ", ingredients); 
  for (const ingredient of ingredients) {
    ingredientObjects.push({ text: ingredient, id: nanoid() });
  }
  return ingredientObjects;
}

export { ingredientIsOwned, convertIngredientsToIngredientObjects };
