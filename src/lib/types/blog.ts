export type Tag = 'programming' | 'politics';

export type BlogPost = {
	title: string;
	slug: string;
	description: string;
	timestamp: number;
	tags: Tag[];
	published: boolean;
};
