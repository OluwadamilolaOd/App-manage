import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../Hook/baseurl'

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
}

const createRequest = (url) => ({ url, headers })


export const itemsApi = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (url) => createRequest(url),
        }),
    }),
})

export const { useGetItemsQuery } = itemsApi