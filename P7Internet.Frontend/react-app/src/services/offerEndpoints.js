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
        url: `/public/offer/getOffer?Lat=${57}&Long=${10}&Pagesize=${1}&SearchTerm=${searchTerm}&Radius=${3000}&Upcoming=${"true"}&Stores=${stores}`,
        method: "GET",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const { useGetOfferMutation } = offerEndpoints;
