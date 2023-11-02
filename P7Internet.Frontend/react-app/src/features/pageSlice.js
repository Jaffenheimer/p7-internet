import { createSlice } from "@reduxjs/toolkit";
import Pages from "../objects/Pages"


const initialState = {
    page: Pages.frontPage,
    modalShown: false
};

export const pageSlice = createSlice({
    name: 'page', 
    initialState,
    reducers: {
        goToPage(state, action) {
            state.page = action.payload
        }, 
        openModal(state) {
            state.modalShown = true
        }, 
        closeModal(state) {
            state.modalShown = false
        }
    },
});

export const {actions: pageActions, reducer: pageReducer} = pageSlice;