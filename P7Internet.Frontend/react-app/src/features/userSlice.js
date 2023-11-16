import { createSlice } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  user: {},
  heartedRecipes: [
    "hej",
    "hej2",
    "hej3",
    "hej4",
    "hej5",
    "hej6",
    "hej7",
    "1",
    2,
    3,
    456,
    7,
    8,
    8,
    8,
    7,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
  ],
  loggedIn: true,
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
      state.heartedRecipes = [];
      state.loggedIn = false;
    },
    addRecipe(state, action) {
      state.heartedRecipes.push(action.payload);
    },
    removeRecipe(state, action) {
      state.heartedRecipes = state.heartedRecipes.filter(
        (recipe) => recipe !== action.payload
      );
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
