import Recipe from "../objects/Recipe";

function recipeFromResponse(response) {
  const recipe = response.recipe; 

  //Splitting the string into sections using regular expressions
  const title = recipe.split("Titel:")[1].split("Ingredienser:")[0];
  const ingredients = recipe
    .split("Ingredienser:")[1]
    .split("Metode:")[0]
    .split("\n");

  const methods = recipe.split("Metode:").slice(1);
  //const ingredientList = ingredients[0].split("-").map((ingredient) => ingredient.trim());
  const ingredientList = ingredients[0].split("-").slice(1).map((ingredient) => ingredient.trim());
  const methodArray = methods[0].split(/\d+\./).map(item => item.trim()).filter(Boolean);
  const filteredingredientList = ingredientList.slice(0);

  //Returns an recipe
  return new Recipe(response.recipeId, title, filteredingredientList, methodArray, response.ingredients);
}

export default recipeFromResponse;
