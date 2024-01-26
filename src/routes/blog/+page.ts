import type { BlogPost } from '$lib/types/blog';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/posts');
	const posts: BlogPost[] = await res.json();
	return { posts };
};
