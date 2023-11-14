import { retriveCookie } from "./cookieHandler";

//Function to create the body for the post for recipes
function recipeBodyCreator(loggedIn, recipeGenerationSlice) {
  const {
    ownedIngredients,
    dietaryRestrictions,
    allergens,
    excludeList,
    numPeople,
  } = recipeGenerationSlice;
  let userid = "",
    sessiontoken = "",
    ingredients = [],
    excludedIngredients = [];

  //Retrive userid and sessiontoken if login
  if (loggedIn === true) {
    userid = retriveCookie("userid=");
    sessiontoken = retriveCookie("sessionToken=");
  }

  const restrictions = [...allergens];
  if (dietaryRestrictions.lenght > 0) restrictions.push(dietaryRestrictions);

  console.log("Ingredients");
  ownedIngredients.forEach((ingredient) => {
    ingredients.push(ingredient.text);
  });

  console.log("Exclude ingreidents  ");
  excludeList.forEach((ingredient) => {
    excludedIngredients.push(ingredient.text);
  });

  const body = {
    userId: userid,
    sessionToken: sessiontoken,
    ingredients: ingredients,
    amount: 3,
    amountOfPeople: numPeople,
    excludedIngredients: excludedIngredients,
    dietaryRestrictions: restrictions,
  };

  console.log("Body to post");
  console.log(body);

  return body;
}

export default recipeBodyCreator;
