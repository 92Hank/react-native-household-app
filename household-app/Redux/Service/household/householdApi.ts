import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import household, {
  householdAcceptOrMakeOwner,
  householdCreate,
  householdJoin,
} from "../../entity/householdRequestType";

export const household = createApi({
  reducerPath: "household",
  baseQuery: fetchBaseQuery({
    baseUrl: webUrl + "household",
  }),
  tagTypes: ["Household"],
  endpoints: (builder) => ({
    createHousehold: builder.mutation<string, householdCreate>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        responseHandler: "text",
        body,
      }),

      invalidatesTags: (result, error, arg) => [{ type: "Household" }],
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
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ inviteCode }) => ({
                type: "Household" as const,
                inviteCode,
              })),
              "Household",
            ]
          : ["Household"],
    }),
    GetHouseholdByInviteCode: builder.query<household, string>({
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
      providesTags: (result, error, arg) =>
        result
          ? [
              {
                type: "Household" as const,
                id: result.inviteCode,
              },
              "Household",
            ]
          : ["Household"],
    }),

    JoinHousehold: builder.mutation<string, householdJoin>({
      query: (body) => ({
        url: `/join`,
        method: "POST",
        responseHandler: "text",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Household", id: arg.inviteCode },
      ],
    }),
    AcceptUser: builder.mutation<string, householdAcceptOrMakeOwner>({
      query: (body) => ({
        url: `/accept`,
        method: "PATCH",
        responseHandler: "text",
        body,
      }),

      invalidatesTags: (result, error, arg) => [{ type: "Household" }],
    }),
    MakeUserToOwner: builder.mutation<string, householdAcceptOrMakeOwner>({
      query: (body) => ({
        url: `/owner`,
        method: "PATCH",
        responseHandler: "text",
        body,
      }),

      invalidatesTags: (result, error, arg) => [{ type: "Household" }],
    }),
  }),
});

export const {
  useCreateHouseholdMutation,
  useGetHouseholdByUserIdQuery,
  useJoinHouseholdMutation,
  useGetHouseholdByInviteCodeQuery,
  useAcceptUserMutation,
  useMakeUserToOwnerMutation,
} = household;
