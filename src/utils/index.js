import { ETHER_TO_WEI } from '../constants';

const getPrice = (gasUsed, gasPrice) => {
	const price = (gasUsed * gasPrice) / ETHER_TO_WEI;
};

const parseCurrencies = data => {
	if (!data.length) {
		return [];
	}
	return data.map(currency => currency.name);
};

export { parseCurrencies };
