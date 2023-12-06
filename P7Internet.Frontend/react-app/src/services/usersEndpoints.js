import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
    userLogin: builder.mutation({
      query: ({ username, password }) => ({
        url: `/public/user/login?Username=${username}&Password=${password}`,
        method: "POST",
        body: "",
      }),
    }),
    userCreate: builder.mutation({
      query: ({ username, password, email }) => ({
        url: `/public/user/create-user?Name=${username}&EmailAddress=${email}&Password=${password}`,
        method: "POST",
        body: "",
      }),
    }),
    userLogOut: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `public/user/logout?UserId=${userId}&SessionToken=${sessionToken}`,
        method: "POST",
        body: "",
      }),
    }),
    userPostFavoriteRecipe: builder.mutation({
      query: ({ userId, sessionToken, recipeId }) => ({
        url: `public/user/favorite-recipe?UserId=${userId}&SessionToken=${sessionToken}&RecipeId=${recipeId}`,
        method: "POST",
        body: "",
      }),
    }),
    userDeleteFavoriteRecipe: builder.mutation({
      query: ({ userId, sessionToken, recipeId }) => ({
        url: `public/user/favorite-recipe?UserId=${userId}&SessionToken=${sessionToken}&RecipeId=${recipeId}`,
        method: "DELETE",
        body: "",
      }),
    }),
    userGetAllFavoriteRecipes: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `public/user/favorite-recipes?UserId=${userId}&SessionToken=${sessionToken}`,
        method: "GET",
      }),
    }),
    userResetPasswordEmailRequest: builder.mutation({
      query: ({ email }) => ({
        url: `/public/user/reset-password-email-request?email=${email}`,
        method: "POST",
        body: "",
      }),
    }),
    userResetPassword: builder.mutation({
      query: ({ password, verificationCode }) => ({
        url: `/public/user/reset-password?password=${password}&verificationCode=${verificationCode}`,
        method: "POST",
        body: "",
      }),
    }),
    userChangePassword: builder.mutation({
      query: ({
        userId,
        sessionToken,
        userName,
        oldPassword,
        newPassword,
      }) => ({
        url: `public/user/change-password?UserId=${userId}&SessionToken=${sessionToken}&UserName=${userName}&OldPassword=${oldPassword}&NewPassword=${newPassword}`,
        method: "POST",
        body: "",
      }),
    }),
    userConfirmEmailRequest: builder.mutation({
      query: ({ UserId }) => ({
        url: `/public/user/confirm-email-request?UserId=${UserId}`,
        method: "POST",
        body: "",
      }),
    }),
    userConfirmEmail: builder.mutation({
      query: ({ UserId, VerificationCode }) => ({
        url: `/public/user/confirm-email?userId=${UserId}&verificationCode=${VerificationCode}`,
        method: "POST",
        body: "",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useUserCreateMutation,
  useUserLogOutMutation,
  useUserPostFavoriteRecipeMutation,
  useUserDeleteFavoriteRecipeMutation,
  useUserGetAllFavoriteRecipesMutation,
  useUserResetPasswordEmailRequestMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
  useUserConfirmEmailRequestMutation,
  useUserConfirmEmailMutation,
} = userEndpoints;
