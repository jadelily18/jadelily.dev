import { getPost } from "$lib/blog";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const post = await getPost(params.slug);

	if (!post) error(404, "Blog post not found");

	return { post };
}
