import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		extend: {}
	},

	plugins: [
		createThemes({
			light: {
				//
			},
			dark: {
				primary: '#f0a6ff'
			}
		})
	]
};
