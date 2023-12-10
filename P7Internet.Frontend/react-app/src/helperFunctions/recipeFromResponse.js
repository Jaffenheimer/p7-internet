import Recipe from "../objects/Recipe";

function recipeFromResponse(response) {
  const recipe = response.recipe; 

  // Split recipe on title and ingredients
  const title = recipe.split("Titel:")[1].split("Ingredienser:")[0];
  

  //Split recipe on ingredients and methods
  const ingredients = recipe
    .split("Ingredienser:")[1]
    .split("Metode:")[0]
    .split("\n");


  //Sepereates the methods from the rest of the recipe  
  const methods = recipe.split("Metode:").slice(1);

  //Sepereates the ingredients from the rest of the recipe and splits on "-" and adds to array  
  const ingredientList = ingredients[0].split("-").slice(1).map((ingredient) => ingredient.trim());

  //Adds methods to an array using regex 
  const methodArray = methods[0].split(/\d+\./).map(item => item.trim()).filter(Boolean);
  
  //Returns an recipe
  return new Recipe(title, ingredientList, methodArray, response.recipeId, response.ingredients);
}

export default recipeFromResponse;
