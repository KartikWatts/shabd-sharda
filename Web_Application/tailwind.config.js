module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			width: {
				18: "4.5rem",
				88: "24rem",
				128: "32rem",
			},
			height: {
				18: "4.5rem",
			},
			scale: {
				60: ".60",
			},
			gap: {
				0.75: "3px",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
	variants: {
		scrollbar: ["rounded"],
	},
};
