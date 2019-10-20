import React from 'react';
import { TransactionBadge, IdentityBadge, TableRow, TableCell, theme, Badge } from '@aragon/ui';
import { string, object } from 'prop-types';
import Web3Context from '../Web3Context';
import { ETHER_TO_WEI } from '../../constants';

const Transaction = ({ hash, currency }) => {
	const instance = React.useContext(Web3Context);
	const [loading, setLoading] = React.useState(true);
	const [transaction, setTransaction] = React.useState(null);

	React.useEffect(() => {
		const a = instance.eth.getTransaction(hash);
		const b = instance.eth.getTransactionReceipt(hash);
		Promise.all([a, b]).then(([info, receipt]) => {
			setTransaction({ ...info, ...receipt });
			setLoading(false);
		});
	}, [hash]);

	if (loading) {
		return (
			<TableRow>
				<TableCell>Loading</TableCell>
			</TableRow>
		);
	}

	return (
		<TableRow>
			<TableCell>
				<TransactionBadge transaction={transaction.hash} />
			</TableCell>
			<TableCell>
				<IdentityBadge entity={transaction.from} />
			</TableCell>
			<TableCell>
				<IdentityBadge entity={transaction.to} />
			</TableCell>
			<TableCell>
				<Badge
					background={transaction.status ? theme.positive : theme.negative}
					foreground={transaction.status ? theme.positiveText : theme.negativeText}
				>
					{transaction.status ? 'Success' : 'Unsuccessful'}
				</Badge>
			</TableCell>
			<TableCell>{(transaction.gasUsed * transaction.gasPrice) / ETHER_TO_WEI}</TableCell>
			<TableCell>{transaction.value / ETHER_TO_WEI}</TableCell>
			<TableCell>
				{currency
					? `${((transaction.value / ETHER_TO_WEI) * currency.rate).toFixed(2)} ${
							currency.suffix
					  }`
					: '-'}
			</TableCell>
		</TableRow>
	);
};

Transaction.defaultProps = {
	currency: null,
};

Transaction.propTypes = {
	hash: string.isRequired,
	currency: object,
};

export default Transaction;
