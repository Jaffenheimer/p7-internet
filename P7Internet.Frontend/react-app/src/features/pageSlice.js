import { createSlice } from "@reduxjs/toolkit";
import Pages from "../objects/Pages"


const initialState = {
    page: Pages.frontPage,
    loginModalShown: false,
		favoritesModalShown: false,
};

export const pageSlice = createSlice({
    name: 'page', 
    initialState,
    reducers: {
        goToPage(state, action) {
            state.page = action.payload
        }, 
        openLoginModal(state) {
            state.loginModalShown = true
        }, 
        closeLoginModal(state) {
            state.loginModalShown = false
        },
				openFavoritesModal(state) {
						state.favoritesModalShown = true
				}, 
				closeFavoritesModal(state) {
						state.favoritesModalShown = false
				}
    },
});

export const {actions: pageActions, reducer: pageReducer} = pageSlice;