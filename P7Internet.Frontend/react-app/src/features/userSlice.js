import { createSlice, nanoid } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
  users: [
    {
      id: "23haihfsk",
      fullname: "admin",
      email: "admin@admin.com",
      username: "admin",
      password: "admin",
      heartedRecipes: [],
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
        fullname: action.payload[0],
        email: action.payload[1],
        username: action.payload[2],
        password: action.payload[3],
        heartedRecipes: action.payload[4],
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
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
