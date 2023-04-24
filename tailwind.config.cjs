/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				lato: ['Lato', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
				lexend: ['Lexend', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": '#ffffff',

					"secondary": '#e5e5e5',

					"accent": '#C58FFF',

					"neutral": '#14213d',

					'base-100': '#000000',

					"info": '#8BE9FD',

					"success": '#50FA7B',

					"warning": '#F1FA8C',

					"error": '#FF5555'
				}
			}
		]
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/line-clamp'),
		require('vidstack/tailwind.cjs')
	]
};
