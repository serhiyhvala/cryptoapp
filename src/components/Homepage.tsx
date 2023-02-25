import { Col, Row, Statistic, Typography } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

import millify from 'millify'

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
					<Statistic title='Total Crypto Currencies' value={globalStats?.total} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Exchanges' value={globalStats?.totalExchanges} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Market Cap' value={globalStats ? millify(+globalStats?.totalMarketCap) : ''} />
				</Col>
				<Col span={12}>
					<Statistic title='Total 24h Volume' value={globalStats ? millify(+globalStats?.total24hVolume) : ''} />
				</Col>
				<Col span={12}>
					<Statistic title='Total Markets' value={globalStats?.totalMarkets} />
				</Col>
			</Row>
		</>
	)
}

export default Homepage
