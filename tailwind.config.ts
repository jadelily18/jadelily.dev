import { join } from 'path';

import { skeleton } from '@skeletonlabs/tw-plugin';

import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const lilyTheme: CustomThemeConfig = {
	name: 'lily',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #f9a8d4
		'--color-primary-50': '254 242 249', // #fef2f9
		'--color-primary-100': '254 238 246', // #feeef6
		'--color-primary-200': '254 233 244', // #fee9f4
		'--color-primary-300': '253 220 238', // #fddcee
		'--color-primary-400': '251 194 225', // #fbc2e1
		'--color-primary-500': '249 168 212', // #f9a8d4
		'--color-primary-600': '224 151 191', // #e097bf
		'--color-primary-700': '187 126 159', // #bb7e9f
		'--color-primary-800': '149 101 127', // #95657f
		'--color-primary-900': '122 82 104', // #7a5268
		// secondary | #9a53db
		'--color-secondary-50': '240 229 250', // #f0e5fa
		'--color-secondary-100': '235 221 248', // #ebddf8
		'--color-secondary-200': '230 212 246', // #e6d4f6
		'--color-secondary-300': '215 186 241', // #d7baf1
		'--color-secondary-400': '184 135 230', // #b887e6
		'--color-secondary-500': '154 83 219', // #9a53db
		'--color-secondary-600': '139 75 197', // #8b4bc5
		'--color-secondary-700': '116 62 164', // #743ea4
		'--color-secondary-800': '92 50 131', // #5c3283
		'--color-secondary-900': '75 41 107', // #4b296b
		// tertiary | #5397db
		'--color-tertiary-50': '229 239 250', // #e5effa
		'--color-tertiary-100': '221 234 248', // #ddeaf8
		'--color-tertiary-200': '212 229 246', // #d4e5f6
		'--color-tertiary-300': '186 213 241', // #bad5f1
		'--color-tertiary-400': '135 182 230', // #87b6e6
		'--color-tertiary-500': '83 151 219', // #5397db
		'--color-tertiary-600': '75 136 197', // #4b88c5
		'--color-tertiary-700': '62 113 164', // #3e71a4
		'--color-tertiary-800': '50 91 131', // #325b83
		'--color-tertiary-900': '41 74 107', // #294a6b
		// success | #5ad44c
		'--color-success-50': '230 249 228', // #e6f9e4
		'--color-success-100': '222 246 219', // #def6db
		'--color-success-200': '214 244 210', // #d6f4d2
		'--color-success-300': '189 238 183', // #bdeeb7
		'--color-success-400': '140 225 130', // #8ce182
		'--color-success-500': '90 212 76', // #5ad44c
		'--color-success-600': '81 191 68', // #51bf44
		'--color-success-700': '68 159 57', // #449f39
		'--color-success-800': '54 127 46', // #367f2e
		'--color-success-900': '44 104 37', // #2c6825
		// warning | #ffc252
		'--color-warning-50': '255 246 229', // #fff6e5
		'--color-warning-100': '255 243 220', // #fff3dc
		'--color-warning-200': '255 240 212', // #fff0d4
		'--color-warning-300': '255 231 186', // #ffe7ba
		'--color-warning-400': '255 212 134', // #ffd486
		'--color-warning-500': '255 194 82', // #ffc252
		'--color-warning-600': '230 175 74', // #e6af4a
		'--color-warning-700': '191 146 62', // #bf923e
		'--color-warning-800': '153 116 49', // #997431
		'--color-warning-900': '125 95 40', // #7d5f28
		// error | #ff5252
		'--color-error-50': '255 229 229', // #ffe5e5
		'--color-error-100': '255 220 220', // #ffdcdc
		'--color-error-200': '255 212 212', // #ffd4d4
		'--color-error-300': '255 186 186', // #ffbaba
		'--color-error-400': '255 134 134', // #ff8686
		'--color-error-500': '255 82 82', // #ff5252
		'--color-error-600': '230 74 74', // #e64a4a
		'--color-error-700': '191 62 62', // #bf3e3e
		'--color-error-800': '153 49 49', // #993131
		'--color-error-900': '125 40 40', // #7d2828
		// surface | #2b2e40
		'--color-surface-50': '223 224 226', // #dfe0e2
		'--color-surface-100': '213 213 217', // #d5d5d9
		'--color-surface-200': '202 203 207', // #cacbcf
		'--color-surface-300': '170 171 179', // #aaabb3
		'--color-surface-400': '107 109 121', // #6b6d79
		'--color-surface-500': '43 46 64', // #2b2e40
		'--color-surface-600': '39 41 58', // #27293a
		'--color-surface-700': '32 35 48', // #202330
		'--color-surface-800': '26 28 38', // #1a1c26
		'--color-surface-900': '21 23 31' // #15171f
	}
};

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@lilydev/ui/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	darkMode: 'class',

	theme: {
		extend: {}
	},

	plugins: [
		skeleton({
			themes: {
				custom: [lilyTheme]
			}
		})
		// createThemes({
		// 	light: {
		// 		primary: '#c744a4',
		// 		'primary-hover': '#f27ed3',
		// 		'primary-raised': '#c97bb4'
		// 	},
		// 	dark: {
		// 		primary: '#f9a8d4',
		// 		'primary-hover': '#f7b0d7',
		// 		'primary-raised': '#b36d94'
		// 	}
		// })
	]
};
