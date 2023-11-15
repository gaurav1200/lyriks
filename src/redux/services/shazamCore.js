import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", `${VITE_RAPID_API_KEY}`);
      headers.append("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
    paramsSerializer: (params) => {
      params.locale = "en-US";
      params.pageSize = "20";
      params.startFrom = "0";
      return params;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/track",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`,
    }),
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery } = shazamCoreApi;

// const request = require("request");

// const options = {
//   method: "GET",
//   url: "https://shazam.p.rapidapi.com/charts/track",
//   qs: {
//     locale: "en-US",
//     pageSize: "20",
//     startFrom: "0",
//   },
//   headers: {
//     "X-RapidAPI-Key": `${ RAPID_API_KEY}`,
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };

// let response;
// request(options, function (error, response, body) {
//   response = {};
//   if (error) throw new Error(error);

//   console.log(body);
// });
