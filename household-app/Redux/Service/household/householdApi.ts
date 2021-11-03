import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    household,
    householdChangeName,
    householdCreate,
    householdIdAndUserId,
    householdJoin,
    householdPauseUser,
    updateMember,
} from "../../../../Common/household";
import { webUrl } from "../../Config";

export const householdApi = createApi({
    reducerPath: "household",
    baseQuery: fetchBaseQuery({
        baseUrl: webUrl + "household",
    }),
    tagTypes: ["Household"],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        createHousehold: builder.mutation<string, householdCreate>({
            query: (body) => ({
                url: `/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: () => [{ type: "Household" }],
        }),

        GetHouseholdByUserId: builder.query<household[], string>({
            query: (body) => ({
                url: `/userId/` + body,
                method: "GET",
                responseHandler: (response) => {
                    if (response.status !== 200) {
                        return response.text();
                    } else {
                        return response.json();
                    }
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Household" as const,
                              id,
                          })),
                          "Household",
                      ]
                    : ["Household"],
        }),

        GetHouseholdById: builder.query<household, string>({
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
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: "Household" as const,
                              id: result.id,
                          },
                          "Household",
                      ]
                    : ["Household"],
        }),

        GetHouseholdByInviteCode: builder.query<household, string>({
            query: (body) => ({
                url: `household/invitecode/` + body,
                method: "GET",
                responseHandler: (response) => {
                    if (response.status !== 200) {
                        return response.text();
                    } else {
                        return response.json();
                    }
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: "Household" as const,
                              id: result.id,
                          },
                          "Household",
                      ]
                    : ["Household"],
        }),

        changeName: builder.mutation<string, householdChangeName>({
            query: (body) => ({
                url: `/changename`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        updateMember: builder.mutation<string, updateMember>({
            query: (body) => ({
                url: `/updatemember`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        pauseUser: builder.mutation<string, householdPauseUser>({
            query: (body) => ({
                url: `/setpaused`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        JoinHousehold: builder.mutation<string, householdJoin>({
            query: (body) => ({
                url: `/join`,
                method: "POST",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", member: arg.member }],
        }),
        leaveHousehold: builder.mutation<string, householdIdAndUserId>({
            query: (body) => ({
                url: `/leave`,
                method: "DELETE",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        AcceptUser: builder.mutation<string, householdIdAndUserId>({
            query: (body) => ({
                url: `/accept`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        rejectUser: builder.mutation<string, householdIdAndUserId>({
            query: (body) => ({
                url: `/reject`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),

        MakeUserToOwner: builder.mutation<string, householdIdAndUserId>({
            query: (body) => ({
                url: `/owner`,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),

            invalidatesTags: (result, error, arg) => [{ type: "Household", id: arg.houseHoldId }],
        }),
    }),
});

export const {
    useGetHouseholdByIdQuery,
    useLazyGetHouseholdByIdQuery,
    useGetHouseholdByUserIdQuery,
    useLazyGetHouseholdByUserIdQuery,
    useGetHouseholdByInviteCodeQuery,
    useLazyGetHouseholdByInviteCodeQuery,
    usePauseUserMutation,
    useCreateHouseholdMutation,
    useJoinHouseholdMutation,
    useLeaveHouseholdMutation,
    useChangeNameMutation,
    useUpdateMemberMutation,
    useAcceptUserMutation,
    useMakeUserToOwnerMutation,
    useRejectUserMutation,
} = householdApi;
