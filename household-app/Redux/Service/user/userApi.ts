import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import user from "./User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://localhost:5001/react-native-household-app/us-central1/webApi/users",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<user, Partial<user>>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    getAllUser: builder.query<user[], void>({
      query: () => `/`,
      transformResponse(response: user[]) {
        console.log(response);
        return response;
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUserMutation } = userApi;
