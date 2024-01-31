<script lang="ts">
	import { title } from '$lib/stores/title.js';
	import dayjs from 'dayjs';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;

	title.set(data.meta.title);
</script>

<MetaTags
	title="{data.meta.title} // blog"
	description={data.meta.description}
	openGraph={{
		title: `${data.meta.title} // blog`,
		description: data.meta.description,
		type: 'article'
	}}
/>

<article class="flex flex-col gap-3 mt-5 w-full">
	<hgroup class="flex flex-col my-3 gap-3">
		<h1 class="text-5xl font-extrabold">{data.meta.title}</h1>
		<p class="text-lg mt-1.5 text-wrap">{data.meta.description}</p>
		<p class="text-sm mt-1.5">
			Published on <span class="font-semibold italic"
				>{dayjs.unix(data.meta.timestamp).format('MMM DD, YYYY')}</span
			>
		</p>
	</hgroup>

	<div class="divider"></div>

	<div class="prose mb-6">
		<svelte:component this={data.content} />
	</div>
</article>
