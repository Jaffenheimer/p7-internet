import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
};

export const recipeSlice = createSlice({
    name: 'recipes', 
    initialState, 
    reducers: {
        addRecipe(state, action){
            state.ownedIngredients.push(action.payload); 
        }, 
        removeRecipe(state, action){
            state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
        }, 
    },  
}); 

export const {actions: recipeActions, reducer: recipeReducer} = recipeSlice;   