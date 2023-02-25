import { Layout, Space, Typography } from 'antd'
import { Link, Route, Routes } from 'react-router-dom'

import './App.css'
import { CryptoDetails, Cryptocurrencies, Homepage, Navbar } from './components'

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
							<Route
								path='/cryptocurrencies'
								element={<Cryptocurrencies simplifed={false} />}
							/>
							<Route path='/crypto/:coinId' element={<CryptoDetails />} />
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
