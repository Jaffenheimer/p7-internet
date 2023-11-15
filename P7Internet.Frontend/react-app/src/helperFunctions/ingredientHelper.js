function ingredientIsOwned(ingredient, ownedIngredients) {
  for (const ownedIngredient of ownedIngredients) {
    if (ownedIngredient.text === ingredient) {
      return true;
    }
  }
  return false;
}
export { ingredientIsOwned };
