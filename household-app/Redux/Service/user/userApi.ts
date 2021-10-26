import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import { user } from "../../../../Common/User";

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

            providesTags: (result) =>
                result ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"] : ["User"],
        }),

        GetUserById: builder.query<user, string>({
            query: (body) => `/` + body,

            providesTags: (result) =>
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

export const { useGetAllUserQuery, useCreateUserMutation, useGetUserByIdQuery } = userApi;
