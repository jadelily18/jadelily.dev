import type { SettingsPageId } from "@components/app/settings-dialog/types";
import { userPrefersMode, type UserPrefersMode } from "mode-watcher";
import { accessorsOf, draftsOf } from "./Draft.svelte";
import { PersistedState } from "./PersistedState.svelte";

type Mode = UserPrefersMode["current"];

let settingsOpen = $state(false);
let settingsActivePage = $state<SettingsPageId | undefined>(undefined);

const generalSources = {
	ignoreContentWarnings: new PersistedState<boolean>(
		"hideContentWarning",
		false,
	),
	theme: {
		get value(): Mode {
			return userPrefersMode.current;
		},
		set value(mode: Mode) {
			userPrefersMode.current = mode;
		},
	},
};

const cookiesSources = {
	allowYoutubeCookies: new PersistedState<boolean | undefined>(
		"cookieConsent",
		undefined,
	),
};

const generalDrafts = draftsOf(generalSources);
const cookiesDrafts = draftsOf(cookiesSources);
const drafts = [
	...Object.values(generalDrafts),
	...Object.values(cookiesDrafts),
];

const appStore = {
	settings: {
		get open() {
			return settingsOpen;
		},
		set open(value: boolean) {
			settingsOpen = value;
		},
		get activePage() {
			return settingsActivePage;
		},
		set activePage(value: SettingsPageId | undefined) {
			settingsActivePage = value;
		},
		get dirty() {
			return drafts.some((draft) => draft.dirty);
		},
		commit() {
			for (const draft of drafts) draft.commit();
		},
		reset() {
			for (const draft of drafts) draft.reset();
		},
		general: accessorsOf(generalSources),
		cookies: accessorsOf(cookiesSources),
		pending: {
			general: accessorsOf(generalDrafts),
			cookies: accessorsOf(cookiesDrafts),
		},
	},
};

function openSettingsPage(id: SettingsPageId) {
	settingsActivePage = id;
	settingsOpen = true;
}

export { appStore, openSettingsPage };
