import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  ownedIngredients: [],
  dietaryRestrictions: {
    pescitarian: false,
    vegan: false,
    vegetarian: false,
    lactosefree: false,
    glutenfree: false, 
  },
  excludeList: [],
  numPeople: 4,
};

export const recipeGenerationSlice = createSlice({
  name: "recipeGeneration",
  initialState,
  reducers: {
    addOwnedIngredients(state, action) {
      const ownedIngredient = {
        id: nanoid(),
        text: action.payload,
      };
      state.ownedIngredients.push(ownedIngredient);
    },
    removeOwnedIngreidents(state, action) {
      state.ownedIngredients = state.ownedIngredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    toggleDietaryRestrictions(state, action) {
      const dietaryRestrictionName = action.payload; 
      state.dietaryRestrictions[dietaryRestrictionName] = !state.dietaryRestrictions[dietaryRestrictionName];
    },
    addExcludedIngredient(state, action) {
      const ExcluedIngredient = {
        id: nanoid(),
        text: action.payload,
      };
      state.excludeList.push(ExcluedIngredient);
    },
    removeExcludedIngredient(state, action) {
      state.excludeList = state.excludeList.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearAllExcludedIngredient(state, action) {
      state.excludeList = state.excludeList.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addPerson(state) {
      state.numPeople++;
    },
    removePerson(state) {
      state.numPeople--;
    },
  },
});

export const {
  actions: recipeGenerationActions,
  reducer: recipeGenerationReducer,
} = recipeGenerationSlice;
