/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('prettier-plugin-svelte'.PluginOptions)} */
export default {
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/routes/layout.css",
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
