import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'Api', 
    baseQuery: fetchBaseQuery ({ baseUrl: 'http://localhost:5000/'}), 
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', '*');
        return headers;
    },
    endpoints: () => ({}) //Init to empty endpoints objects
}); 

