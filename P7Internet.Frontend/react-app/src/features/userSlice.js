import { createSlice } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  user: {}, 
  heartedRecipes: [],
  loggedIn: false, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.heartedRecipes = [];
      state.loggedIn = true; 
    },
    logoutUser(state) {
      state.user = {};
      state.heartedRecipes = [];
      state.loggedIn = false; 
    },
    addRecipe(state, action) {
      state.heartedRecipes.push(action.payload);
    },
    removeRecipe(state, action) { 
      state.heartedRecipes = state.heartedRecipes.filter(recipe => recipe !== action.payload)
    }
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
