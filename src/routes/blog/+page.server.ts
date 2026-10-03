import { getPosts } from "$lib/blog";

export function load({ url }) {
	let searchParams = url.searchParams.getAll("tags");

	let posts = getPosts();

	let tags: Record<string, boolean> = {};

	for (const post of posts) {
		for (const tag of post.tags ?? []) {
			tags[tag] = searchParams.includes(tag);
		}
	}

	tags = Object.fromEntries(
		Object.entries(tags).sort((a, b) => a[0].localeCompare(b[0])),
	);

	return { posts, tags };
}
