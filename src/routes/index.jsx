import { Home, Lock, SupervisorAccount } from '@mui/icons-material';
import asyncComponentLoader from '@utils/loader';

/**
 * @typedef PathRouteCustomProps
 * @property {string} [title]
 * @property {boolean} [protect]
 * @property {import("react").FC<SvgIconProps>} [icon]
 * @property {import("react").FC} component
 */

/**
 * @typedef {(Welcome|NotFound)} Pages
 * @typedef {Record<Pages, import("react-router-dom").PathRouteProps & PathRouteCustomProps>} Route
 */

/**
 * Page routes
 *
 * @type {Route}
 */
const routes = {
	Welcome: {
		component: asyncComponentLoader(() => import('../pages/Welcome/Welcome')),
		path: '/',
		title: 'Welcome',
		icon: Home,
		protect: true,
	},
	MessagesEmpty: {
		component: asyncComponentLoader(() => import('../pages/Messages/Messages')),
		path: '/t',
		title: 'Inbox',
		protect: true,
	},
	Messages: {
		component: asyncComponentLoader(() => import('../pages/Messages/Messages')),
		path: '/t/:id',
		title: 'Inbox',
		protect: true,
	},
	Login: {
		component: asyncComponentLoader(() => import('../pages/Login/Login')),
		path: '/login',
		title: 'Login',
		icon: Lock,
		protect: false,
	},
	Register: {
		component: asyncComponentLoader(() => import('../pages/Register/Register')),
		path: '/register',
		title: 'Register',
		icon: SupervisorAccount,
		protect: false,
	},
	ActivateAccount: {
		component: asyncComponentLoader(() =>
			import('../pages/AccountActivation/AccountActivation'),
		),
		path: '/activate/:uid/:token',
		title: 'Account Activation',
		icon: SupervisorAccount,
		protect: false,
	},
	NotFound: {
		component: asyncComponentLoader(() => import('../pages/NotFound/NotFound')),
		path: '*',
		title: 'Not Found',
		protect: false,
	},
};

export default routes;
