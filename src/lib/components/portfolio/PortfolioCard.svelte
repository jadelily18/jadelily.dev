<script lang="ts">
	import { Image, Link } from 'lucide-svelte';
	import StatusBadge from './StatusBadge.svelte';
	import { Github, Modrinth } from '@lilydev/ui';

	export let img: string | undefined = undefined;
	export let imgAlt: string | undefined = undefined;

	export let active: boolean = true;

	export let projectLink: string | undefined = undefined;
	export let modrinthUrl: string | undefined = undefined;
	export let githubUrl: string | undefined = undefined;
</script>

<div class="card w-full flex flex-col sm:flex-row gap-3 px-3 py-3.5 h-fit sm:h-[175px]">
	{#if img}
		<div>
			<img
				class="w-full sm:w-[260px] h-[260px] sm:h-full object-cover rounded-lg shadow-sm"
				src={img}
				alt={imgAlt}
			/>
		</div>
	{:else}
		<div
			class="w-full sm:w-[260px] h-[260px] sm:h-full rounded-lg flex justify-center place-items-center variant-filled-surface bg-surface-200 shadow-sm"
		>
			<Image size="50" class="text-surface-400" />
		</div>
	{/if}
	<div class="flex flex-col w-full gap-2 sm:gap-1">
		<div class="flex justify-between place-items-start">
			<div class="text-xl font-semibold mr-2"><slot name="header" /></div>
			<StatusBadge {active} />
		</div>
		<div class="grow"><slot /></div>
		{#if modrinthUrl || githubUrl}
			<div class="flex place-self-end gap-2">
				{#if projectLink}
					<a class="btn-icon btn-icon-sm hover:variant-filled-surface" href={projectLink}
						><Link /></a
					>
				{/if}
				{#if githubUrl}
					<a class="btn-icon btn-icon-sm hover:variant-filled-surface" href={githubUrl}
						><Github /></a
					>
				{/if}
				{#if modrinthUrl}
					<a class="btn-icon btn-icon-sm hover:variant-filled-surface" href={modrinthUrl}
						><Modrinth /></a
					>
				{/if}
			</div>
		{/if}
	</div>
</div>
