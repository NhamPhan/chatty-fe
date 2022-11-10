import { Navigate } from 'react-router-dom';
import useAuth from '@store/auth';

export const ProtectedRoute = ({ element }) => {
	const [, { isAuthenticated }] = useAuth();

	const navigate = <Navigate to="/login" replace />;
	return isAuthenticated ? element : navigate;
};
