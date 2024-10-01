<template>
  <div class="rnboplayer">
    <div class="row">
      <div class="slider">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/noiseicon.svg">
        </div>
        <input
          id="gain-control"
          v-model="outputNoiseGain"
          type="range"
          min="0"
          max="100"
          step="1"
          @wheel="changeNoiseGain"
        >
      </div>
    </div>
    <div class="row">
      <div class="slider">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/musicicon.svg">
        </div>
        <input
          id="gain-control"
          v-model="outputMusicGain"
          type="range"
          min="0"
          max="100"
          default="50"
          step="1"
          @wheel="changeMusicGain"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Player from '~/components/Player/Player.js'
import setupNodes from '~/components/Player/Nodes'
import { useUserStore } from '~/stores/user.js'
import { useAudioStore } from '~/stores/audio.js'

export default defineComponent({
  name: 'AudioPlayer',

  setup () {
    const scenePlayer: Ref<Player | null> = ref(null)
    const noisePlayer: Ref<Player | null> = ref(null)

    // Cache references to DOM elements.

    // HTML elements as reference to DOM elements
    const track = ref(null)
    const timer = ref(null)
    const duration = ref(null)
    const playBtn = ref(null)
    const pauseBtn = ref(null)
    const prevBtn = ref(null)
    const nextBtn = ref(null)
    const playlistBtn = ref(null)
    const volumeBtn = ref(null)
    const progress: Ref<HTMLElement | null> = ref(null)
    const bar = ref(null)
    const loading = ref(null)
    const list = ref(null)
    const volumeDivRef = ref(null)
    const barEmpty = ref(null)
    const barFull = ref(null)
    const waveform: Ref<HTMLElement | null> = ref(null)
    const playlistElement = ref(null)

    // Gain sliders
    const outputMusicGain:Ref<number> = ref(0)
    const outputNoiseGain:Ref<number> = ref(0)

    /**
       * Player class containing the state of our playlist and where we are in it.
       * Includes all methods for playing, skipping, updating the display, etc.
       * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
       */
    const scenesPlaylist = [
      {
        title: 'Lagoon',
        file: 'lagoon',
        howl: null,
        node: null
      },
      {
        title: 'Meadow',
        file: 'meadow',
        howl: null,
        node: null
      },
      {
        title: 'Tropics',
        file: 'tropics',
        howl: null,
        node: null
      },
      {
        title: 'Forest',
        file: 'forest',
        howl: null,
        node: null
      }
    ]
    const noisePlaylist = [
      {
        title: 'noise',
        file: 'noise',
        howl: null,
        node: null
      }
    ]

    const currentScene = ref(scenesPlaylist[0])
    const progressWidth = ref(0)
    const handleSkip = (direction: 'prev' | 'next') => scenePlayer.value?.skip(direction)

    const sliderDown = ref(false)

    // Unified wheel event handler
    const move = (event: MouseEvent | TouchEvent) => {
      if (sliderDown.value) {
        // Using the conditional (ternary) operator to handle MouseEvent and TouchEvent
        const x = 'touches' in event ? event.touches[0].clientX : event.clientX
        const startX = window.innerWidth * 0.05
        const layerX = x - startX

        if (barEmpty.value) {
          const barEmptyElem = barEmpty.value as HTMLElement
          const per = Math.min(1, Math.max(0, layerX / parseFloat(barEmptyElem.scrollWidth.toString())))
          scenePlayer.value?.setVolume(per)
        }
      }
    }
    const handleVolume = (event: MouseEvent | TouchEvent) => (move(event))

    const noiseGainNode:Ref<GainNode | null> = ref(null)
    const musicGainNode:Ref<GainNode | null> = ref(null)

    const changeNoiseGain = (event:WheelEvent): void => {
      event.preventDefault()
      if (noiseGainNode.value != null) {
        // Determine the direction of the scroll
        const delta:number = Math.sign(event.deltaY)
        const noiseGain = outputNoiseGain.value as number
        if (noiseGain - delta < 101 && noiseGain - delta > -1) {
          // Assuming delta is defined somewhere above this snippet
          outputNoiseGain.value -= delta
        }
      } else {
        // console.log('noiseGainNode undefined')
      }
    }
    const changeMusicGain = (event:WheelEvent): void => {
      event.preventDefault()
      if (musicGainNode.value != null) {
        // Determine the direction of the scroll
        const delta = Math.sign(event.deltaY)
        const musicGain = outputMusicGain.value as number
        if (musicGain - delta < 101 && musicGain - delta > -1) {
          scenePlayer.value?.setVolume()
          outputMusicGain.value -= delta
          // console.log('music gain changed')
        }
      }
    }
    /**
       * Starts the players audio sources based on the preferred soundscape of the user
       */

    onBeforeUnmount(() => {
      noisePlayer.value = null
      scenePlayer.value = null
      useAudioStore().resetAudioContext()
    })

    onMounted(async () => {
      const scenePlayer = new Player(scenesPlaylist, 'sounds')
      const noisePlayer = new Player(noisePlaylist, 'masking')
      Howler.mute(true)
      useAudioStore().setPlayers({ scenePlayer, noisePlayer })
      const userScenery = useUserStore().getUserScenery
      // console.log('playlists:', scenePlayer.playlist, noisePlayer.playlist)
      // Use findIndex to get the index of the first match
      // const matchingIndex = scenePlayer.playlist.findIndex((playItem: any) => playItem.title.toLowerCase() === userScenery.toLowerCase())
      // console.log('latest soundscape ' + scenesPlaylist)
      // const sceneHowl = scenePlayer.initializeHowl(matchingIndex)
      // const noiseHowl = noisePlayer.initializeHowl(0)
      // // console.log('howl:', sceneHowl, noiseHowl)
      scenePlayer.skip('prev')
      scenePlayer.skip('next')
      scenePlayer.skip('prev')
      scenePlayer.skip('next')

      const noiseNode: MediaElementAudioSourceNode = noisePlayer.playlist[0].node

      const filteredScenes = scenePlayer.playlist.filter((playItem:any) => playItem.title.toLowerCase() === userScenery.toLowerCase())

      const response:any = await setupNodes(noiseNode, filteredScenes[0].node)
      try {
        filteredScenes[0].howl.play()
        noisePlayer.playlist[0].howl.play()
        noiseGainNode.value = response.pop()
        musicGainNode.value = response.pop()
        if (musicGainNode.value && noiseGainNode.value) {
          musicGainNode.value.gain.value = 0.5
          noiseGainNode.value.gain.value = 0.5
          Howler.masterGain.disconnect()
        }
      } catch (_error) {
      }
      scenePlayer.play()
      noisePlayer.play()
    })
    const playlistIndex = ref(useAudioStore().playlistIndex)
    watch(playlistIndex.value, (newValue: any) => {
      if (musicGainNode.value instanceof GainNode) { musicGainNode.value.gain.linearRampToValueAtTime(newValue / 100, musicGainNode.value.context.currentTime + 0.2) }
    })
    watch(outputMusicGain, (newValue: any) => {
      if (musicGainNode.value instanceof GainNode) { musicGainNode.value.gain.linearRampToValueAtTime(newValue / 100, musicGainNode.value.context.currentTime + 0.2) }
    })

    watch(outputNoiseGain, (newValue: any) => {
      useAudioStore().playlistIndex++
      if (noiseGainNode.value == null) { return }
      if (noiseGainNode.value instanceof GainNode) {
        // console.log('set Volue of Noise')
        noiseGainNode.value.gain.linearRampToValueAtTime(newValue / 100, noiseGainNode.value.context.currentTime + 0.2)
      }
    })
    /**
       * This methods watches changes on the noise gain slider and use a simple ramp for adaption
       * @param newValue
       */

    return {
      bar,
      barFull,
      currentTrack: currentScene,
      duration,
      handleSkip,
      handleVolume,
      list,
      loading,
      nextBtn,
      pauseBtn,
      playBtn,
      playlistBtn,
      playlistElement,
      prevBtn,
      progress,
      progressWidth,
      scenePlayer,
      noisePlayer,
      timer,
      track,
      volumeBtn,
      volumeDivRef,
      waveform,
      outputNoiseGain,
      outputMusicGain,
      changeNoiseGain,
      changeMusicGain
    }
  }
})

