import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  ownedIngredients: [],
  dietaryRestrictions: "",
  allergens: [],
  excludeList: [],
  numPeople: 4,
};

export const recipeGenerationSlice = createSlice({
  name: "recipeGeneration",
  initialState,
  reducers: {
    addOwnedIngredient(state, action) {
      const ownedIngredient = {
        id: nanoid(),
        text: action.payload,
      };
      state.ownedIngredients.push(ownedIngredient);
    },
    removeOwnedIngredients(state, action) {
      state.ownedIngredients = state.ownedIngredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    setDietaryRestrictions(state, action) {
      state.dietaryRestrictions = action.payload;
    },
    //since allergens is a multi select we get a list as input
    setAllergens(state, action) {
      state.allergens = action.payload;
    },
    addExcludedIngredient(state, action) {
      const ExcludeIngredient = {
        id: nanoid(),
        text: action.payload,
      };
      state.excludeList.push(ExcludeIngredient);
    },
    removeExcludedIngredient(state, action) {
      state.excludeList = state.excludeList.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearAllExcludedIngredients(state) {
      state.excludeList = [];
    },
    clearAllOwnedIngredients(state) {
      state.ownedIngredients = [];
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
