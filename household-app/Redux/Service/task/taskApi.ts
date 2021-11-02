import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import { task } from "../../../../Common/task";
import { doneTask } from "../../../../Common/doneTask";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: webUrl,
    }),
    tagTypes: ["Task"],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        createTask: builder.mutation<string, task>({
            query: (body) => ({
                url: `tasks/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: () => [{ type: "Task" }],
        }),

        GetTaskByHouseholdId: builder.query<task[], string>({
            query: (body) => ({
                url: `tasks/` + body,
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
                url: `tasks/` + body.id,
                method: "PUT",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task" }],
        }),

        deleteTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `tasks/` + body,
                method: "DELETE",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task" }],
        }),

        archiveTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `tasks/` + body,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task" }],
        }),

        activateTask: builder.mutation<string, string>({
            query: (body) => ({
                url: `tasks/activate/` + body,
                method: "PATCH",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Task" }],
        }),
        createDoneTask: builder.mutation<string, doneTask>({
            query: (body) => ({
                url: `donetask/`,
                method: "POST",
                responseHandler: "text",
                body,
            }),
            invalidatesTags: () => [{ type: "Task" }],
        }),

        GetDoneTasksWithHouseholdId: builder.query<doneTask[], string>({
            query: (body) => ({
                url: `donetask/` + body,
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
    useCreateTaskMutation,
    useGetTaskByHouseholdIdQuery,
    useLazyGetTaskByHouseholdIdQuery,
    useEditTaskMutation,
    useDeleteTaskMutation,
    useArchiveTaskMutation,
    useActivateTaskMutation,
    useCreateDoneTaskMutation,
    useGetDoneTasksWithHouseholdIdQuery,
    useLazyGetDoneTasksWithHouseholdIdQuery,
} = taskApi;
