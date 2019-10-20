import React from 'react';
import { TableRow, TableCell, Text, IdentityBadge, ProgressBar, Badge } from '@aragon/ui';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { number as numberType, bool, func } from 'prop-types';
import Web3Context from '../Web3Context';
import RowError from './Error';

const Block = ({ number, onData, linkToBlock }) => {
	const instance = React.useContext(Web3Context);
	const [block, setBlock] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		instance.eth
			.getBlock(number)
			.then(item => {
				setBlock(item);
				if (onData) {
					onData(item);
				}
				setLoading(false);
			})
			.catch(e => {
				setError(e);
				setLoading(false);
			});
	}, [number]);

	if (loading) {
		return (
			<TableRow>
				<TableCell>Loading Row Data....</TableCell>
			</TableRow>
		);
	}

	if (error) {
		return <RowError number={6} message={error.message} messageAt={1} />;
	}

	return (
		<TableRow>
			<TableCell>
				{linkToBlock ? (
					<Link to={`/block/${block.number}`}>{block.number}</Link>
				) : (
					block.number
				)}
			</TableCell>
			<TableCell>
				<Badge>{block.transactions.length}</Badge>
			</TableCell>
			<TableCell>
				<IdentityBadge entity={block.miner} />
			</TableCell>
			<TableCell>
				<Text>{block.gasLimit}</Text>
			</TableCell>
			<TableCell>
				<ProgressBar value={block.gasUsed / block.gasLimit} />
			</TableCell>
			<TableCell>
				<Text>{moment(block.timestamp * 1000).fromNow()}</Text>
			</TableCell>
		</TableRow>
	);
};

Block.defaultProps = {
	linkToBlock: true,
	onData: null,
};

Block.propTypes = {
	number: numberType.isRequired,
	linkToBlock: bool,
	onData: func,
};

export default Block;
