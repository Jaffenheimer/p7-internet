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
