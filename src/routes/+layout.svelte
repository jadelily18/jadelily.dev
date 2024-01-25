<script lang="ts">
	import '../app.css';

	import { MetaTags } from 'svelte-meta-tags';

	import { darkMode } from '$lib/stores/theme';
	import { title } from '$lib/stores/title';

	import { Footer, Navbar } from '$lib/components/layout';
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<MetaTags
	title={$title}
	openGraph={{
		url: 'https://jadelily.dev',
		siteName: 'jadelily.dev',
		images: [
			{
				url: 'https://avatars.githubusercontent.com/u/74706690?v=4',
				alt: "Jade's GitHub avatar"
			}
		]
	}}
	additionalMetaTags={[
		{
			name: 'theme-color',
			content: '#f5c2e7'
		}
	]}
/>

<div class={$darkMode ? 'dark' : 'light'}>
	<div
		class="
			flex flex-col w-screen min-h-screen py-4 px-6 md:px-24 transition-colors duration-500
			text-zinc-900 dark:text-gray-200 bg-gray-200 dark:bg-zinc-900
		"
	>
		<Navbar />
		<div class="flex grow">
			<slot />
		</div>
		<Footer />
	</div>
</div>
