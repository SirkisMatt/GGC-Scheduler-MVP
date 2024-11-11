import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
	content: [
		"./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
	  ],
  theme: {
	extend: {
		colors: {
		  primary: 'hsl(222.2, 47.4%, 11.2%)',
		  'primary-foreground': 'hsl(210, 40%, 98%)',
		  // Add other colors as needed
		},
		spacing: {
		  '128': '32rem',
		  '144': '36rem',
		},
		borderRadius: {
		  '4xl': '2rem',
		},
	  },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
