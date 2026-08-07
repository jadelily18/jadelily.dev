import { getPosts } from "$lib/blog";

import blogTemplate from "./template.xml?raw";

export function GET({ url }) {
	const posts = getPosts();

	const items = posts.map((p) =>
		`
	<item>
		<title>${p.title}</title>
		<link>${new URL(`/blog/${p.slug}`, url.origin).href}</link>
		<description>${p.summary}</description>
	</item>
	`
			.replaceAll("	", "    ") // replace tabs with spaces because it looks prettier in a browser
			.trim(),
	);

	const meta: Record<string, string> = {
		title: "Jade's Blog — jadelily.dev",
		link: new URL("blog", url.origin).href,
		atomLink: url.href,
		description: "A dog on the internet writes about random stuff.",
		items: items.join("\n    "),
	};

	let rssString: string = blogTemplate;
	for (const m of Object.keys(meta)) {
		rssString = rssString.replace(`%rss.${m}%`, meta[m]);
	}

	return new Response(rssString, {
		headers: {
			"Cache-Control": "max-age=0, s-maxage=3600",
			"Content-Type": "application/xml",
		},
	});
}
