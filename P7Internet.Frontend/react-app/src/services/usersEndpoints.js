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
    userConfirmEmail: builder.mutation({
      query: ({ EmailAddress }) => ({
        url: `public/user/confirm-email?EmailAddress=${EmailAddress}`,
        method: "POST",
        body: "",
      }),
    }),
    userChangePassword: builder.mutation({
      query: ({ EmailAddress }) => ({
        url: `public/user/confirm-email?EmailAddress=${EmailAddress}`,
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
  useUserConfirmEmailMutation,
} = userEndpoints;
