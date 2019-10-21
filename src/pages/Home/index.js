import React from 'react';
import { Table, DropDown, TextInput, Text } from '@aragon/ui';
import Web3Context from '../../components/Web3Context';
import Block from '../../components/Row/Block';
import { BLOCK_SIZES } from '../../constants';
import Header from '../../components/Block/BlockHeader';
import { Flex } from '../../styles';

const Home = () => {
	const instance = React.useContext(Web3Context);
	const [blockSizeIndex, changeSizeIndex] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [blocks, setBlocks] = React.useState([]);
	const [interval, changeInterval] = React.useState(60000);

	const fetchNewBlocks = () => {
		setLoading(true);
		instance.eth.getBlockNumber((_, number) => {
			if (number) {
				setBlocks(
					[...Array(BLOCK_SIZES[blockSizeIndex]).keys()].map(index => number - index),
				);
			} else {
				setError('No block Number returned in the API. It can be due to Browser.');
			}
			setLoading(false);
		});
	};

	React.useEffect(() => {
		if (!blocks.length) {
			fetchNewBlocks();
		}

		const intervalId = setInterval(() => {
			fetchNewBlocks();
		}, interval);

		return () => {
			clearInterval(intervalId);
		};
	}, [blockSizeIndex, interval]);

	const handleDropdownChange = item => {
		changeSizeIndex(item);
	};

	const handleInterval = e => {
		changeInterval(e.target.value);
	};

	if (loading) {
		return <Text>Loading..</Text>;
	}

	if (error) {
		return <Text>{error}</Text>;
	}

	return (
		<React.Fragment>
			<Flex>
				<div>
					<Text style={{ display: 'block' }}>Items to Show</Text>
					<DropDown
						items={BLOCK_SIZES}
						active={blockSizeIndex}
						onChange={handleDropdownChange}
					/>
				</div>
				<div>
					<Text style={{ display: 'block' }}>Re-fetch data Interval (in ms)</Text>
					<TextInput
						type="number"
						min={6000}
						value={interval}
						onChange={handleInterval}
					/>
				</div>
			</Flex>
			<Table header={Header}>
				{blocks.map(blockNumber => (
					<Block number={blockNumber} key={blockNumber} />
				))}
			</Table>
		</React.Fragment>
	);
};

export default Home;
