import Recipe from "../objects/Recipe";

function recipeFromResponse(recipeString) {
  //Splitting the string into sections using regular expressions
  const title = recipeString.split("Titel:")[1].split("Ingredienser:")[0];
  const ingredients = recipeString
    .split("Ingredienser:")[1]
    .split("Metode:")[0]
    .split("\n");
  //const methods = recipeString.split("Metode:")[1].split("Velbekomme!");
  const methods = recipeString.split("Metode:").slice(1);

  const ingredientList = ingredients[0]
    .split("-")
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient !== "");

  const methodArray = methods[0]
    .split(/\d+\./)
    .map((item) => item.trim())
    .filter(Boolean);

  const filteredingredientList = ingredientList.slice(0);

  // console.log(title); // "Vindruesalat med quinoa og avocado"
  // console.log(ingredientList); // ["1 kop kogt quinoa", "1 håndfuld vindruer (røde eller grønne), halveret", "1/2 avocado, skåret i tern", "1/4 rødløg, fint hakket", "1 spiseskefuld frisk persille, hakket", "Saften fra 1/2 citron", "1 spiseskefuld olivenolie", "Salt og peber efter smag"]
  // console.log(methodArray); // ["1. I en stor skål kombineres quinoa, vindruer, avocado, rødløg og persille.", "2. I en separat skål, piskes citronsaft, olivenolie, salt og peber sammen for at lave dressingen.", "3. Dressingen hældes over salaten og blandes godt sammen, så alle ingredienserne er dækket.", "4. Smag til med ekstra salt og peber, hvis det er nødvendigt.", "5. Server salaten straks som en let frokost eller som en side til aftensmaden."]
  return new Recipe(title, filteredingredientList, methodArray);
}

export default recipeFromResponse;
