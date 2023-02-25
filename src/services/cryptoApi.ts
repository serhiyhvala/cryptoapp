import { getCoins } from './cryptoApi.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
	'X-RapidAPI-Key': 'bc3fd737d3msh82672c58a3f5f9cp14b3fcjsn0891ca8dbada',
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://coinranking1.p.rapidapi.com/'
	}),
	endpoints: builder => ({
		getCryptos: builder.query<getCoins, string>({
			query: (path) => createRequest(path)
		})
	})
})

export const { useGetCryptosQuery } = cryptoApi
