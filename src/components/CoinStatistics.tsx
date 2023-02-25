import { Col, Row, Typography } from 'antd'
import { FC } from 'react'

import { CoinHistory } from '../services/cryptoApi.types'

const { Title } = Typography

export interface ICoinStatistics {
	coinHistory?: CoinHistory
	currentPrice?: string
	coinName?: string
}

const CoinStatistics: FC<ICoinStatistics> = ({
	coinHistory,
	currentPrice,
	coinName
}) => {
	return (
		<>
			<Row className='chart-header'>
				<Title level={2} className='chart-title'>
					{coinName}
				</Title>
				<Col className='price-container'>
					<Title level={5} className='price-change'>
						{coinHistory?.data?.change}%
					</Title>
					<Title level={5} className='current-price'>
						Current {coinName} Price: ${currentPrice}
					</Title>
				</Col>
			</Row>
		</>
	)
}

export default CoinStatistics
