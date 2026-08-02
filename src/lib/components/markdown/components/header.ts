import type { Component, ComponentProps } from "svelte";
import { withProps } from "$lib/utils/svelte";
import ProseHeader from "./ProseHeader.svelte";

type HeaderComponent = Component<
	Omit<ComponentProps<typeof ProseHeader>, "level">
>;

const headers = Object.fromEntries(
	[1, 2, 3, 4, 5, 6].map((tag) => [
		tag,
		withProps(ProseHeader, { tag: tag.toString() }),
	]),
) as Record<string, HeaderComponent>;

export { headers };
