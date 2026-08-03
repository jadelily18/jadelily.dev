export type ValueSource<T> = { value: T };

export class Draft<T> implements ValueSource<T> {
	#source: ValueSource<T>;
	#pending = $state() as T;

	constructor(source: ValueSource<T>) {
		this.#source = source;
		this.#pending = $state.snapshot(source.value) as T;
	}

	get value(): T {
		return this.#pending;
	}
	set value(newValue: T) {
		this.#pending = newValue;
	}

	get dirty(): boolean {
		return this.#pending !== this.#source.value;
	}

	commit() {
		this.#source.value = $state.snapshot(this.#pending) as T;
	}

	reset() {
		this.#pending = $state.snapshot(this.#source.value) as T;
	}
}

type ValuesOf<T extends Record<string, ValueSource<unknown>>> = {
	[K in keyof T]: T[K] extends ValueSource<infer V> ? V : never;
};

/** Wraps every source in a group in its own `Draft`. */
export function draftsOf<T extends Record<string, ValueSource<unknown>>>(
	sources: T,
): { [K in keyof T]: Draft<T[K] extends ValueSource<infer V> ? V : never> } {
	return Object.fromEntries(
		Object.entries(sources).map(([key, source]) => [
			key,
			new Draft(source),
		]),
	) as never;
}

/** Flattens a group of sources into a plain object of get/set properties over their `.value`. */
export function accessorsOf<T extends Record<string, ValueSource<unknown>>>(
	sources: T,
): ValuesOf<T> {
	const accessors = {} as ValuesOf<T>;
	for (const key of Object.keys(sources) as (keyof T)[]) {
		Object.defineProperty(accessors, key, {
			get: () => sources[key].value,
			set: (value) => {
				sources[key].value = value;
			},
			enumerable: true,
		});
	}
	return accessors;
}
