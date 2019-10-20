import React from 'react';
import { TableRow, TableCell } from '@aragon/ui';
import { number as numberType, string } from 'prop-types';

const RowError = ({ number, messageAt, message }) => {
	return (
		<TableRow>
			{[...Array(number).keys()].map(item => (
				<TableCell key={item}>{item === messageAt - 1 ? message : '-'}</TableCell>
			))}
		</TableRow>
	);
};

RowError.defaultProps = {
	messageAt: 0,
	message: '',
};

RowError.propTypes = {
	number: numberType.isRequired,
	messageAt: numberType,
	message: string,
};

export default RowError;
