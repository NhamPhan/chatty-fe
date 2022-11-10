import { Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';
import routes from '..';
import Meta from '@components/Meta';
import { ProtectedRoute } from './ProtectedRoute';

function Pages() {
	return (
		<Box>
			<Routes>
				{Object.values(routes).map(
					({ path, component: Component, icon, protect, ...rest }) => {
						const element = (
							<>
								<Meta {...rest} image={icon} />
								<Component />
							</>
						);
						const protector = protect ? (
							<ProtectedRoute element={element} />
						) : (
							element
						);
						return <Route key={path} path={path} element={protector} />;
					},
				)}
			</Routes>
		</Box>
	);
}

export default Pages;
