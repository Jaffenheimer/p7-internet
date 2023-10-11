import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ownedIngredients: [],
    dietaryRestrictions: [], 
    excludeList: [],
};

export const recipeGenerationSlice = createSlice({
    name: 'recipeGeneration', 
    initialState, 
    reducers: {
        addOwnedIngredients(state, action){
            state.ownedIngredients.push(action.payload); 
        }, 
        removeOwnedIngreidents(state, action){
            state.ownedIngredients = state.ownedIngredients.filter(ingredient => ingredient.id !== action.payload);
        }, 
        selectDietaryRestrictions(state, action){
            state.dietaryRestrictions.push(action.payload);
        }, 
        deselectDietaryRestrictions(state, action){
            state.dietaryRestrictions = state.ownedIngredients.filter(dietaryRestrictions => dietaryRestrictions !== action.payload);
        }, 
        addExcludedIngredient(state, action){
            state.excludeList.push(action.payload); 
        }, 
        removeExcludedIngredient(state, action){
            state.excludeList = state.excludeList.filter(ingredient => ingredient.id !== action.payload);
        },
    },  
}); 

export const {actions: recipeGenerationActions, reducer: recipeGenerationreducer} = recipeGenerationSlice