export function formatPageTitle(page: string, subPage?: string): string {
	const siteTitle = "jadelily.dev";
	const formattedTitle = `${page}${subPage ? ` / ${subPage}` : ""} — ${siteTitle}`;

	return formattedTitle;
}
