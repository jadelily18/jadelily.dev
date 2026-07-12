interface Post {
	slug: string;
	title: string;
	summary: string;
	timestamp: number;
	tags?: string[];
	content: string;
	coverImg?: string;
	coverAlt?: string;
}

export type { Post };
