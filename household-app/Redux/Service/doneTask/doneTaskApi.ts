import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import doneTask from "../../../../Common/doneTask";

export const doneTaskApi = createApi({
    reducerPath: "doneTask",
    baseQuery: fetchBaseQuery({
        baseUrl: webUrl + "donetask",
    }),
    tagTypes: ["DoneTask"],
    endpoints: (builder) => ({
        createDoneTask: builder.mutation<string, doneTask>({
            query: (body) => ({
                url: `/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "DoneTask", id: arg.id }],
        }),

        GetDoneTasksWithHouseholdId: builder.query<doneTask[], string>({
            query: (body) => ({
                url: `/` + body,
                method: "GET",
                responseHandler: (response) => {
                    if (response.status !== 200) {
                        console.log(response.text());
                        return response.text();
                    } else {
                        console.log("foo");
                        return response.json();
                    }
                },
            }),

            providesTags: (result) =>
                result ? [...result.map(({ id }) => ({ type: "DoneTask" as const, id })), "DoneTask"] : ["DoneTask"],
        }),
    }),
});

export const { useCreateDoneTaskMutation, useGetDoneTasksWithHouseholdIdQuery } = doneTaskApi;
