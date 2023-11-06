import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApiSlice = createApi({
    reducerPath: 'elementTest', 
    baseQuery: fetchBaseQuery ({ baseUrl: 'http://localhost:5000/'}), 
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', '*');
        return headers;
    },
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
        })
    })
}); 

export const { useUserLoginMutation, useUserCreateMutation, useUserLogOutMutation } = userApiSlice;

//https://localhost:5001/public/sample/user/create-user?Name=user2&EmailAddress=user2%40mail.dk&Password=1234

//https://localhost:5001/public/user/create-user?Name=u&EmailAddress=user%40mail.dk&Password=1

//https://localhost:5001/public/user/logout?UserId=caea430e-2766-4f95-bcfa-53be60938d94&SessionToken=C2gwmeWDgkqawEPJrs6ICw%3D%3D

