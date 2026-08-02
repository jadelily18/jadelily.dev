/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('prettier-plugin-svelte'.PluginOptions) & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
export default {
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-svelte",
		"prettier-plugin-tailwindcss",
	],
	tailwindStylesheet: "./src/routes/layout.css",
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
	importOrder: ["<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>", "", "^\\$lib/(.*)$", "", "^[./]"],
	importOrderTypeScriptVersion: "5.0.0",
};
