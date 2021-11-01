import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import { doneTask } from "../../../../Common/doneTask";

export const doneTaskApi = createApi({
    reducerPath: "doneTask",
    baseQuery: fetchBaseQuery({
        baseUrl: webUrl + "donetask",
    }),
    tagTypes: ["Task"],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    endpoints: (builder) => ({
        createDoneTask: builder.mutation<string, doneTask>({
            query: (body) => ({
                url: `/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: () => [{ type: "Task" }],
        }),

        GetDoneTasksWithHouseholdId: builder.query<doneTask[], string>({
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
                result ? [...result.map(({ id }) => ({ type: "Task" as const, id })), "Task"] : ["Task"],
        }),
    }),
});

export const {
    useCreateDoneTaskMutation,
    useGetDoneTasksWithHouseholdIdQuery,
    useLazyGetDoneTasksWithHouseholdIdQuery,
} = doneTaskApi;
