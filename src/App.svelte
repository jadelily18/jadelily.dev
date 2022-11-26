<script lang="ts">
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
        {process.env.VITE_VERCEL_GIT_REPO_OWNER}/{process.env
            .VITE_VERCEL_GIT_REPO_SLUG}
        {process.env
            .VITE_VERCEL_GIT_COMMIT_REF}@{process.env.VITE_VERCEL_GIT_COMMIT_SHA.substring(
            0,
            7
        )}
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
