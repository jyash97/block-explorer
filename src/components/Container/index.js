import React from 'react';
import { AppBar, Main } from '@aragon/ui';
import { withRouter } from 'react-router-dom';
import { node, object } from 'prop-types';

import { AppContainer } from '../../styles';

const Container = ({ children, history }) => {
	return (
		<Main assetsUrl="/aragon-ui/">
			<AppBar title="Block Explorer" onTitleClick={() => history.push('/')} />
			<AppContainer>{children}</AppContainer>
		</Main>
	);
};

Container.propTypes = {
	children: node.isRequired,
	history: object.isRequired,
};

export default withRouter(Container);
