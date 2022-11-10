import { ErrorBoundary } from 'react-error-boundary';
import SnackbarUtils from '../utils/notify.jsx';

/**
 * @typedef {import('react').FC} FC
 * @typedef {import('react-error-boundary').FallbackProps} FallbackProps
 */

/**
 * Get display name
 *
 *
 * @param  {FC} WrappedComponent
 * @returns {*|string}
 */
function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * HOC Error Boundary
 *
 * @param {FC} Component
 * @param {FC<FallbackProps>} Fallback
 * @returns {function(*)}
 */
function withErrorHandler(Component, Fallback) {
	function ComponentWithErrorHandling(props) {
		return (
			<ErrorBoundary FallbackComponent={Fallback}>
				<Component {...props} />
			</ErrorBoundary>
		);
	}

	ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
		Component,
	)}`;

	return ComponentWithErrorHandling;
}

const handleError = (error) => {
	if (typeof error === 'string') {
		SnackbarUtils.error(error || 'Connection is lost!');
	}
	if (Object.keys(error).includes('response')) {
		return handleError(error?.response);
	}
	if (Object.keys(error).includes('data')) {
		return handleError(error?.data);
	}
	if (Object.keys(error).includes('errors')) {
		return Object.values(error.errors).map((item) => handleError(item));
	}
	if (Object.keys(error).includes('detail')) {
		SnackbarUtils.error(error.detail);
	}
};
export { withErrorHandler, handleError };
