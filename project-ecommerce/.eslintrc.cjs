module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"react/react-in-jsx-scope": "off",
		"no-unused-vars": "off",
		"react/no-unescaped-entities": "off",
		"no-mixed-spaces-and-tabs": "off",
		"react/prop-types": "off",
	},
};
