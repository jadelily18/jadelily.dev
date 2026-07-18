<script lang="ts">
	type Props = {
		title: string;
		titleMeta?: string;
		author?: string;
		description?: string;
		type?: "website" | "article.content";
		image?: string;
		publishedTime?: string;
	};

	let {
		title,
		titleMeta = title,
		author,
		description,
		type = "website",
		image,
		publishedTime,
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={titleMeta} />
	<meta property="twitter:title" content={titleMeta} />
	<meta property="og:type" content={type} />
	<meta name="theme-color" content="#F3A9D5" />

	{#if author}
		<meta name="author" content={author} />
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta property="twitter:description" content={description} />
	{/if}

	{#if image}
		<meta property="og:image" content={image} />
		<meta property="twitter:image" content={image} />
	{/if}

	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
</svelte:head>
