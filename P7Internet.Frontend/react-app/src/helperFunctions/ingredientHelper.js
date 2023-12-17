import { nanoid } from "nanoid";

function ingredientIsOwned(ingredient, ownedIngredients) {

  
  for (const ownedIngredient of ownedIngredients) {
    if (
      ownedIngredient.text.toLowerCase() === ingredient.text.toLowerCase()
    ) {
      return true;
    } else if(ingredient.text.toLowerCase().includes(ownedIngredient.text.toLowerCase())){
      return true;
    }else if(ownedIngredient.text.toLowerCase().includes(ingredient.text.toLowerCase())){
      return true;
    }

  }
  return false;
}

function convertIngredientsToIngredientObjects(ingredients) {
  var ingredientObjects = [];
  for (const ingredient of ingredients) {
    ingredientObjects.push({ text: ingredient, id: nanoid(), stores: [] });
  }
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
