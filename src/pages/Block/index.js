import React from 'react';
import { Table, DropDown, TableHeader, TableRow, Text } from '@aragon/ui';
import { object } from 'prop-types';
import Block from '../../components/Row/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import { TRANSACTION_SIZES } from '../../constants';

import CurrencyDropdown from '../../components/CurrencyDropdown';
import { Flex } from '../../styles';

const Transaction = React.lazy(() => import('../../components/Row/Transaction'));

const BlockPage = ({ match }) => {
	const [block, setBlockData] = React.useState(null);
	const [currentSizeIndex, changeSizeIndex] = React.useState(0);
	const [currency, setCurrency] = React.useState(null);

	const setData = data => {
		setBlockData(data);
	};

	const handleTransactionSize = selectedIndex => {
		changeSizeIndex(selectedIndex);
	};

	const handleCurrencyRate = data => {
		setCurrency(data);
	};

	const TransactionHeader = (
		<TableRow>
			<TableHeader title="hash" />
			<TableHeader title="From" />
			<TableHeader title="To" />
			<TableHeader title="Status" />
			<TableHeader title="Fee in Eth" />
			<TableHeader title="Value in Eth" />
			<TableHeader
				title={currency ? `Value in ${currency.suffix}` : 'Value in Local Currency'}
			/>
		</TableRow>
	);

	return (
		<React.Fragment>
			<Table header={BlockHeader}>
				<Block linkToBlock={false} onData={setData} number={+match.params.id} />
			</Table>
			{block && block.transactions && block.transactions.length ? (
				<React.Suspense fallback="Loading Transactions">
					<Text size="xlarge" style={{ margin: '30px 0 10px', display: 'block' }}>
						Transactions
					</Text>
					<Flex>
						<div>
							<Text style={{ display: 'block' }}>Items to Show</Text>
							<DropDown
								items={TRANSACTION_SIZES}
								onChange={handleTransactionSize}
								active={currentSizeIndex}
							/>
						</div>
						<div>
							<Text>Local Currency</Text>
							<CurrencyDropdown onChange={handleCurrencyRate} />
						</div>
					</Flex>

					<Table header={TransactionHeader}>
						{block.transactions
							.slice(0, TRANSACTION_SIZES[currentSizeIndex])
							.map(transaction => (
								<Transaction
									currency={currency}
									key={transaction}
									hash={transaction}
								/>
							))}
					</Table>
				</React.Suspense>
			) : null}
		</React.Fragment>
	);
};

BlockPage.propTypes = {
	match: object.isRequired,
};

export default BlockPage;
