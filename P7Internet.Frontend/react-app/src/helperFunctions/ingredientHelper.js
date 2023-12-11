import { nanoid } from "nanoid";

function ingredientIsOwned(ingredient, ownedIngredients) {
  for (const ownedIngredient of ownedIngredients) {
    if (
      ingredient.text.toLowerCase().includes(ownedIngredient.text.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
}

function convertIngredientsToIngredientObjects(ingredients) {
  var ingredientObjects = [];
  console.log("ingredients: ", ingredients);
  for (const ingredient of ingredients) {
    ingredientObjects.push({ text: ingredient, id: nanoid(), stores: [] });
  }
  console.log(ingredientObjects);
  return ingredientObjects;
}

export { ingredientIsOwned, convertIngredientsToIngredientObjects };

/**
 * 
 * FetchOffer(ingredient).then((res) => {
      ingredientObjects.push(
        new Offer(
          res.name,
          res.id,
          res.price,
          res.size,
          null,
          res.store,
          res.storeImage,
          res.created,
          res.ending
        )
      );
    });
 */
