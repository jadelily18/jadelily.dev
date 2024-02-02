<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';

	export let post: BlogPost;

	const popupSettings: PopupSettings = {
		event: 'hover',
		target: `${post.slug}Popup`,
		placement: 'top'
	};
</script>

<div class="card p-2 z-10" data-popup="{post.slug}Popup">
	<p>{dayjs.unix(post.timestamp).format('MMM DD, YYYY h:ma')}</p>
</div>

<a class="card card-hover flex flex-col w-full p-3 gap-2" href="/blog/{post.slug}">
	<div class="flex justify-between place-items-center w-full">
		<p class="text-xl font-semibold">{post.title}</p>
		<p use:popup={popupSettings}>{dayjs.unix(post.timestamp).format('MMM DD, YYYY')}</p>
	</div>
	<p>{post.description}</p>
	<div class="flex gap-2 mt-0.5">
		{#each post.tags as tag}
			<a class="badge variant-ghost-primary" href="?categories=[{tag}]">#{tag}</a>
		{/each}
	</div>
</a>
