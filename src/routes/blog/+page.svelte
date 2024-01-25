<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	import { title } from '$lib/stores/title';

	let pageTitle = 'blog';

	title.set(pageTitle);
</script>

<MetaTags
	title={pageTitle}
	description="Jade's blog!"
	openGraph={{
		title: pageTitle,
		description: "Jade's blog!"
	}}
/>
