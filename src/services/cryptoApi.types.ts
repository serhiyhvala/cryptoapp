export interface getCoins {
	status: string
	data: Data
}

export interface CoinDetail {
    status: string;
    data:   Data;
}

interface Data {
    coin: Coin;
}

interface Coin {
    uuid:              string;
    symbol:            string;
    name:              string;
    description:       string;
    color:             string;
    iconUrl:           string;
    websiteUrl:        string;
    links:             Link[];
    supply:            Supply;
    "24hVolume":       string;
    marketCap:         string;
    price:             string;
    btcPrice:          string;
    change:            string;
    rank:              number;
    numberOfMarkets:   number;
    numberOfExchanges: number;
    sparkline:         string[];
    allTimeHigh:       AllTimeHigh;
    coinrankingUrl:    string;
}

interface AllTimeHigh {
    price:     string;
    timestamp: number;
}

interface Link {
    name: string;
    url:  string;
    type: string;
}

interface Supply {
    confirmed:   boolean;
    circulating: string;
    total:       string;
}

interface Data {
	stats: Stats
	coins: Coin[]
}

interface Coin {
	uuid: string
	symbol: string
	name: string
	color: string
	iconUrl: string
	marketCap: string
	price: string
	btcPrice: string
	listedAt: number
	change: string
	rank: number
	sparkline: string[]
	coinrankingUrl: string
	'24hVolume': string
}

interface Stats {
	total: number
	totalCoins: number
	totalMarkets: number
	totalExchanges: number
	totalMarketCap: string
	total24hVolume: string
}
