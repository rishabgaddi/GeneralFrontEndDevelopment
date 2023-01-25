import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoRtkApi = createApi({
  reducerPath: "todoRtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: `todos`,
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    postTodo: builder.mutation({
      query: (todo) => ({
        url: `todos`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery, usePostTodoMutation } = todoRtkApi;
