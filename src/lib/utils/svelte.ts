import type { Component, ComponentProps } from "svelte";

/**
 * Binds a fixed value for one or more props onto a Svelte component, returning
 * a new component with those props removed from its public signature. Useful
 * for generating `Comark`/MDX-style `components` maps where the same
 * component needs to be registered multiple times with a different "variant"
 * prop baked in (e.g. one entry per `AlertType`).
 */
export function withProps<
	TComponent extends Component<any>,
	const K extends keyof ComponentProps<TComponent>,
>(
	component: TComponent,
	preset: Pick<ComponentProps<TComponent>, K>,
): Component<Omit<ComponentProps<TComponent>, K>> {
	const bound: Component<Omit<ComponentProps<TComponent>, K>> = (
		internals,
		props,
	) =>
		component(internals, {
			...props,
			...preset,
		} as ComponentProps<TComponent>);

	return bound;
}
