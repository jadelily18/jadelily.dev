import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		// must be relative or else MD files won't be detected when deployed
		const post = await import(`../../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
