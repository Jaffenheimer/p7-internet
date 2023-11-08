import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


/*
    Funktion laver en api med en basepath og header fra RTK Query, 
    Laver et basalt request, bare med ingen endpoints, som man så injecter efter 
    for at kunne opdele i flere filer
*/
export const apiSlice = createApi({
    reducerPath: 'Api', 
    baseQuery: fetchBaseQuery ({ baseUrl: 'http://localhost:5000/'}), 
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', '*');
        return headers;
    },
    endpoints: () => ({}) //Init to empty endpoints objects
}); 

