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
				primary: '#ea76cb',
				'primary-hover': '#f27ed3'
			},
			dark: {
				primary: '#f9a8d4',
				'primary-hover': '#f7b0d7'
			}
		})
	]
};
