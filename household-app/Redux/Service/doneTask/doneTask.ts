import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { webUrl } from "../../Config";
import doneTask from "../../entity/doneTask";
import task from "../../entity/task";

export const doneTask = createApi({
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
        // responseHandler: (response) => {
        //   if (response.status !== 200) {
        //     return response.text();
        //   } else {
        //     return response.json();
        //   }
        // },
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "DoneTask", id: arg.id },
      ],
    }),

    GetTaskByHouseholdId: builder.query<doneTask[], string>({
      query: (body) => `/` + body,

      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "DoneTask" as const, id })),
              "DoneTask",
            ]
          : ["DoneTask"],
    }),
  }),
});

export const { useCreateDoneTaskMutation, useGetTaskByHouseholdIdQuery } = doneTask;
