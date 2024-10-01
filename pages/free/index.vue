<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-0 mx-0">
          <video-background
            src="/video/Tropics.mp4"
            preload="auto"
            poster="/images/posters/poster.png"
            style=" height: 100vh;"
          >
            <home-bar :title="title" />
            <div class="overlay tooltip">
              <span class="tooltiptext">Upgrade to Pro to access this feature</span>
            </div>
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="adaptive pb-3">
                  <spotify-embed :spotify-uri="currentSpotifyUri" class="spotifyplayer" />
                  <button class="btn btn-dark" style="margin:auto; margin-bottom:2em" @click="changeTrack">
                    Next
                  </button>
                  <div class="col-12 ">
                    <div class="d-none d-md-block mx-auto  pb-1" style="width: 300px">
                      <div class="progress " style="height: 10px">
                        <div
                          class="progress-bar bar"
                          role="progressbar"
                          aria-label="Basic example"
                          :style="{width:bar_width+'%'}"
                          style="background-color: #e9c046;transition: 0.1s"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                    <div class="d-flex justify-content-center  mb-1">
                      <nuxt-link to="#adaptive-modal" data-bs-target="#adaptive-modal" data-bs-toggle="modal" class="text-muted text-decoration-none fw-bold fs-6 ">
                        {{ t('Adaptive soundscape') }}: <span class="" style="color: #e9c046">{{ t('Off') }}</span>
                      </nuxt-link><span class="ps-3"><i style="padding: 5px 0px;" class="fa-solid text-muted d-flex  fa-chevron-right" /></span>
                    </div>
                    <div class="d-block d-md-none mx-auto  pb-1" style="width: 225px">
                      <div class="progress " style="height: 10px">
                        <div
                          class="progress-bar bar"
                          role="progressbar"
                          aria-label="Basic example"
                          :style="{width:bar_width+'%'}"
                          style="background-color: #e9c046;transition: 0.1s"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <BootomBar />
                </div>
              </div>
            </div>
          </video-background>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import HomeBar from '../components/homebar'
import SpotifyEmbed from '@/components/experiments/spotify/SpotifyEmbed.vue'
export default {
  components: { HomeBar, SpotifyEmbed },

  setup () {
    definePageMeta({

      middleware: 'auth'
    })
    const { t } = useI18n()
    const localePath = useLocalePath()

    // Next track action
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      // Your next track action here
      changeTrack()
    })

    return {
      t,
      localePath
    }
  },

  data () {
    return {
      audioList: [
        { id: 1, title: 'Lagoon', src: window.location.origin + '/sounds/lagoon.m4a', spotifyUri: 'track/4O2wnyNQ2NLmd5BHkLTgu2' },
        { id: 2, title: 'Forest', src: window.location.origin + '/sounds/forest.m4a', spotifyUri: 'track/0MEMvf26SLFCXhnPj1qXJ1' },
        { id: 3, title: 'Meadow', src: window.location.origin + '/sounds/meadow.m4a', spotifyUri: 'track/48NC8HTZo0N3Kdpicx9wVp' },
        { id: 4, title: 'Tropics', src: window.location.origin + '/sounds/tropics.m4a', spotifyUri: 'track/12QLlNzfZTmSO6OMrjujKt' }
      ],
      currentSpotifyUri: 'track/4O2wnyNQ2NLmd5BHkLTgu2', // Default URI
      bar_width: 230,
      analyser: null,
      dataArray: null,
      bar_val: 25
    }
  },
  computed: {
    // Berechnete Eigenschaft für die dynamische Übersetzung des Titels
    title () {
      const title = this.audioList.filter(element =>
        element.spotifyUri === this.currentSpotifyUri)[0].title
      return this.$t(title)
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

  <style>
  #myVideo{
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;

    padding: 0;
    margin: 0;
    z-index: -99;
  }
  .adaptive{
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
  .spotifyplayer{
  display: flex;
  flex-direction: column; /* Ensures vertical centering if needed */
  align-items: center; /* Horizontally centers content in a flex-direction: column */
  justify-content: center;
  }
  .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5); /* Grey color with opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  pointer-events: none; /* Allows interaction with elements under the overlay */
}
 .tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

  </style>
