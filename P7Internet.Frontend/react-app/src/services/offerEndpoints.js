import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const offerEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
    getOffer: builder.mutation({
      query: ({ lat, lon, pageSize, searchTerm, radius, upcoming }) => ({
        url: `/public/offer/getOffer?Lat=${lat}&Long=${lon}&Pagesize=${1}&SearchTerm=${searchTerm}&Radius=${3000}&Upcoming=${"true"}`,
        method: "GET",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const { useGetOfferMutation } = offerEndpoints;
