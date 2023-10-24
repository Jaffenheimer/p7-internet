import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  currentRecipeIndex: 0,
  heartedRecipeTitles : [],
}

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipes(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.recipes.push(action.payload[i]);
      }
    },
    setDefaultRecipes(state, action) { //this function will not be necessary later, but is useful since we dont have communication with the backend yet
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
    addHeartedRecipeTitles(state, action) { //not necessary later, as this should be stored in database
      const title = action.payload
      if(!state.heartedRecipeTitles.includes(title))
        state.heartedRecipeTitles.push(action.payload)
    },
    removeHeartedRecipeTitles(state, action) { //not necessary later, as this should be stored in database
      state.heartedRecipeTitles = state.heartedRecipeTitles.filter(
        (title) => title !== action.payload
      );
    },
  },
});

export const { actions: recipeActions, reducer: recipeReducer } = recipeSlice;
