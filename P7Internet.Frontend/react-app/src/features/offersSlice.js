import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  toggleStateIsRadius:
    localStorage.getItem("geolocation") !== null ? true : false,
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setStores(state, action) {
      state.stores = action.payload;
    },
    setToggleState(state) {
      state.toggleStateIsRadius = !state.toggleStateIsRadius;
    },
  },
});

export const { actions: offersActions, reducer: offersReducer } = offersSlice;
