<template>
  <div id="spotify">
    <spotify-embed :spotify-uri="currentSpotifyUri" />
    <pomodoro-playlist />
    <state-bar />
    <button @click="changeTrack">
      Change Track
    </button>
  </div>
</template>

<script>
import SpotifyEmbed from '@/components/experiments/spotify/SpotifyEmbed.vue'
import PomodoroPlaylist from '@/components/experiments/spotify/PomodoroPlaylist.vue'
import StateBar from '@/components/experiments/statemanagement/StateBar.vue'
export default {
  components: {
    SpotifyEmbed, PomodoroPlaylist, StateBar
  },
  data () {
    return {
      audioList: [
        { id: 1, title: 'Lagoon', src: window.location.origin + '/sounds/lagoon.m4a', spotifyUri: 'track/4O2wnyNQ2NLmd5BHkLTgu2' },
        { id: 2, title: 'Forest', src: window.location.origin + '/sounds/forest.m4a', spotifyUri: 'track/0MEMvf26SLFCXhnPj1qXJ1' },
        { id: 3, title: 'Meadow', src: window.location.origin + '/sounds/meadow.m4a', spotifyUri: 'track/48NC8HTZo0N3Kdpicx9wVp' },
        { id: 4, title: 'Tropics', src: window.location.origin + '/sounds/tropics.m4a', spotifyUri: 'track/12QLlNzfZTmSO6OMrjujKt' }
      ],
      currentSpotifyUri: 'track/1hR0fIFK2qRG3f3RF70pb7' // Default URI

    }
  },
  methods: {
    changeTrack () {
      const newSong = this.getSong(this.currentSpotifyUri, 'next')
      this.currentSpotifyUri = newSong.spotifyUri // Change this to the new URI
    },
    getSong (currentTitle, direction) {
      const index = this.audioList.findIndex(song => song.spotifyUri === currentTitle)
      let adjacentIndex = index + (direction === 'next' ? 1 : -1)
      // Loop back to the first song if 'next' goes beyond the last index
      if (adjacentIndex >= this.audioList.length) {
        adjacentIndex = 0
      } else if (adjacentIndex < 0) {
        adjacentIndex = this.audioList.length - 1
      }
      return this.audioList[adjacentIndex]
    }
  }
}
</script>
