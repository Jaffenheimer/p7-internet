import { createSlice } from "@reduxjs/toolkit";
import Pages from "../objects/Pages";

const initialState = {
  page: Pages.frontPage,
  loginModalShown: false,
  favoritesModalShown: false,
  additionalOwnedIngredientsModalContainerIsOpen: false,
  historyModalShown: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    goToPage(state, action) {
      state.page = action.payload;
    },
    openLoginModal(state) {
      state.loginModalShown = true;
    },
    closeLoginModal(state) {
      state.loginModalShown = false;
    },
    openFavoritesModal(state) {
      state.favoritesModalShown = true;
    },
    closeFavoritesModal(state) {
      state.favoritesModalShown = false;
    },
    openHistoryModal(state) {
      state.historyModalShown = true;
    },
    closeHistoryModal(state) {
      state.historyModalShown = false;
    },
    openAdditionalOwnedIngredientsModalContainer(state) {
      state.additionalOwnedIngredientsModalContainerIsOpen = true;
    },
    closeAdditionalOwnedIngredientsModalContainer(state) {
      state.additionalOwnedIngredientsModalContainerIsOpen = false;
    },
  },
});

export const { actions: pageActions, reducer: pageReducer } = pageSlice;
