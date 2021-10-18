import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalIp } from "../../Config";
import { userApi } from "../user/userApi";
import household from "./household";

export const household = createApi({
  reducerPath: "household",
  baseQuery: fetchBaseQuery({
    baseUrl:
      LocalIp + "/react-native-household-app/us-central1/webApi/household",
  }),
  tagTypes: ["Household"],
  endpoints: (builder) => ({
    createHousehold: builder.mutation<household, household>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        responseHandler: (response) => {
          if (response.status !== 201) {
            return response.text();
          } else {
            return response.json();
          }
        },
        body,
      }),
      transformResponse(response: household) {
        console.log("response", response);
        return response;
      },

      invalidatesTags: (result, error, arg) => [
        { type: "Household", id: arg.id },
      ],
    }),
    GetHouseholdByUserId: builder.query<household[], string>({
      query: (body) => ({
        url: `/` + body,
        method: "GET",
        responseHandler: (response) => {
          if (response.status !== 200) {
            return response.text();
          } else {
            return response.json();
          }
        },
      }),
      transformResponse(response: household[]) {
        console.log("response", response);
        return response;
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Household" as const, id })),
              "Household",
            ]
          : ["Household"],
    }),
  }),
});

export const { useCreateHouseholdMutation, useGetHouseholdByUserIdQuery } =
  household;
