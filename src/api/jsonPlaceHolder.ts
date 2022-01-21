import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataProps } from '../types'

export const jsonPlaceApi = createApi({
  reducerPath: 'jsonApi',
  tagTypes: ['posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'posts' as const, id })),
              { type: 'posts', id: 'LIST' },
            ]
          : [{ type: 'posts', id: 'LIST' }],
    }),
    getPostId: builder.query<DataProps, string>({
      query: (id = '') => `posts/${id}`,
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    }),
    delPost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'posts', id: 'LIST' }],
    }),
  }),
})
export const {
  useGetPostsLimitQuery,
  useGetPostIdQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useDelPostMutation,
} = jsonPlaceApi
