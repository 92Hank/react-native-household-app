import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalIp, webUrl } from "../../Config";
import user from "../../entity/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: webUrl + "users",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<string, user>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        responseHandler: "text",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    getAllUser: builder.query<user[], void>({
      query: () => `/`,

      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),

    GetUserById: builder.query<user, string>({
      query: (body) => `/` + body,

      providesTags: (result, error, arg) =>
        result
          ? [
              {
                type: "User" as const,
                id: result.id,
              },
              "User",
            ]
          : ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
} = userApi;
