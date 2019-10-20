import React from 'react';
import { TableHeader, TableRow } from '@aragon/ui';

const Header = (
	<TableRow>
		<TableHeader title="Block" />
		<TableHeader title="Transactions" />
		<TableHeader title="Mined By" />
		<TableHeader title="Gas Limit" />
		<TableHeader title="Gas used" />
		<TableHeader title="Timestamp" />
	</TableRow>
);

export default Header;
