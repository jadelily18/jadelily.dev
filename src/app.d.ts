import "@poppanator/sveltekit-svg/dist/svg.d.ts";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare const __GIT_COMMIT_SHA__: string;
	declare const __GIT_BRANCH__: string;
}

export {};
