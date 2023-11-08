import { createSlice } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  user: {}, 
  heartedRecipes: [],
  loggedInd: false, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = {};
    },
    toggleTestLogin(state){
      state.loggedInd = !state.loggedInd; 
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
