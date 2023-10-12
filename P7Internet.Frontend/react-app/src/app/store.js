import {configureStore} from "@reduxjs/toolkit"
import { recipeGenerationreducer } from "../features/recipeGenerationSlice";
import { recipereducer } from "../features/recipeSlice";

export const store = configureStore({
    reducer: {
        recipeGeneration: recipeGenerationreducer, 
        recipe: recipereducer,
    },
});

