import { apiSlice } from "./apiSlice";

// Function injects endpoints into the apiSlice
const recipeEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateUserRecipe: builder.mutation({
      query: (body) => ({
        url: `/public/user/recipe`,
        method: "POST",
        body: body,
      }),
    }),
    generateRecipe: builder.mutation({
      query: (body) => ({
        url: `/public/recipes`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGenerateUserRecipeMutation, useGenerateRecipeMutation } =
  recipeEndpoints;
