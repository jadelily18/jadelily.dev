import { browser } from "$app/environment";

export class PersistedState<T> {
	#value = $state() as T;
	#key: string;

	constructor(key: string, initialValue: T) {
		this.#key = key;
		this.#value = initialValue;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) {
				try {
					this.#value = JSON.parse(item);
				} catch {}
			}

			$effect.root(() => {
				$effect(() => {
					localStorage.setItem(
						this.#key,
						JSON.stringify(this.#value),
					);
				});
			});
		}
	}

	get value(): T {
		return this.#value;
	}
	set value(newValue: T) {
		this.#value = newValue;
	}
}
