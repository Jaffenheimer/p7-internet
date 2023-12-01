import { apiSlice } from "./apiSlice";

// Functions injects endpoints into the apiSlice
const offerEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Because it is a post request it is a mutation
    getOffer: builder.mutation({
      query: ({ coords, pageSize, searchTerm, radius, upcoming }) => ({
        url: `/public/offer/getOffer?Lat=${coords.lat}&Long=${coords.long}&Pagesize=${pageSize}&SearchTerm=${searchTerm}&Radius=${radius}&Upcoming=${upcoming}`,
        method: "GET",
        body: "",
      }),
    }),
  }),
  //Is a flag that tells redux that is does not override existing endpoints
  overrideExisting: false,
});

export const { useGetOfferMutation } = offerEndpoints;
