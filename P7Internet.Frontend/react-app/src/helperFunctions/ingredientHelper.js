import { nanoid } from "nanoid";
import Offer from "../objects/Offer";

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
  for (const ingredient of ingredients) {
    ingredientObjects.push(
      new Offer(ingredient, nanoid(), 2, "test", "test", "test", "test", "test")
    );

    //ingredientObjects.push({ text: ingredient, id: nanoid(), stores: [] });
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
