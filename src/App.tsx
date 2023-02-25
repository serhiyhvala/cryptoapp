import { Layout, Space, Typography } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'

import './App.css'
import {
	CryptoDetails,
	Cryptocurrencies,
	Exchanges,
	Homepage,
	Navbar,
	News
} from './components'

const App = () => {
	return (
		<div className='app'>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='main'>
				<Layout>
					<div className='routes'>
						<Routes>
							<Route path='/' element={<Homepage />} />
							<Route path='/exchanges' element={<Exchanges />} />
							<Route path='/cryptocurrencies' element={<Cryptocurrencies simplifed={false} />} />
							<Route path='/crypto/:coinId' element={<CryptoDetails />} />
							<Route path='/news' element={<News />} />
						</Routes>
					</div>
				</Layout>
				<div className='footer'>
					<Typography.Title
						level={5}
						style={{ color: 'white', textAlign: 'center' }}
					>
						Cryptoverse <br />
						All rights reserved
					</Typography.Title>
					<Space>
						<Link to='/'>Home</Link>
						<Link to='/exchanges'>Exchanges</Link>
						<Link to='/news'>News</Link>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default App
