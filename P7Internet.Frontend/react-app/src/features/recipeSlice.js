import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  currentRecipeIndex: 0,
  recipeToShow: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipes(state, action) {
      for (const recipe of action.payload) {
        state.recipes.push(recipe);
      }
    },
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
    clearRecipes(state){
        state.recipes = []; 
    },
    removeRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    clearRecipes(state) {
      state.recipes = [];
    },
    setCurrentRecipeIndex(state, action) {
      state.currentRecipeIndex = action.payload;
    },
    setRecipeToShow(state, action) {
      state.recipeToShow = action.payload;
    },
  },
});

export const { actions: recipeActions, reducer: recipeReducer } = recipeSlice;
