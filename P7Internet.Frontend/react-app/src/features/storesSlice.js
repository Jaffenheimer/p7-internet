import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
};

export const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setStores(state, action) {
      state.stores = action.payload;
    },
  },
});

export const { actions: storesActions, reducer: storesReducer } = storesSlice;
