import { PersistedState } from "./PersistedState.svelte";

let ignoreContentWarnings = new PersistedState<boolean>(
	"hideContentWarning",
	false,
);

export { ignoreContentWarnings };
