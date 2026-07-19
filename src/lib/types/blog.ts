interface Post {
	slug: string;
	title: string;
	summary: string;
	timestamp: number;
	tags?: string[];
	content: string;
	coverImg?: string;
	coverAlt?: string;
	attribution?: string;
	attributionLink?: string;
	contentWarning?: string;
	published?: boolean;
}

export type { Post };
