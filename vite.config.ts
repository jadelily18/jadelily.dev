import adapter from "@sveltejs/adapter-auto";

import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import svg from "@poppanator/sveltekit-svg";

import { defineConfig } from "vite";

import { execSync } from "child_process";

function gitInfo(cmd: string, fallback = "unknown") {
	try {
		return execSync(cmd).toString().trim();
	} catch {
		return fallback;
	}
}

const commitSha = gitInfo("git rev-parse HEAD");
const branch = gitInfo("git rev-parse --abbrev-ref HEAD");

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules")
						? undefined
						: true,
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			alias: {
				"@uilib": "src/lib/shadcn/components/ui",
				"@components": "src/lib/components",
				$types: "src/lib/types",
			},
		}),
		svg({ includePaths: ["./src/lib/assets/icons"] }),
	],
	define: {
		__GIT_COMMIT_SHA__: JSON.stringify(commitSha),
		__GIT_BRANCH__: JSON.stringify(branch),
	},
});
