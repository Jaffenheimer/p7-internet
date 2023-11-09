import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
    Function makes an apiSlice for redux store with basepath and header using RTK Query, 
    Prepares a basic request, just without endpoints. This allows for injecting endpoints, 
    so, endpoints can be splitted into different files.
*/
export const apiSlice = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
  endpoints: () => ({}), //Init to empty endpoints objects
});
