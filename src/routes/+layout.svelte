<script lang="ts">
	import '../app.css';

	import { theme } from '$lib/stores/theme';
	import { title } from '$lib/stores/title';

	import { Footer, Navbar } from '$lib/components/layout';
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<div class={$theme}>
	<div
		class="
			flex flex-col w-screen h-screen py-4 px-6 md:px-24
			text-zinc-900 dark:text-gray-200 bg-gray-100 dark:bg-zinc-900
		"
	>
		<Navbar />
		<div class="flex grow">
			<slot />
		</div>
		<Footer />
	</div>
</div>
