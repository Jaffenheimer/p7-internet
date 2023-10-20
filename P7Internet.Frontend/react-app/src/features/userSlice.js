import { createSlice, nanoid } from "@reduxjs/toolkit";

//users should be on the database, st. user cannot browse all valid users.
const initialState = {
    users: [{id: "23haihfsk", username: "admin", password: "admin", heartedRecipes: []}],
    loggedInUser: {},
};

export const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
        addUser(state, action) {
            const user = {
              id: nanoid(),
              username: action.payload[0],
              password: action.payload[1],
              heartedRecipes: action.payload[2]
            };
            state.users.push(user);
        },
        removeUser(state, action) {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },
        loginUser(state, action) {
            state.loggedInUser = {id: action.payload[0], username: action.payload[1],
                                  password: action.payload[2], heartedRecipes: action.payload[3]}
        }
    },
});

export const {actions: userActions, reducer: userReducer} = userSlice;