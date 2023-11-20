import Recipe from "../objects/Recipe";

function recipeFromResponse(recipeString) {
  const sections = recipeString.split(/Fremgangsmåde:|Sådan gør du:|Instruktioner:/);
  const titleAndIngredients = sections[0].trim();
  const remainingString = sections[1];

  const titleAndIngredientsArray = titleAndIngredients.split("Ingredienser:");
  const title = titleAndIngredientsArray[0].trim();
  const ingredientsString = titleAndIngredientsArray[1].trim();

  const methodsString = remainingString.trim();

  const ingredients = ingredientsString
    .split(" - ")
    .filter((item) => item.trim() !== "");
  const methods = methodsString
    .split(/\d+\./)
    .filter((item) => item.trim() !== "");

  //   console.log("Title:", title);
  //   console.log("Ingredients:", ingredients);
  //   console.log("Methods:", methods);

  return new Recipe(title, ingredients, methods);
}

export default recipeFromResponse;
