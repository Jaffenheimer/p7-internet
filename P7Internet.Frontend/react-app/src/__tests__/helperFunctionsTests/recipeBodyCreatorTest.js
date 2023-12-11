import { addCookies } from "../../helperFunctions/cookieHandler";
import recipeBodyCreator from "../../helperFunctions/recipeBodyCreator";

const recipeGenSlice = {
  ownedIngredients: [
    {
      id: "3GjE9MqwpMfLkApidr1YN",
      text: "oksekød",
    },
  ],
  dietaryRestrictions: "",
  allergens: [],
  excludeList: [],
  numPeople: 4,
};

const expectedNotLogInBody = {
  ingredients: ["oksekød"],
  amount: 3,
  amountOfPeople: 4,
  excludedIngredients: [],
  dietaryRestrictions: [],
};

const expectedLoggedInBody = {
  sessionToken: "2",
  userId: "1",
  ingredients: ["oksekød"],
  amount: 3,
  amountOfPeople: 4,
  excludedIngredients: [],
  dietaryRestrictions: [],
};

test("Check if recipeBody creator creates the expected body, if the user is login", () => {
  addCookies("username", "1", "2");
  const body = recipeBodyCreator(true, recipeGenSlice);
  expect(body).toEqual(expectedLoggedInBody);
});

test("Check if recipeBody creator creates the expected body, if the user is not logged in", () => {
  const body = recipeBodyCreator(false, recipeGenSlice);
  expect(body).toEqual(expectedNotLogInBody);
});
