/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#F15025",
				cblack: "#191919",
				platinum: "#E6E8E6",
				cgray: "#CED0CE",
			},
		},
	},
	plugins: [],
};
