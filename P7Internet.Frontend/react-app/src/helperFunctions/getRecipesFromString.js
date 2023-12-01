import Recipe from "../objects/Recipe";
var recipe;

function getRecipesFromString(string) {
  //var recipes = [];
  var title = "";
  var ingredients = [];
  var method = [];
  for (const line of string.split("\n")) {
    if (title === "") {
      title = line;
      title = trimNumberedPoints(line);
      if (title.endsWith(":")) title = title.slice(0, -1);
    } else if (line.startsWith("-")) {
      //ingredients
      ingredients.push(line.substring(line.indexOf(" ") + 1));
    } else if (startsWithNumber(line) && title !== "") {
      //instructions
      method.push(trimNumberedPoints(line));
    } else if (line === "" && method.length !== 0) {
      //end of recipe
      recipe = new Recipe(title, ingredients, method);
      console.log("recipefromString: ", recipe);
      //recipes.push(recipe);
      title = "";
      ingredients = [];
      method = [];
    }
  }
  return recipe;
}

function startsWithNumber(string) {
  return /^\d/.test(string);
}

function trimNumberedPoints(string) {
  //removing the "1. "-part
  return string.substring(string.indexOf(" ") + 1);
}

export default getRecipesFromString;
