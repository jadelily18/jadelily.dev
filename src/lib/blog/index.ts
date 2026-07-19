import type { Post } from "$types/blog";
import matter from "gray-matter";

async function getPost(slug: string): Promise<Post | undefined> {
	let posts = await getPosts();
	let post = posts.find((p) => p.slug === slug);
	if (!post?.published) return undefined;
	return post;
}

async function getPosts(): Promise<Post[]> {
	const files = import.meta.glob("/src/lib/blog/data/posts/*.md", {
		eager: true,
		query: "?raw",
		import: "default",
	}) as Record<string, string>;

	let posts: Post[] = [];

	for (let path in files) {
		const { data, content } = matter(files[path]);
		// if (!data.published) continue;

		const slug = path.split("/").pop()!.replace(".md", "");

		const post = {
			slug,
			content,
			title: data.title,
			summary: data.summary,
			timestamp: data.timestamp,
			tags: data.tags,
			coverImg: data.coverImg,
			coverAlt: data.coverAlt,
			attribution: data.attribution,
			attributionLink: data.attributionLink,
			contentWarning: data.contentWarning,
			published: data.published,
		} satisfies Post;

		posts.push(post);
	}

	return posts.sort((a, b) => b.timestamp - a.timestamp);
}

export { getPost, getPosts };
