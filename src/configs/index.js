import isMobile from '@utils/is-mobile';

const apiUrl = 'http://localhost:8000/';

const title = 'Chatty';

const email = 'email@email.com';

const messages = {
	app: {
		crash: {
			title: 'Oooops... Sorry, I guess, something went wrong. You can:',
			options: {
				email: `Contact with author by this email - ${email}`,
				reset: 'Press here to reset the application',
			},
		},
	},
	loader: {
		fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
	},
	images: {
		failed: 'Something went wrong during image loading :(',
	},
	404: 'Hey bro? What are you looking for?',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications = {
	options: {
		anchorOrigin: {
			vertical: 'bottom',
			horizontal: 'left',
		},
		autoHideDuration: 6000,
	},
	maxSnack: isMobile ? 3 : 4,
};

const loader = {
	delay: 300,
	minimumLoading: 700,
};

const defaultMetaTags = {
	image: '/logo.png',
	description: 'Messaging web application',
};

const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';
const giphyEmptyChat = 'https://giphy.com/embed/3o6Zteb3kBneWjpkY0';

export {
	loader,
	notifications,
	dateFormat,
	messages,
	email,
	title,
	giphy404,
	defaultMetaTags,
	apiUrl,
	giphyEmptyChat,
};
