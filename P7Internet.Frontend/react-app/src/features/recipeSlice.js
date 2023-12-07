import { createSlice } from "@reduxjs/toolkit";
import Recipe from "../objects/Recipe";

const initialState = {
  recipes: [],
  currentRecipeIndex: 0,
  recipeToShow: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe(state, action) {
      // console.log("Actions: ", action.payload);
      const recipe = new Recipe(
        action.payload.id,
        action.payload.title,
        action.payload.ingredients,
        action.payload.method,
        action.payload.shortIngredients
      );
      state.recipes.push(recipe);
      // console.log("Lenght of state: ", state.recipes.length);
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
