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


  //Combines allgeries with dietaryrestrictions
  const restrictions = [...allergens];
  if (dietaryRestrictions !== '') restrictions.push(dietaryRestrictions);

  ownedIngredients.forEach((ingredient) => {
    ingredients.push(ingredient.text);
  });

  excludeList.forEach((ingredient) => {
    excludedIngredients.push(ingredient.text);
  });

  //Creates the body
  const body = {
    userId: userid,
    sessionToken: sessiontoken,
    ingredients: ingredients,
    amount: 3,
    amountOfPeople: numPeople,
    excludedIngredients: excludedIngredients,
    dietaryRestrictions: restrictions,
  };

  // console.log("Body to post");
  // console.log(body);

  return body;
}

export default recipeBodyCreator;
