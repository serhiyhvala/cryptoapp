import { Col, Row, Statistic, Typography } from 'antd'
import millify from 'millify'
import { Link } from 'react-router-dom'

import { useGetCryptosQuery } from '../services/cryptoApi'

import Cryptocurrencies from './Cryptocurrencies'

const { Title } = Typography

const Homepage = () => {
	const { data } = useGetCryptosQuery('/coins')
	const globalStats = data?.data?.stats
	return (
		<>
			<Title level={2} className='heading'>
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title='Total Crypto Currencies'
						value={globalStats?.total}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total Exchanges'
						value={globalStats?.totalExchanges}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total Market Cap'
						value={globalStats ? millify(+globalStats?.totalMarketCap) : ''}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title='Total 24h Volume'
						value={globalStats ? millify(+globalStats?.total24hVolume) : ''}
					/>
				</Col>
				<Col span={12}>
					<Statistic title='Total Markets' value={globalStats?.totalMarkets} />
				</Col>
			</Row>
			<div className='home-heading-container'>
				<Title level={2} className='home-title'>
					Top 10 Cryptocurrencies in the world
				</Title>
				<Title level={3} className='show-more'>
					<Link to='/cryptocurrencies'>Show More</Link>
				</Title>
			</div>
			<Cryptocurrencies simplifed/>
			<div className='home-heading-container'>
				<Title level={2} className='home-title'>
					Lates Crypto News
				</Title>
				<Title level={3} className='show-more'>
					<Link to='/news'>Show More</Link>
				</Title>
			</div>
		</>
	)
}

export default Homepage
