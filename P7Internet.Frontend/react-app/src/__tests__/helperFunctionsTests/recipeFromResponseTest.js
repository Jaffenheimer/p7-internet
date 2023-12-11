import recipeFromResponse from "../../helperFunctions/recipeFromResponse";

const response = {
  recipe:
    "Titel: Saftige Oksekødsboller  Ingredienser: - 500 g oksekød  Metode: 1. Steg oksekød.",
  recipeId: "32b1edcc-28d4-4f74-bd7c-923a2669cb25",
  ingredients: ["Oksekød"],
  success: true,
  errorMessage: null,
};

const expectedObject = {
  id: "32b1edcc-28d4-4f74-bd7c-923a2669cb25",
  title: " Saftige Oksekødsboller  ",
  ingredients: ["500 g oksekød"],
  method: ["Steg oksekød."],
  shortIngredients: ["Oksekød"],
};

test("Tests if an recipe creates the expected recipe object", () => {
  const recipe = recipeFromResponse(response);
  expect(recipe).toEqual(expectedObject);
});
