import {
	CheckOutlined,
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	FundOutlined,
	MoneyCollectOutlined,
	NumberOutlined,
	StopOutlined,
	ThunderboltOutlined,
	TrophyOutlined
} from '@ant-design/icons'
import { Col, Row, Select, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetCryptoDetailQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'

import CoinStatistics from './CoinStatistics'

const { Title, Text } = Typography
const { Option } = Select

export interface IStats {
	title: string
	value?: string | number
	icon: ReactNode
}

export interface IGenericStats {
	title: string
	value?: string | number | ReactNode
	icon: ReactNode
}

const CryptoDetails = () => {
	const { coinId } = useParams()
	const [timePeriod, setTimePeriod] = useState('7d')
	const { data } = useGetCryptoDetailQuery(coinId)
	const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})
	const cryptoDetails = data?.data?.coin
	const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']
	const currentPrice = cryptoDetails?.price && millify(+cryptoDetails?.price)

	const stats: IStats[] = [
		{
			title: 'Price to USD',
			value: `$ ${cryptoDetails?.price && millify(+cryptoDetails?.price)}`,
			icon: <DollarCircleOutlined />
		},
		{ title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
		{
			title: '24h Volume',
			value: `$ ${
				cryptoDetails?.['24hVolume'] && millify(+cryptoDetails?.['24hVolume'])
			}`,
			icon: <ThunderboltOutlined />
		},
		{
			title: 'Market Cap',
			value: `$ ${
				cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap)
			}`,
			icon: <DollarCircleOutlined />
		},
		{
			title: 'All-time-high(daily avg.)',
			value: `$ ${
				cryptoDetails?.allTimeHigh &&
				millify(+cryptoDetails?.allTimeHigh?.price)
			}`,
			icon: <TrophyOutlined />
		}
	]

	const genericStats: IGenericStats[] = [
		{
			title: 'Number Of Markets',
			value: cryptoDetails?.numberOfMarkets,
			icon: <FundOutlined />
		},
		{
			title: 'Number Of Exchanges',
			value: cryptoDetails?.numberOfExchanges,
			icon: <MoneyCollectOutlined />
		},
		{
			title: 'Aprroved Supply',
			value: cryptoDetails?.supply.confirmed ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />
		},
		{
			title: 'Total Supply',
			value: `$ ${
				cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total)
			}`,
			icon: <ExclamationCircleOutlined />
		},
		{
			title: 'Circulating Supply',
			value: `$ ${
				cryptoDetails?.supply.circulating &&
				millify(+cryptoDetails?.supply.circulating)
			}`,
			icon: <ExclamationCircleOutlined />
		}
	]
	return (
		<Col className='coin-detail-container'>
			<Col className='coin-heading-container'>
				<Title level={2} className='coin-name'>
					{cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
				</Title>
				<p>
					{cryptoDetails?.name} live price in US dollars View value statistics,
					market cap and supply.
				</p>
			</Col>
			<Select
				defaultValue='7d'
				className='select-timeperiod'
				placeholder='Select Time Period'
				onChange={value => setTimePeriod(value)}
			>
				{time.map(date => (
					<Option key={date}>{date}</Option>
				))}
			</Select>
			<CoinStatistics coinHistory={coinHistory} currentPrice={currentPrice} coinName={cryptoDetails?.name}/>
			<Col className='stats-container'>
				<Col className='coin-value-statistics'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>
							{cryptoDetails?.name} Value Statistics
						</Title>
						<p>An overview showing the stats of {cryptoDetails?.name}</p>
					</Col>
					{stats.map(({ icon, title, value }) => (
						<Col className='coin-stats' key={title}>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
				<Col className='other-stats-info'>
					<Col className='coin-value-statistics-heading'>
						<Title level={3} className='coin-details-heading'>
							Other Statistics
						</Title>
						<p>An overview showing the stats of all cryptocurrencies</p>
					</Col>
					{genericStats.map(({ icon, title, value }) => (
						<Col className='coin-stats' key={title}>
							<Col className='coin-stats-name'>
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className='stats'>{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			{cryptoDetails && (
				<Col className='coin-desc-link'>
					<Row className='coin-desc'>
						<Title level={3} className='coin-details-heading'>
							What is {cryptoDetails?.name}
							{HTMLReactParser(cryptoDetails?.description)}
						</Title>
					</Row>
					<Col className='coin-links'>
						<Title level={3} className='coin-details-heading'>
							{cryptoDetails.name} Links
						</Title>
						{cryptoDetails.links.map(item => (
							<Row className='coin-link' key={item.name}>
								<Title level={5} className='link-name'>
									{item.type}
								</Title>
								<a href={item.url} target='_blank' rel='noreferrer'>
									{item.name}
								</a>
							</Row>
						))}
					</Col>
				</Col>
			)}
		</Col>
	)
}

export default CryptoDetails
