<script lang="ts">
	import type { Component } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type IconComponent = Component<SVGAttributes<SVGSVGElement>>;

	type Props = {
		icon: IconComponent;
		size?: number | string;
	} & Omit<SVGAttributes<SVGSVGElement>, "width" | "height">;

	let {
		icon: Icon,
		size = 24,
		class: className,
		...restProps
	}: Props = $props();
</script>

<Icon width={size} height={size} class={className} {...restProps} />
