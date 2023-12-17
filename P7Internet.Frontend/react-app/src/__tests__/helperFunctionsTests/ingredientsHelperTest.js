import { convertIngredientsToIngredientObjects } from "../../helperFunctions/ingredientHelper";
import { ingredientIsOwned } from "../../helperFunctions/ingredientHelper";

import "@testing-library/jest-dom";

//testing of convertIngredientsToIngredientObjects function:
test("ingredients can be converted to ingredient objects", () => {
  const ingredients = ["ingredient1", "ingredient2", "ingredient3"];
  const ingredientObjects = convertIngredientsToIngredientObjects(ingredients);
  expect(ingredientObjects.length).toBe(3);
  expect(ingredientObjects[0]).toStrictEqual({
    text: "ingredient1",
    id: expect.anything(),
    stores: expect.anything(),
  });
  expect(ingredientObjects[1]).toStrictEqual({
    text: "ingredient2",
    id: expect.anything(),
    stores: expect.anything(),
  });
  expect(ingredientObjects[2]).toStrictEqual({
    text: "ingredient3",
    id: expect.anything(),
    stores: expect.anything(),
  });
});

// testing of ingredientIsOwned function:
test("ingredientIsOwned returns true if ingredient is owned", () => {
  const ingredient = { text: "ingredient1", id: "1" };
  const ownedIngredients = [
    { text: "ingredient1", id: "1" },
    { text: "ingredient2", id: "2" },
    { text: "ingredient3", id: "3" },
  ];
  expect(ingredientIsOwned(ingredient, ownedIngredients)).toBe(true);
});

test("ingredientIsOwned returns false if ingredient is not owned", () => {
  const ingredient = { text: "ingredient4", id: "4" };
  const ownedIngredients = [
    { text: "ingredient1", id: "1" },
    { text: "ingredient2", id: "2" },
    { text: "ingredient3", id: "3" },
  ];
  expect(ingredientIsOwned(ingredient, ownedIngredients)).toBe(false);
});
