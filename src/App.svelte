<script lang="ts">
    import Footer from "./lib/components/Footer.svelte";

    let site_url = import.meta.env.VITE_VERCEL_URL
    let repo_owner = import.meta.env.VITE_VERCEL_GIT_REPO_OWNER
    let repo_slug = import.meta.env.VITE_VERCEL_GIT_REPO_SLUG
    let repo_branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF
    let commit_sha = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
</script>

<svelte:head>
    <title>Hiya! // {site_url}</title>

    <!--SEO-->
    <meta name="name" content="jadelily.dev"/>
    <meta name="description" content="Hi, I'm Jade! I'm a queer software developer from Kentucky."/>
    <meta name="keywords" content="jadelily, jade, lily, lilydev, nash, jade nash, jadenash"/>
    <meta name="theme-color" content="#ee87f6"/>

    <!--OpenGraph-->
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://{site_url}"/>
    <meta property="og:locale" content="en_US"/>
    <meta property="og:site_name" content="jadelily.dev"/>
    <meta property="og:title" content="Jade Nash"/>
    <meta property="og:description" content="Hi, I'm Jade! I'm a queer software developer from Kentucky."/>
</svelte:head>

<body>

<section class="page">
    <div class="content">
        <div class="title">
            <h2>Hiya, I'm</h2>
            <h1><span class="emphasized-text">Jade</span> Nash</h1>
        </div>
        <div>
            I'm a 19-year-old Minecraft mod developer & web developer from Owensboro, KY, looking to create open-source
            projects that I can be proud of. I'm also a queer, transgender woman, and use she/her pronouns, so please be
            aware of that when mentioning me! If you’d like to know more about my gender identity, you can visit my
            <a class="link" href="https://en.pronouns.page/@jadelily">pronouns.page</a>!
        </div>

    </div>
</section>
<Footer/>

</body>

<style lang="scss">
  body {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-content: center;
  }

  .page {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  .content {
    display: flex;
    flex-direction: column;
    place-content: center;

    max-width: 32rem;

    @media (max-width: 576px) {
      //max-width: 22rem;
      padding: 1.2rem;
    }
  }

  .title {
    h1 {
      margin: 0.5rem 0 1.8rem;

      font-size: 2.3rem;
      font-weight: normal;
    }

    h2 {
      margin: 0;

      font-size: 1.35rem;
      font-weight: normal;
    }

    .emphasized-text {
      font-weight: bold;
    }
  }

  p {
    text-align: center;
  }
</style>
