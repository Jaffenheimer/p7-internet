import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const recipeEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateUserRecipe: builder.mutation({
      query: (body) => ({
        url: `/public/user/recipe`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
    useGenerateUserRecipeMutation,
  } = recipeEndpoints;
  