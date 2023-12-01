import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  currentRecipeIndex: 0,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipes(state, action) {
      console.log(action); 
      const recipe = {
        recipeId: action.payload.recipeId,
        recipe: action.payload.recipe,
        shortIngredients: action.payload.ingredients,
      };
      state.recipes.push(recipe);
    },
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
    setDefaultRecipes(state, action) {
      //this function will not be necessary later, but is useful since we dont have communication with the backend yet
      state.recipes = [action.payload[0]];
      for (let i = 1; i < action.payload.length; i++) {
        state.recipes.push(action.payload[i]);
      }
    },
    removeRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    setCurrentRecipeIndex(state, action) {
      state.currentRecipeIndex = action.payload;
    },
  },
});

export const { actions: recipeActions, reducer: recipeReducer } = recipeSlice;
