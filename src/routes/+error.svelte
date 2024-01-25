<script lang="ts">
	import { page } from '$app/stores';
	import { title } from '$lib/stores/title';

	title.set('error');
</script>

<div class="flex flex-col w-full place-items-center place-self-center gap-2">
	{#if $page.status === 404}
		<p
			class="text-2xl font-mono bg-zinc-300 dark:bg-zinc-800 py-2 px-3 rounded-lg mb-1 transition-colors duration-500"
		>
			{$page.url.pathname}
		</p>
	{/if}
	<p class="text-4xl">
		<span class="font-bold">{$page.status}: </span>{$page.error?.message}
	</p>
	{#if $page.status === 404}
		<p>
			Wrong page... take a look at my <a class="link" href="/blog">blog</a> instead!
		</p>
	{/if}
</div>
