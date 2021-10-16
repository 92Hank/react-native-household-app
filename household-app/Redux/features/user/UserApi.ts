import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import user from "./User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://localhost:5000/react-native-household-app/us-central1/webApi/users",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query<user, void>({
      query: () => `/`,
      transformResponse(response) {
        console.log(response);
        return { id: "Foo", name: "Foo" };
      },
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
