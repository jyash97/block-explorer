import React from 'react';
import { AppBar, Main } from '@aragon/ui';
import { withRouter } from 'react-router-dom';
import { node, object } from 'prop-types';
import styled from 'styled-components';

import { AppContainer } from '../../styles';

const StyledNavbar = styled.div`
	> div::after {
		border: 0;
	}
`;

const Container = ({ children, history }) => {
	return (
		<Main assetsUrl="/aragon-ui/">
			<StyledNavbar>
				<AppBar title="Block Explorer" onTitleClick={() => history.push('/')} />
			</StyledNavbar>
			<AppContainer>{children}</AppContainer>
		</Main>
	);
};

Container.propTypes = {
	children: node.isRequired,
	history: object.isRequired,
};

export default withRouter(Container);
