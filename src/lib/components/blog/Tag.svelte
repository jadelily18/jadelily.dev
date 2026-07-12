<script lang="ts">
	import { HashIcon } from "@lucide/svelte";
	import { Badge, type BadgeVariant } from "@uilib/badge";

	type Props = {
		name: string;
		variant?: BadgeVariant;
	};

	let { name, variant = "default", ...restProps }: Props = $props();
</script>

<!-- TODO: filter -->
<a href="/#">
	<Badge class="flex items-center gap-0" {...restProps}>
		<HashIcon size="14" />
		{name}
	</Badge>
</a>
