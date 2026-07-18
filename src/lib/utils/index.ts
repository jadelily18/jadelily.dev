export function formatPageTitle(page: string, subPage?: string): string {
	const siteTitle = "jadelily.dev";
	const formattedTitle = `${subPage ? `${subPage} / ${page}` : page} — ${siteTitle}`;

	return formattedTitle;
}
