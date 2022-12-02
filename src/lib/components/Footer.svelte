<script lang="ts">
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<div class="footer">
    <!--    <div class="link-row">-->
    <!--        <a href="">Contact</a>-->
    <!--        <a href="">Socials</a>-->
    <!--    </div>-->
    <div class="repo-info">
        <p>
            {repo_owner}/{repo_slug}
            {repo_branch}@<a
                class="link"
                href="https://github.com/{repo_owner}/{repo_slug}/tree/{commit_sha}"
        >{commit_sha.substring(0, 7)}</a>
        </p>
    </div>
</div>

<style lang="scss">
  @use "sass:math";

  .footer {
    position: absolute;
    align-self: center;
    bottom: 0;

    text-align: center;
  }

  .link-row {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.25rem;

    * {
      color: var(--color-primary);
      letter-spacing: 1px;
    }

    $spacing: 0.6rem;

    :nth-child(1) {
      margin-right: math.div($spacing, 2);
    }

    :nth-child(2) {
      margin-left: math.div($spacing, 2);
    }
  }

  .repo-info {
    p {
      margin-top: 0.25rem;
    }
  }

</style>
