import { createSlice } from "@reduxjs/toolkit";
import Pages from "../objects/Pages"


const initialState = {
    page: Pages.frontPage
};

export const pageSlice = createSlice({
    name: 'page', 
    initialState,
    reducers: {
        goToPage(state, action) {
            state.page = action.payload
        }, 
    },
});

export const {actions: pageActions, reducer: pageReducer} = pageSlice;