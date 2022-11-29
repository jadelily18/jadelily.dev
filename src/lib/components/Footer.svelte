<script lang="ts">
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

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
