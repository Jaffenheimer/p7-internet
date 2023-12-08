import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const offerEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
    getOffer: builder.mutation({
<<<<<<< HEAD
      query: ({ lat, lon, pageSize, searchTerm, radius, upcoming }) => ({
        url: `/public/offer/getOffer?Lat=${lat}&Long=${lon}&Pagesize=${1}&SearchTerm=${searchTerm}&Radius=${radius}&Upcoming=${upcoming}`,
=======
      query: ({
        lat,
        lon,
        pageSize,
        searchTerm,
        radius,
        upcoming,
        stores,
      }) => ({
        url: `/public/offer/getOffer?Lat=${lat}&Long=${lon}&Pagesize=${pageSize}&SearchTerm=${searchTerm}&Radius=${radius}&Upcoming=${upcoming}&Stores=${stores}`,
>>>>>>> 485f08f5d9ba79599dd424dfe6eb7d11f61218c1
        method: "GET",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const { useGetOfferMutation } = offerEndpoints;
