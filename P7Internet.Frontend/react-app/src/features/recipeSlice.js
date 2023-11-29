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
      for (let i = 0; i < action.payload.length; i++) {
        state.recipes.push(action.payload[i]);
      }
    },
    addRecipe(state, action) {
      state.recipes.push(action.payload);
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
