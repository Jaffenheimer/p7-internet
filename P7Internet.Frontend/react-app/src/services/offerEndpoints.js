import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const offerEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
    getOffer: builder.mutation({
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
        method: "GET",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const { useGetOfferMutation } = offerEndpoints;
