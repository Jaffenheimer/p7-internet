import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: {
    bilka: false,
    rema1000: false,
    coop365: false,
    lidl: false,
    føtex: false,
    netto: false,
    kvickly: false,
    fakta: false,
  },
};

export const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    toggleStore(state, action) {
      const storeName = action.payload;
      state.stores[storeName] = !state.stores[storeName];
    },
  },
});

export const { actions: storesActions, reducer: storesReducer } = storesSlice;
