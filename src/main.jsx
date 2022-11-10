import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import welcome from './utils/welcome';

Promise.all([import('./Root'), import('./App')]).then(
	([{ default: render }, { default: App }]) => {
		render(App);
	},
);

// welcome message for users in the console
welcome();

// ts(1208)
export {};
