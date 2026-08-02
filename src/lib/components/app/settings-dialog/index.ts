import * as Page from "./pages";
import SettingsDialog from "./SettingsDialog.svelte";
import type { SettingsPageId, SettingsPageType } from "./types";

import { CookieIcon, InfoIcon } from "@lucide/svelte";

const pages: Record<SettingsPageId, SettingsPageType> = {
	general: { label: "General", content: Page.General, icon: InfoIcon },
	cookies: { label: "Cookies", content: Page.Cookies, icon: CookieIcon },
};

export { SettingsDialog, Page, pages };
