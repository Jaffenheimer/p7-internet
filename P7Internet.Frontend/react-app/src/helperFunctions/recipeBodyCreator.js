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
  var userid = "",
    sessiontoken = "",
    ingredients = [],
    excludedIngredients = [];

  //Combines allgeries with dietaryrestrictions
  var restrictions = ((dietaryRestrictions.value === '') ? [] : [dietaryRestrictions.label]);
  
  //Adds all allergies to restrictions array
  if (allergens !== '' && dietaryRestrictions.value !== '') {
    allergens.forEach((allergy) => {
      restrictions.push(allergy.label);
    });
  }else if (allergens === '' && dietaryRestrictions.value === ''){
    restrictions = [];
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
    amountOfPeople: numPeople,
    excludedIngredients: excludedIngredients,
    dietaryRestrictions: restrictions,
  };

  //Retrive userid and sessiontoken if login
  if (loggedIn === true) {
    userid = retriveCookie("userid=");
    sessiontoken = retriveCookie("sessionToken=");

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
