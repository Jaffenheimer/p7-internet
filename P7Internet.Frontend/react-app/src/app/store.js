import { configureStore } from "@reduxjs/toolkit";
import { recipeGenerationReducer } from "../features/recipeGenerationSlice";
import { recipeReducer } from "../features/recipeSlice";
import { pageReducer } from "../features/pageSlice";
import { userReducer } from "../features/userSlice";
import { storesReducer } from "../features/storesSlice";
import { userApiSlice } from "../services/userApiSlice";

export const store = configureStore({
  reducer: {
    recipeGeneration: recipeGenerationReducer,
    recipe: recipeReducer,
    page: pageReducer,
    user: userReducer,
    stores: storesReducer,

    [userApiSlice.reducerPath]: userApiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
      
  //   }),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
//setupListeners(store.dispatch);