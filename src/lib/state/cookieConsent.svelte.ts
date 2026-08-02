import { PersistedState } from "./PersistedState.svelte";

let youtubeCookieConsent = new PersistedState<boolean | undefined>(
	"cookieConsent",
	undefined,
);

export { youtubeCookieConsent };
