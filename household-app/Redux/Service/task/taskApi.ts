import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  webUrl } from "../../Config";
import task from "../../entity/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: webUrl + "Task",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    createTask: builder.mutation<string, task>({
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
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),

    GetTaskByHouseholdId: builder.query<task[], string>({
      query: (body) => `/` + body,

      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: "Task" as const, id })), "Task"]
          : ["Task"],
    }),
  }),
});

export const { useCreateTaskMutation, useGetTaskByHouseholdIdQuery } = taskApi;
