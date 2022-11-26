<script lang="ts">
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<svelte:head>
    <title>Jade</title>
</svelte:head>
<main class="main">
    <a
        href="https://github.com/jadelily18/jadelily.dev"
        class="hover-underline-animation"
    >
        <h1 class="title">jadelily.dev</h1>
    </a>
    <p>is under construction...</p>
    <p>
        {repo_owner}/{repo_slug}
        {repo_branch}@{commit_sha.substring(0, 7)}
    </p>
</main>

<style>
    /* .main {
        height: screen;
    } */

    .title {
        margin: 0;
    }
</style>
