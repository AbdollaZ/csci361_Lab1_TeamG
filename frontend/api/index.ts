import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://backend-1-apmk.onrender.com" }),
  tagTypes: ["Products", "ProductCategories"],
  endpoints: () => ({}),
});
