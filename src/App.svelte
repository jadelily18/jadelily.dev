<script lang="ts">
    import Footer from "./lib/components/Footer.svelte";

    import {Twitter, Mastodon, Github} from "@icons-pack/svelte-simple-icons"
    import {Link} from "lucide-svelte"

    const iconSize = 32

    function getAgeFromDate(dateString) {
        const ageInMs = new Date() - new Date(dateString);
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24 / 365)
    }
</script>

<svelte:head>
    <title>Hiya! // jadelily.dev</title>
</svelte:head>

<body>

<section class="page">
    <div class="content">
        <div class="title">
            <h2>Hiya, I'm</h2>
            <h1><span class="emphasized-text">Jade</span> Nash</h1>
        </div>
        <div>
            I'm a {getAgeFromDate("2003-08-18")}-year-old Minecraft mod & web developer from Owensboro, KY.
            Most of the projects I create, including this website, are
            <a class="link" href="https://opensource.com/resources/what-open-source">open-source</a>,
            with the code being available by clicking the GitHub icon below!
        </div>
        <div class="bottom-row">
            <div class="contact">
                <h3>Contact me</h3>
                <div class="contact-info">
                    <div class="tooltip tip-bottom" data-tip="Discord">
                        <a class="btn-small">Jade#6496</a>
                    </div>
                    <div class="tooltip tip-bottom" data-tip="Email">
                        <a class="btn-small" href="mailto:jade@lilydev.com">jade@lilydev.com</a>
                    </div>
                </div>
            </div>
            <div class="social">
                <div class="tooltip tip-top" data-tip="pronouns.page">
                    <a class="btn-icon" href="https://en.pronouns.page/@jadelily">
                        <Link size="{iconSize - 2}"/>
                    </a>
                </div>
                <div class="tooltip tip-top" data-tip="Twitter">
                    <a class="btn-icon" href="https://twitter.com/jadelily18">
                        <Twitter size={iconSize}/>
                    </a>
                </div>
                <div class="tooltip tip-top" data-tip="Mastodon (blobfox.coffee)">
                    <a class="btn-icon" href="https://blobfox.coffee/@jade">
                        <Mastodon size={iconSize - 2}/>
                    </a>
                </div>
                <div class="tooltip tip-top" data-tip="GitHub">
                    <a class="btn-icon" href="https://github.com/jadelily18">
                        <Github size={iconSize - 2}/>
                    </a>
                </div>
            </div>
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

  .btn-small {
    padding: 0.35rem;
    border-radius: 0.25rem;
    cursor: pointer;

    color: var(--color-primary);
    background-color: transparent;

    transition: all ease-in-out 200ms;

    &:hover {
      background-color: var(--color-btn-ghost-hover);
    }

  }

  .btn-icon {
    display: flex;
    padding: 0.75rem;
    border-radius: 100%;
    place-items: center;

    color: var(--color-primary-text);
    background-color: transparent;

    transition: all ease-in-out 200ms;

    &:hover {
      color: var(--color-primary-hover);
      background-color: var(--color-btn-ghost-hover);
    }
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

  .bottom-row {
    display: flex;
    justify-content: space-between;
    margin-top: 1.35rem;

    .contact {
      .contact-info {
        span {
          color: var(--color-primary);
        }
      }

      h3 {
        margin: 0;
        font-weight: normal;
      }

      p {
        margin: 0;
      }
    }

    .social {
      display: flex;
      place-items: center;

    }
  }

  .tooltip {
    position: relative;
    display: inline-block;

    &.tip-top:before {
      content: attr(data-tip);
      visibility: hidden;
      position: absolute;

      background-color: var(--color-tooltip);

      text-align: center;
      padding: 5px 12px;
      border-radius: 0.25rem;

      bottom: 110%;
      left: 50%;
      transform: translateX(-50%);
    }

    &.tip-bottom:before {
      content: attr(data-tip);
      visibility: hidden;
      position: absolute;

      background-color: var(--color-tooltip);

      text-align: center;
      padding: 5px 12px;
      border-radius: 0.25rem;

      left: 50%;
      transform: translateX(-50%) translateY(85%);
    }

    // lil arrow
    //&:hover:after {
    //  content: "";
    //  position: absolute;
    //  bottom: 93%;
    //  left: 50%;
    //  margin-left: -5px;
    //  border-width: 5px;
    //  border-style: solid;
    //  border-color: var(--color-tooltip) transparent transparent transparent;
    //}

    &.tip-top:hover:before {
      visibility: visible;
    }

    &.tip-bottom:hover:before {
      visibility: visible;
    }

  }

</style>
