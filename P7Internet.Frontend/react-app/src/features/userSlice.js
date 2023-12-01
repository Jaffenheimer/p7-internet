import { createSlice } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  user: {},
  favoriteRecipes: [],
  loggedIn: false,
  recipesInHistory: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logoutUser(state) {
      state.user = {};
      state.favoriteRecipes = [];
      state.loggedIn = false;
    },
    addFavoriteRecipe(state, action) {
      state.favoriteRecipes.push(action.payload);
    },
    removeFavoriteRecipe(state, action) {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe.title !== action.payload
      );
    },
    addRecipeToHistory(state, action) {
      state.recipesInHistory.push(action.payload);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
