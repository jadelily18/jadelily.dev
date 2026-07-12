import type { Post } from "$types/blog";
import matter from "gray-matter";

function getPost(slug: string): Post | undefined {
	return getPosts().find((p) => p.slug === slug);
}

function getPosts(): Post[] {
	const files = import.meta.glob("/src/lib/blog/data/posts/*.md", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	const posts = Object.entries(files).map(([path, raw]) => {
		const { data, content } = matter(raw);
		const slug = path.split("/").pop()!.replace(".md", "");

		return {
			slug,
			content,
			title: data.title,
			summary: data.summary,
			timestamp: data.timestamp,
			tags: data.tags,
		} satisfies Post;
	});

	return posts.sort((a, b) => b.timestamp - a.timestamp);
}

export { getPost, getPosts };
