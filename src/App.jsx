import React from 'react';
import {
	createTheme,
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider,
} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Pages from './routes/Pages';
import { handleError, withErrorHandler } from './error-handling';
import AppErrorBoundaryFallback from './error-handling/fallbacks/App';
import themes from './themes';
import useTheme from './store/theme';
import { Notification } from '@sections';

const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError: handleError,
		},
		queries: {
			onError: handleError,
		},
	},
});

function App() {
	const [mode] = useTheme();
	const theme = React.useMemo(() => createTheme(themes({ mode })), [mode]);

	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<PerfectScrollbar>
						<CssBaseline />
						<Notification />
						<BrowserRouter>
							<Pages />
						</BrowserRouter>
					</PerfectScrollbar>
				</ThemeProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
