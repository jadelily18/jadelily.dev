interface Post {
	slug: string;
	title: string;
	summary: string;
	timestamp: number;
	tags?: string[];
	content: string;
}

export type { Post };
