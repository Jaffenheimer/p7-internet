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
      console.log("Actions: ", action.payload);
      const recipe = {
        id: action.payload.id,
        title: action.payload.title, 
        ingredients: action.payload.ingredients, 
        method: action.payload.method, 
        shortIngredients: action.payload.shortIngredients,  
      };
      state.recipes.push(recipe);
      console.log("Lenght of state: ", state.recipes.length);  
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
    setRecipeToShow(state, action) {
      state.recipeToShow = action.payload;
    }
  },
});

export const { actions: recipeActions, reducer: recipeReducer } = recipeSlice;