</script>
  <style scoped>

  .rnboplayer{
    position: fixed;
    width: 220px; /* Or specify a fixed width like 220px if you prefer */
    max-width: 220px; /* This line might be redundant depending on your width strategy */
    height: 100px;
    display: inline-grid;
    z-index: 2;
    bottom: 11%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .player {
    background-color: #fff;
    border-radius: 12px;
    position:sticky;
    width: 225px;
    height: inherit;
    display:flex;
    float: bottom;
  }
  .player button  {
    border-radius: 10px;
    padding: 10px;
  }

  .container {
              display: flex;
              flex-wrap: wrap;
              gap: 20px; /* Spacing between items */
              width: 225px;
              margin-bottom: 20px;
          }

          .icon, .slider {
              flex: 1 1 100px; /* Flex-grow, flex-shrink, flex-basis */
              display: flex;
              align-items: center; /* Center items vertically */
              justify-content: center; /* Center items horizontally */
          }
          .icon {
      /* Add padding around the icon for margin */
      margin-right: 15px; /* Adjust this value as needed */

      /* Align items if using flexbox */
      display: flex;
      align-items: center;
      justify-content: center;
  }

  .icon img {
      /* Adjust width and height as needed or keep them auto to maintain aspect ratio */
      width: auto;
      height: 100%; /* Example height, adjust based on your icon size */
  }

          .slider input[type=range] {
              width: 100%; /* Full width of its parent */
              background-color: transparent !important;
          }

          @media (min-width: 600px) {
              .row {
                  display: flex;
                  width: 100%;
              }

              .icon, .slider {
                  flex: 1; /* Take up equal space */
              }
          }

  /* Styles the track */
  input[type="range"]::-webkit-slider-runnable-track {
    background: #e9c046; /* yellow track */
      height: 8px;
      border-radius: 5px;
    }

  input[type="range"]::-moz-range-track {
      background: #e9c046; /* yellow track */
      height: 8px;
      border-radius: 5px;
  }

  input[type="range"]::-ms-track {
      background: #e9c046; /* yellow track */
      border-color: transparent;
      color: transparent;
      height: 8px;
  }

  .play.yellow {
  background: rgba(255, 176, 66, 0.008);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  animation: pulse-yellow 4s infinite;
  position: fixed;
  bottom: 40%;
  width: 200px;
  height: 200px;
  background-image: url('/images/playbtn.svg');
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-position: 58% 55%;
  }
  .pause.yellow {
  background: rgba(255, 176, 66, 0.008);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  opacity: 0.05;
  position: fixed;
  bottom: 40%;
  width: 200px;
  height: 200px;
  background-image: url('/images/pausebtn.svg');
  background-size: 130px 100px;
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-position: center;
  }
  .pause.yellow:hover{
    opacity: 0.5;
  }

  @keyframes pulse-yellow {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
  }
  }

  </style>
