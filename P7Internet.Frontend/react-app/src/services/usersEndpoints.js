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
  }),
});

export const {
  useUserLoginMutation,
  useUserCreateMutation,
  useUserLogOutMutation,
} = userEndpoints;
