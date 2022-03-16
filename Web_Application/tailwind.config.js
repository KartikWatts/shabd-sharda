module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			width: {
				88: "24rem",
				128: "32rem",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
	variants: {
		scrollbar: ["rounded"],
	},
};
