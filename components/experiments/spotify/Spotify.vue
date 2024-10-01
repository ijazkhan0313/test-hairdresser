<template>
  <div class="episodes">
    <button class="episode" data-spotify-id="spotify:episode:7makk4oTQel546B0PZlDM5">
      My Path to Spotify: Women in Engineering
    </button>
    <button class="episode" data-spotify-id="spotify:episode:43cbJh4ccRD7lzM2730YK3">
      What is Backstage?
    </button>
    <button class="episode" data-spotify-id="spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV">
      Introducing Nerd Out@Spotify
    </button>
  </div>

  <div id="embed-iframe" />
</template>
<script lang="js">

export default {
  name: 'SpotifyTest',
  mounted  () {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe')
      const options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const callback = (EmbedController) => {}
      IFrameAPI.createController(element, options, callback)
    }
  }
}

</script>

<style type="text/css">
    .episodes {
      display: flex;
      flex-direction: column;
    }

    .episode {
      min-width: max-content;
      margin-bottom: .8rem;
      padding: .8rem 1rem;
      border-radius: 10px;
      border: 0;
      background: #191414;
      color: #fff;
      cursor: pointer;
    }

    .episode:hover {
      background: #1Db954;
    }

    @media screen and (min-width: 860px) {
      body {
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
    }
</style>
