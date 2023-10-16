import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    ownedIngredients: [],
    dietaryRestrictions: [], 
    excludeList: [],
    numPeople: 4, 
};

export const recipeGenerationSlice = createSlice({
    name: 'recipeGeneration', 
    initialState, 
    reducers: {
        addOwnedIngredients(state, action){
            const ownedIngredient = {
                id: nanoid(), 
                text: action.payload,
            }
            state.ownedIngredients.push(ownedIngredient); 
        }, 
        removeOwnedIngredients(state, action){
            state.ownedIngredients = state.ownedIngredients.filter((ingredient) => ingredient.id !== action.payload);
        }, 
        includesOwnedIngredients(state, action){
            return state.ownedIngredients.includes(action.payload)
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
            state.excludeList = state.excludeList.filter((ingredient) => ingredient.id !== action.payload);
        },
        addPerson(state){
            state.numPeople++; 
        },
        removePerson(state){
            state.numPeople--;
        },
    },  
}); 

export const {actions: recipeGenerationActions, reducer: recipeGenerationReducer} = recipeGenerationSlice;