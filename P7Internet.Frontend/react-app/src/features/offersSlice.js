import { createSlice } from "@reduxjs/toolkit";
import { stores } from "../objects/Stores";

const initialState = {
  stores: stores,
  toggleStateIsRadius:
    localStorage.getItem("geolocation") !== null ? true : false,
  radius: "100 m",
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setStores(state, action) {
      state.stores = action.payload;
    },
    setStoresObjects(state, action) {
      state.storesObjects = action.payload;
    },
    setToggleState(state) {
      state.toggleStateIsRadius = !state.toggleStateIsRadius;
    },
    setRadius(state, action) {
      state.radius = action.payload;
    },
  },
});

export const { actions: offersActions, reducer: offersReducer } = offersSlice;
