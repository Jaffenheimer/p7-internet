import Recipe from "../objects/Recipe";

function recipeFromResponse(response) {
  console.log("recipeFromResponse", response);
  const recipe = response.recipe;

  // Split recipe on title and ingredients
  const title = recipe.split("Titel:")[1].split("Ingredienser:")[0];

  //Split recipe on ingredients and methods
  const ingredients = recipe
    .split("Ingredienser:")[1]
    .split("Metode:")[0]
    .split("\n");

  //Separates the methods from the rest of the recipe
  const methods = recipe.split("Metode:").slice(1);

  //Separates the ingredients from the rest of the recipe and splits on "-" and adds to array
  const ingredientList = ingredients[0]
    .split("-")
    .slice(1)
    .map((ingredient) => ingredient.trim());

  //Separates the methods from the rest of the recipe and splits on numbers and adds to array
  const methodArray = methods[0]
    .split(/\d+\./)
    .map((item) => item.trim())
    .filter(Boolean);

  //Returns a recipe
  return new Recipe(
    title,
    ingredientList,
    methodArray,
    response.recipeId,
    response.ingredients
  );
}

export default recipeFromResponse;
