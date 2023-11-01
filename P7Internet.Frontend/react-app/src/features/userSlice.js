import { createSlice, nanoid } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  users: [
    {
      id: "23haihfsk",
      email: "admin@admin.com",
      username: "admin",
      password: "admin",
      heartedRecipes: ["Spaghetti Aglio e Olio", "Chicken Stir-Fry", "Caprese Salad", "test4", "test5", "test6", "test7", "test8", "test9", "test10","Spaghetti Aglio e Olio", "Chicken Stir-Fry", "Caprese Salad", "test4", "test5", "test6", "test7", "test8", "test9", "test10","Spaghetti Aglio e Olio", "Chicken Stir-Fry", "Caprese Salad", "test4", "test5", "test6", "test7", "test8", "test9", "test10"],
    },
  ],
  loggedInUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const user = {
        id: nanoid(),
        email: action.payload[0],
        username: action.payload[1],
        password: action.payload[2],
        heartedRecipes: action.payload[3],
      };
      state.users.push(user);
    },
    removeUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    loginUser(state, action) {
      state.loggedInUser = action.payload;
    },
    logoutUser(state) {
      state.loggedInUser = {};
    },
    addRecipe(state, action) {
      state.loggedInUser[0]['heartedRecipes'].push(action.payload)

      const indexInUsers = state.users.findIndex((user) => user.id === state.loggedInUser[0]['id'])
      state.users[indexInUsers]['heartedRecipes'].push(action.payload)
    },
    removeRecipe(state, action) {
      state.loggedInUser[0]['heartedRecipes'] = state.loggedInUser[0]['heartedRecipes'].filter(recipe => recipe !== action.payload)
      
      const indexInUsers = state.users.findIndex((user) => user.id === state.loggedInUser[0]['id'])
      state.users[indexInUsers]['heartedRecipes'] = state.users[indexInUsers]['heartedRecipes'].filter(recipe => recipe !== action.payload)
    }
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
