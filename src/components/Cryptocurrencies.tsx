import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetCryptosByLimitQuery } from '../services/cryptoApi'

export interface ICryptocurrenciesProps {
	simplifed: boolean
}

const Cryptocurrencies: FC<ICryptocurrenciesProps> = ({ simplifed }) => {
	const count = simplifed ? 10 : 500
	const { data: cryptosList } = useGetCryptosByLimitQuery(count)
	const [cryptos, setCryptos] = useState(cryptosList?.data.coins)
	const [searchTerm, setSearchTerm] = useState('')
	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter(item =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setCryptos(filteredData)
	}, [cryptosList, searchTerm])
	return (
		<>
			{!simplifed && (
				<div className='search-crypto'>
					<Input
						placeholder='Search Crypto Currency'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[32, 32]} className='crypto-card-container'>
				{cryptos?.map(item => (
					<Col xs={24} sm={12} lg={6} className='crypto-card' key={item.uuid}>
						<Link to={`/crypto/${item.uuid}`}>
							<Card
								title={`${item.rank}. ${item.name}`}
								extra={
									<img
										className='crypto-image'
										src={item.iconUrl}
										alt={item.name}
									/>
								}
								hoverable
							>
								<p>Price: {millify(+item.price)}</p>
								<p>Market Cap: {millify(+item.marketCap)}</p>
								<p>Daily Change: {millify(+item.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Cryptocurrencies
