import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalIp } from "../../Config";
import user from "../../entity/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: LocalIp + "/react-native-household-app/us-central1/webApi/users",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<string, user>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        responseHandler: "text",
        // responseHandler: (response) => {
        //   if (response.status !== 200) {
        //     return response.text();
        //   } else {
        //     return response.json();
        //   }
        // },
        body,
      }),

      transformResponse(response: string) {
        console.log("response", response);
        return response;
      },
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
