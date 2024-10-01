<template>
  <div>
    <iframe
      style="border-radius:12px"
      :src="spotifyEmbedUrl"
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </div>
</template>

<script>
export default {
  name: 'PomodoroPlaylist',
  props: {
    spotifyUri: {
      type: String,
      default: ''
    }
  },
  computed: {
    spotifyEmbedUrl () {
      if (!this.spotifyUri) {
        return 'https://open.spotify.com/embed/playlist/6HuAVqLOmYskc2qOaBZBBz?utm_source=generator'
      }
      return `https://open.spotify.com/embed/${this.spotifyUri}`
    }
  }
}
</script>
