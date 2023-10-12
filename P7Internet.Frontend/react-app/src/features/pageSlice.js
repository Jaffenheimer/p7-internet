import { createSlice, nanoid } from "@reduxjs/toolkit";

const pages = {
    frontPage: 0,
    //selectRecipes: 1,
    fullRecipeView: 2,
}

const initialState = {
    page: pages.frontPage
};

export const recipeGenerationSlice = createSlice({
    name: 'page', 
    initialState,
    reducers: {
        addOwnedIngredients(state, action){
            const ownedIngredient = {
                id: nanoid(), 
                text: action.payload,
            }
            state.ownedIngredients.push(ownedIngredient); 
        }, 
    },
});

