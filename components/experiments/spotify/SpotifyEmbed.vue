<template>
  <div v-if="spotifyUri">
    <iframe
      :src="spotifyEmbedUrl"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  </div>
</template>

<script>
export default {
  props: {
    spotifyUri: {
      type: String,
      default: ''
    }
  },
  computed: {
    spotifyEmbedUrl () {
      return `https://open.spotify.com/embed/${this.spotifyUri}`
    }
  }
}
</script>
