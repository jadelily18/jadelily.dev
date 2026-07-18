import { getPost } from "$lib/blog";
import { error } from "@sveltejs/kit";

export function load({ params }) {
	const post = getPost(params.slug);

	// if (post) {
	return {
		post,
	};
	// } else {
	// 	error(404, "Blog post not found");
	// }
}
