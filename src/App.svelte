<script lang="ts">
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<svelte:head>
    <title>Jade</title>
</svelte:head>
<body>
    <div />
    <main>
        <a
            href="https://github.com/jadelily18/jadelily.dev"
            class="hover-underline-animation"
        >
            <h1 class="title">jadelily.dev</h1>
        </a>
        <p>is under construction...</p>
    </main>
    <footer>
        <p>
            {repo_owner}/{repo_slug}
            {repo_branch}@<a
                class="link"
                href="https://github.com/{repo_owner}/{repo_slug}/tree/{commit_sha}"
                >{commit_sha.substring(0, 7)}</a
            >
        </p>
    </footer>
</body>

<style lang="scss">
    body {
        display: flex;
        flex-direction: column;
        width: 100vw;
        text-align: center;
        justify-content: space-between;
        align-content: center;

        --primary_color: #fb7bff;
    }

    .title {
        margin: 0;
    }

    .link {
        color: var(--primary_color);
        text-decoration: underline;
    }
</style>
