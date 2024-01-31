import { json } from '@sveltejs/kit';
import type { BlogPost } from '$lib/types/blog';

async function getPosts() {
	let posts: BlogPost[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '').replace('.svx', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<BlogPost, 'slug'>;
			const post = { ...metadata, slug } satisfies BlogPost;
			post.published && posts.push(post);
		}
	}

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
