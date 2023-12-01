import { createSlice } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  user: {},
  favoriteRecipes: [],
  loggedIn: false,
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
    addRecipe(state, action) {
      state.favoriteRecipes.push(action.payload);
    },
    removeRecipe(state, action) {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe !== action.payload
      );
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
