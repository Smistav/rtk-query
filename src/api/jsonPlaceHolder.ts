import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DataProps } from '../types'

export const jsonPlaceApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<DataProps[], void>({
      query: () => `posts`,
    }),
    getPostsLimit: builder.query<DataProps[], string>({
      query: (limit = '') => `posts?${limit && `_limit=${limit}`}`,
    }),
    getPostId: builder.query<DataProps, string>({
      query: (id = '') => `posts/${id}`,
    }),
  }),
})
export const { useGetPostsLimitQuery, useGetPostIdQuery, useGetPostsQuery } = jsonPlaceApi
