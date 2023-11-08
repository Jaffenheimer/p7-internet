import { apiSlice } from "./apiSlice"

const userEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: ({username, password}) => ({ 
                url: `/public/user/login?Username=${username}&Password=${password}`,
                method: 'POST', 
                body: '',
            }), 
        }), 
        userCreate: builder.mutation({
            query: ({username, password, email}) => ({
                url: `/public/user/create-user?Name=${username}&EmailAddress=${email}&Password=${password}`,
                method: 'POST', 
                body: '', 
            }),
        }), 
        userLogOut: builder.mutation({
            query: ({userId, sessionToken}) => ({
                url: `public/user/logout?UserId=${userId}&SessionToken=${sessionToken}`,
                method: 'POST', 
                body: '', 
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useUserLoginMutation, useUserCreateMutation, useUserLogOutMutation } = userEndpoints;

