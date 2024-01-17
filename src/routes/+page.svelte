<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';

	title.set('home');
</script>

<MetaTags
	title={$title}
	description="Hi, I'm Jade! I'm a software developer working on lots of cool open source projects!"
	openGraph={{
		url: 'https://jadelily.dev',
		title: $title,
		description:
			"Hi, I'm Jade! I'm a software developer working on lots of cool open source projects!",
		siteName: 'jadelily.dev'
	}}
	additionalMetaTags={[
		{
			name: 'theme-color',
			content: '#f5c2e7'
		}
	]}
/>

<div class="flex flex-col w-full place-items-center place-self-center">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
