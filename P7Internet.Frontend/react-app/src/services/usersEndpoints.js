import { apiSlice } from "./apiSlice";

// Function injects endpoints into the apiSlice
const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({ username, password }) => ({
        url: `/public/user/login`,
        method: "POST",
        body: { username: username, password: password },
      }),
    }),
    userCreate: builder.mutation({
      query: ({ username, password, email }) => ({
        url: `/public/user/create-user`,
        method: "POST",
        body: { name: username, emailAddress: email, password: password },
      }),
    }),
    userLogOut: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `public/user/logout`,
        method: "POST",
        body: { userId: userId, sessionToken: sessionToken },
      }),
    }),
    userPostFavoriteRecipe: builder.mutation({
      query: ({ userId, sessionToken, recipeId }) => ({
        url: `public/user/favorite-recipe`,
        method: "POST",
        body: {
          userId: userId,
          sessionToken: sessionToken,
          recipeId: recipeId,
        },
      }),
    }),
    userDeleteFavoriteRecipe: builder.mutation({
      query: ({ userId, sessionToken, recipeId }) => ({
        url: `public/user/favorite-recipe`,
        method: "DELETE",
        body: {
          userId: userId,
          sessionToken: sessionToken,
          recipeId: recipeId,
        },
      }),
    }),
    userGetAllFavoriteRecipes: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `/public/user/get-favorite-recipes`,
        method: "POST",
        body: { userId: userId, sessionToken: sessionToken },
      }),
    }),
    userGetRecipesInHistory: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `/public/user/recipes-history`,
        method: "POST",
        body: { userId: userId, sessionToken: sessionToken },
      }),
    }),
    userResetPasswordEmailRequest: builder.mutation({
      query: ({ email }) => ({
        url: `/public/user/reset-password-email-request`,
        method: "POST",
        body: { email: email },
      }),
    }),
    userResetPassword: builder.mutation({
      query: ({ password, verificationCode }) => ({
        url: `/public/user/reset-password`,
        method: "POST",
        body: { password: password, verificationCode: verificationCode },
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
        url: `public/user/change-password`,
        method: "POST",
        body: {
          userId: userId,
          sessionToken: sessionToken,
          userName: userName,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      }),
    }),
    userConfirmEmail: builder.mutation({
      query: ({ UserId, VerificationCode }) => ({
        url: `/public/user/confirm-email`,
        method: "POST",
        body: {
          userId: UserId,
          verificationCode: VerificationCode,
        },
      }),
    }),
    userDeleteUser: builder.mutation({
      query: ({ userId, sessionToken }) => ({
        url: `/public/user/delete-user`,
        method: "DELETE",
        body: {
          userId: userId,
          sessionToken: sessionToken,
        },
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
  useUserGetRecipesInHistoryMutation,
  useUserResetPasswordEmailRequestMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
  useUserConfirmEmailMutation,
  useUserDeleteUserMutation,
} = userEndpoints;
