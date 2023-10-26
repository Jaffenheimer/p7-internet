import { configureStore } from "@reduxjs/toolkit";
import { recipeGenerationReducer } from "../features/recipeGenerationSlice";
import { recipeReducer } from "../features/recipeSlice";
import { pageReducer } from "../features/pageSlice";
import { storesReducer } from "../features/storesSlice";

export const store = configureStore({
  reducer: {
    recipeGeneration: recipeGenerationReducer,
    recipe: recipeReducer,
    page: pageReducer,
    stores: storesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
