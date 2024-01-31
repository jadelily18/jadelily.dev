import { writable } from 'svelte/store';

function createTitle() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (value: string) => {
			set(`${value} // jadelily.dev`);
		},
		clear: () => {
			set(`jadelily.dev`);
		}
	};
}

export const title = createTitle();
