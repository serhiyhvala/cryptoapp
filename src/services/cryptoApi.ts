import { getCoins, CoinDetail, CoinHistory } from './cryptoApi.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
	'X-RapidAPI-Key': 'bc3fd737d3msh82672c58a3f5f9cp14b3fcjsn0891ca8dbada',
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://coinranking1.p.rapidapi.com'
	}),
	endpoints: builder => ({
		getCryptos: builder.query<getCoins, string>({
			query: (prop) => createRequest(prop)
		}),
		getCryptosByLimit: builder.query<getCoins, number>({
			query: (count) => createRequest(`/coins?limit=${count}`)
		}),
		getCryptoDetail: builder.query<CoinDetail, string | undefined>({
			query: (coinId) => createRequest(`/coin/${coinId}`)
		}),
		getCryptoHistory: builder.query<CoinHistory, {coinId?: string, timePeriod: string}>({
			query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
		})
	})
})

export const { useGetCryptosQuery, useGetCryptosByLimitQuery, useGetCryptoDetailQuery, useGetCryptoHistoryQuery } = cryptoApi
