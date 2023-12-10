import { getCookieSessionToken, getCookieUserId } from "./cookieHandler";

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

  //Combines allgeries with dietaryrestrictions
  const restrictions = [...allergens];
  if (dietaryRestrictions !== "") restrictions.push(dietaryRestrictions);

  ownedIngredients.forEach((ingredient) => {
    ingredients.push(ingredient.text);
  });

  excludeList.forEach((ingredient) => {
    excludedIngredients.push(ingredient.text);
  });

  //Creates the body
  const body = {
    ingredients: ingredients,
    amount: 3,
    amountOfPeople: numPeople,
    excludedIngredients: excludedIngredients,
    dietaryRestrictions: restrictions,
  };

  //Retrive userid and sessiontoken if login
  if (loggedIn === true) {
    userid = getCookieUserId();
    sessiontoken = getCookieSessionToken();

    const userData = {
      userId: userid,
      sessionToken: sessiontoken,
    };

    const combinedBody = {
      ...userData,
      ...body,
    };

    return combinedBody;
  }

  return body;
}

export default recipeBodyCreator;
