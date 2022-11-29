<script lang="ts">
    import Footer from "./lib/components/Footer.svelte";

    let site_url = import.meta.env.VITE_VERCEL_URL
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<svelte:head>
    <title>Hiya! // {site_url} 💖</title>
</svelte:head>
<body>
    <div>
        {site_url}
    </div>
    <main>
        <p>placeholder text</p>
    </main>
    <Footer />
</body>

<style lang="scss">
    body {
        display: flex;
        flex-direction: column;
        width: 100vw;
        text-align: center;
        justify-content: space-between;
        align-content: center;

        --color-primary: #fb7bff;
    }
</style>
