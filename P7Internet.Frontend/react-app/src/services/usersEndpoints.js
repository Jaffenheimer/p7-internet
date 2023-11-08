import { apiSlice } from "./apiSlice"

// Gør det mugligt at injecte user endpoints ind i apiSlicen
const userEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Da det et en post so mutater den noget
        userLogin: builder.mutation({
            //Opbygning af hvad queryen skal indeholde
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
    //Er et flag som sættes hvis den ændre noget eksisterende endpoints
    overrideExisting: false,
});

export const { useUserLoginMutation, useUserCreateMutation, useUserLogOutMutation } = userEndpoints;

