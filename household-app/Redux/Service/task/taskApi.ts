import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import { task } from "../../../../Common/task";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: webUrl + "tasks",
    }),
    tagTypes: ["Task"],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        createTask: builder.mutation<string, task>({
            query: (body) => ({
                url: `/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: () => [{ type: "Task" }],
        }),

        GetTaskByHouseholdId: builder.query<task[], string>({
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

        editTask: builder.mutation<string, task>({
            query: (body) => ({
                url: `/` + body.id,
                method: "PUT",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
        }),

        deleteTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `/` + body,
                method: "DELETE",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg }],
        }),

        archiveTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `/` + body,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg }],
        }),

        activateTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `/activate/` + body,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg }],
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetTaskByHouseholdIdQuery,
    useLazyGetTaskByHouseholdIdQuery,
    useEditTaskMutation,
    useDeleteTaskMutation,
    useArchiveTaskMutation,
    useActivateTaskMutation,
} = taskApi;
