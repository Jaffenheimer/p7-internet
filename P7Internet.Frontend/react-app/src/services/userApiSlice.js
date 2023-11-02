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
                url: `/public/sample/user/login?Username=${username}&Password=${password}`,
                method: 'POST', 
                body: '',
            }), 
        }), 
        userCreate: builder.mutation({
            query: ({username, password, email}) => ({
                url: `/public/sample/user/create-user?Name=${username}&EmailAddress=${email}&Password=${password}`,
                method: 'POST', 
                body: '', 
            }),
        })
    })
}); 

export const { useUserLoginMutation, useUserCreateMutation } = userApiSlice;

//https://localhost:5001/public/sample/user/create-user?Name=user2&EmailAddress=user2%40mail.dk&Password=1234