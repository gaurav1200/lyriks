import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'a3520e36famsh7c46e92b8c27a92p1e8c1cjsn285ed636ee6e',
//       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     }
//   };

//   fetch('https://spotify23.p.rapidapi.com/albums/?id=3IBcauSj5M2A6lTeffJzdv', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "a3520e36famsh7c46e92b8c27a92p1e8c1cjsn285ed636ee6e"
      );
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
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;

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
//     "X-RapidAPI-Key": "a3520e36famsh7c46e92b8c27a92p1e8c1cjsn285ed636ee6e",
//     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
//   },
// };

// let response;
// request(options, function (error, response, body) {
//   response = {};
//   if (error) throw new Error(error);

//   console.log(body);
// });
