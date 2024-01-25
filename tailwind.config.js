import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@lilydev/ui/**/*.{html,js,svelte,ts}'
	],

	darkMode: 'class',

	theme: {
		extend: {}
	},

	plugins: [
		createThemes({
			light: {
				primary: '#ea76cb'
			},
			dark: {
				primary: '#f9a8d4'
			}
		})
	]
};
