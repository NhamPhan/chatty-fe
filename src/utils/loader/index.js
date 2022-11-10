import asyncComponentLoader from './loader';
import { loader as loaderDefaultOptions } from '@configs';
import Loading from '@components/Loading';

const configuredAsyncComponentLoader = (
	loadComponent,
	additionalProps = {},
	loaderOptions = loaderDefaultOptions,
	FallbackWaiting = Loading,
) =>
	asyncComponentLoader(
		loadComponent,
		additionalProps,
		loaderOptions,
		FallbackWaiting,
	);

export default configuredAsyncComponentLoader;
export { loader as loaderDefaultOptions } from '@configs';
