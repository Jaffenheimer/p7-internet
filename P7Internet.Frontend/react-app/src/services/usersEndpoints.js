import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
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
        url: `/public/user/get-favourite-recipes`,
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
        url: `/public/user/reset-password-email-request?email=${email}`,
        method: "POST",
        body: "",
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
    userDeleteUser: builder.mutation({
      query: (querystring) => ({
        url: `public/user/delete-user/${querystring}`,
        method: "DELETE",
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
  useUserGetRecipesInHistoryMutation,
  useUserResetPasswordEmailRequestMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
  useUserConfirmEmailRequestMutation,
  useUserConfirmEmailMutation,
  useUserDeleteUserMutation,
} = userEndpoints;
