import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jsonPlaceApi } from './api/jsonPlaceHolder'

export const store = configureStore({
  reducer: {
    [jsonPlaceApi.reducerPath]: jsonPlaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jsonPlaceApi.middleware),
})
setupListeners(store.dispatch)
