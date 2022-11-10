import { lazy, Suspense, useEffect, useState } from 'react';
import sleep from '../sleep.js';

/**
 * @typedef LoaderDefaultOptions
 * @property {number} delay
 * @property {number} minimumLoading
 */

/**
 * @typedef {import('react').ComponentType} ComponentType
 * @typedef {()  => Promise<ComponentType>} LoadComponent
 */

/**
 *
 * @param {import('react').FC} Fallback
 * @param {number} delay
 * @returns {function(*): JSX.Element|null}
 */
function getDelayedFallback(Fallback, delay = 0) {
	return function DelayedFallback(props) {
		const [isDelayPassed, setIsDelayPassed] = useState(false);

		useEffect(() => {
			const timerId = setTimeout(() => setIsDelayPassed(true), delay);

			return () => clearTimeout(timerId);
		}, []);

		return isDelayPassed ? <Fallback {...props} /> : null;
	};
}

/**
 *
 * @param {LoadComponent} loadComponent
 * @param {LoaderDefaultOptions} loaderOptions
 * @returns {React.LazyExoticComponent<React.ComponentType<any>>}
 */
const getLazyComponent = (loadComponent, loaderOptions) =>
	lazy(() => {
		const start = performance.now();
		return loadComponent().then((moduleExports) => {
			const end = performance.now();
			const diff = end - start;

			const { delay, minimumLoading } = loaderOptions;

			if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
				return moduleExports;
			}
			return sleep(delay + minimumLoading - diff).then(() => moduleExports);
		});
	});

/**
 *
 * @param {LoadComponent} loadComponent
 * @param {*} [additionalProps]
 * @param {LoaderDefaultOptions} [loaderOptions]
 * @param {import('react').FC} [FallbackWaiting]
 * @returns {function(*)}
 */
function asyncComponentLoader(
	loadComponent,
	additionalProps,
	loaderOptions,
	FallbackWaiting,
) {
	const Fallback = loaderOptions?.delay
		? getDelayedFallback(FallbackWaiting, loaderOptions.delay)
		: FallbackWaiting;

	const LazyComponent = getLazyComponent(loadComponent, loaderOptions);

	return function AsyncComponent(props) {
		return (
			<Suspense fallback={<Fallback />}>
				<LazyComponent {...additionalProps} {...props} />
			</Suspense>
		);
	};
}

export { getDelayedFallback };

export default asyncComponentLoader;
