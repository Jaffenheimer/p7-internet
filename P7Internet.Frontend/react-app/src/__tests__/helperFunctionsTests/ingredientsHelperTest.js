import { convertIngredientsToIngredientObjects } from "../../helperFunctions/ingredientsHelper";
import "@testing-library/jest-dom";

test("ingredients can be converted to ingredient objects", () => {
  const ingredients = ["ingredient1", "ingredient2", "ingredient3"];
  const ingredientObjects = convertIngredientsToIngredientObjects(ingredients);
  expect(ingredientObjects.length).toBe(3);
  expect(ingredientObjects[0]).toStrictEqual({
    text: "ingredient1",
    id: expect.anything(),
  });
  expect(ingredientObjects[1]).toStrictEqual({
    text: "ingredient2",
    id: expect.anything(),
  });
  expect(ingredientObjects[2]).toStrictEqual({
    text: "ingredient3",
    id: expect.anything(),
  });
});
