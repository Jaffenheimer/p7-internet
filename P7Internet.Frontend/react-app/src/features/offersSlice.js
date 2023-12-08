import { createSlice } from "@reduxjs/toolkit";
import { stores } from "../objects/Stores";

const initialState = {
  stores: stores,
  toggleStateIsRadius:
    localStorage.getItem("geolocation") !== null ? true : false,
  radius: "100 m",
  finalRecipes: {},
  finalRecipesSum: 0,
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
    setRadius(state, action) {
      state.radius = action.payload;
    },
    addTotalPrice(state, action) {
      state.finalRecipes = {
        ...state.finalRecipes,
        ...action.payload,
      };

      let valuesDictionary = Object.keys(state.finalRecipes).map((key) => {
        return parseFloat(state.finalRecipes[key]);
      });

      state.finalRecipesSum = Math.round(
        valuesDictionary.reduce((a, b) => a + b, 0)
      );
    },
  },
});

export const { actions: offersActions, reducer: offersReducer } = offersSlice;
