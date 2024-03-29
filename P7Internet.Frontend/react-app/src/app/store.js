import { configureStore } from "@reduxjs/toolkit";
import { recipeGenerationReducer } from "../features/recipeGenerationSlice";
import { recipeReducer } from "../features/recipeSlice";
import { pageReducer } from "../features/pageSlice";
import { userReducer } from "../features/userSlice";
import { offersReducer } from "../features/offersSlice";
import { apiSlice } from "../services/apiSlice";

export const store = configureStore({
  reducer: {
    recipeGeneration: recipeGenerationReducer,
    recipe: recipeReducer,
    page: pageReducer,
    user: userReducer,
    offers: offersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
