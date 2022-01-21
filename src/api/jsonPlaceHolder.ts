import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataProps } from '../types'

export const jsonPlaceApi = createApi({
  reducerPath: 'jsonApi',
  tagTypes: ['posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<DataProps[], void>({
      query: () => `posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'posts' as const, id })),
              { type: 'posts', id: 'LIST' },
            ]
          : [{ type: 'posts', id: 'LIST' }],
    }),
    getPostsLimit: builder.query<DataProps[], string>({
      query: (limit = '') => `posts?${limit && `_limit=${limit}`}`,
    }),
    getPostId: builder.query<DataProps, string>({
      query: (id = '') => `posts/${id}`,
    }),
    addPost: builder.mutation<void, DataProps>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    }),
  }),
})
export const { useGetPostsLimitQuery, useGetPostIdQuery, useGetPostsQuery, useAddPostMutation } =
  jsonPlaceApi
