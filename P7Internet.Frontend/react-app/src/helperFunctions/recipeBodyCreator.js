import { getCookieSessionToken, getCookieUserId } from "./cookieHandler";

//Boolean to check if dietaryRestrictions is set
let isDietaryRestrictionsSet = false;

//Function to create the body for the post for recipes
function recipeBodyCreator(loggedIn, recipeGenerationSlice) {
  const {
    ownedIngredients,
    dietaryRestrictions,
    allergens,
    excludeList,
    numPeople,
  } = recipeGenerationSlice;
  var userid = "",
    sessiontoken = "",
    ingredients = [],
    excludedIngredients = [],
    restrictions = [];

  //Checks if there is any dietaryRestrictions if there is and it is added
  if (dietaryRestrictions === "") {
    restrictions = [];
  } else {
    restrictions = [dietaryRestrictions.label];
  }

  //Adds all allergies to restrictions array
  if (allergens !== "") {
    allergens.forEach((allergy) => {
      restrictions.push(allergy.label);
    });
  }

  //Checks if there is any restrictions and sets the boolean
  if(restrictions.length > 0){
    isDietaryRestrictionsSet = true;
  } else {
    isDietaryRestrictionsSet = false;
  }


  //Add ownedIngredients to ingredients array
  ownedIngredients.forEach((ingredient) => {
    ingredients.push(ingredient.text);
  });

  //Add excludeList to excludedIngredients array
  excludeList.forEach((ingredient) => {
    excludedIngredients.push(ingredient.text);
  });

  //Creates the body
  const body = {
    ingredients: ingredients,
    amount: 3,
    isDietaryRestrictionsSet: isDietaryRestrictionsSet,
    amountOfPeople: numPeople,
    excludedIngredients: excludedIngredients,
    dietaryRestrictions: restrictions,
  };

  //Retrieve userid and sessiontoken if login
  if (loggedIn === true) {
    userid = getCookieUserId();
    sessiontoken = getCookieSessionToken();

    const userData = {
      userId: userid,
      sessionToken: sessiontoken,
    };

    //Add user data to body if logged in
    const combinedBody = {
      ...userData,
      ...body,
    };

    //returns combind if the user is login
    return combinedBody;
  }

  //returns body if the user is not logged in
  return body;
}

export default recipeBodyCreator;
