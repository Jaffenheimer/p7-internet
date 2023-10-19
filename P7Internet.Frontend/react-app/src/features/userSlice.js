import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: [{id: "23haihfsk", username: "admin", password: "admin", heartedRecipes: []}],
};

export const userSlice = createSlice({
    name: 'loginpage', 
    initialState,
    reducers: {
        addUser(state, action) {
            const user = {
              id: nanoid(),
              username: action.payload[0],
              password: action.payload[1],
              heartedRecipes: action.payload.slice(2,action.payload.length)
            };
            state.users.push(user);
        },
        removeUser(state, action) {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },
    },
});

export const {actions: userActions, reducer: userReducer} = userSlice;