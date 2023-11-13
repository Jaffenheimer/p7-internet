import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const recipeEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateRecipe: builder.mutation({
      query: (body) => ({
        url: `/public/recipes`,
        method: "POST",
        body: body,
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const {
    generateRecipeMutation,
  } = recipeEndpoints;
  