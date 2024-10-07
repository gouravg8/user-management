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
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(-10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-in-out",
			},
		},
	},
	plugins: [],
};
