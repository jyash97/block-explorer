import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Web3 from 'web3';

import Container from './components/Container';
import Web3Context from './components/Web3Context';

const Home = React.lazy(() => import('./pages/Home'));
const BlockPage = React.lazy(() => import('./pages/Block'));

const App = () => {
	const web3Instance = new Web3(Web3.givenProvider || process.env.INFURA_URL);
	return (
		<Router>
			<Container>
				<React.Suspense fallback="Loading...">
					<Web3Context.Provider value={web3Instance}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/block/:id" component={BlockPage} />
						</Switch>
					</Web3Context.Provider>
				</React.Suspense>
			</Container>
		</Router>
	);
};

export default App;
