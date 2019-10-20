import React from 'react';
import { _AutoComplete as AutoComplete } from '@aragon/ui';
import { func } from 'prop-types';
import { COINBASE_API_URL } from '../../constants';

const CurrencyDropdown = ({ onChange }) => {
	const [currencies, setCurrencies] = React.useState([]);
	const [exhangeRates, setExchangeRates] = React.useState(null);

	const [error, setError] = React.useState(false);

	const [searchTerm, setSearchTerm] = React.useState(null);
	const ref = React.useRef();

	React.useEffect(() => {
		fetch(`${COINBASE_API_URL}/currencies`)
			.then(res => res.json())
			.then(({ data }) => {
				setCurrencies(data);
				ref.current.value = 'United States Dollar';
			})
			.catch(() => {
				setError(true);
			});
		fetch(`${COINBASE_API_URL}/exchange-rates?currency=ETH`)
			.then(res => res.json())
			.then(({ data: { rates } }) => {
				setExchangeRates(rates);
				if (onChange) {
					onChange({ rate: rates.USD, suffix: 'USD' });
				}
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	if (error || !currencies.length) {
		return null;
	}

	return (
		<AutoComplete
			items={currencies
				.map(item => item.name)
				.filter(
					name => searchTerm && name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
				)}
			onChange={setSearchTerm}
			onSelect={value => {
				ref.current.value = value;
				setSearchTerm(null);
				if (onChange) {
					const selectedDropdownCurrency = currencies.find(item => item.name === value);
					onChange({
						rate: exhangeRates[selectedDropdownCurrency.id],
						suffix: selectedDropdownCurrency.id,
					});
				}
			}}
			ref={ref}
			placeholder="Search Currency"
		/>
	);
};

CurrencyDropdown.defaultProps = {
	onChange: null,
};

CurrencyDropdown.propTypes = {
	onChange: func,
};

export default CurrencyDropdown;
