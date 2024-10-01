<template>
  <div>
    <!-- Slot for passing any audio element -->
    <slot />
    <div class="slider">
      <input
        id="gain-control"
        v-model="volume"
        type="range"
        min="0"
        max="1"
        step="0.02"
        @wheel.prevent="changeVolumeOnWheel"
      >
    </div>
    <audio
      ref="audioElement"
      hidden
      autoplay
      muted
      loop
      @play="handlePlay"
      @pause="handlePause"
      @keydown="handleKeyDown"
      @loadedmetadata="handleLoaded"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAudioStore } from '~/stores/audio'

export default {
  name: 'AudioElement',
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Unknown'
    }
  },
  emits: ['update:volume', 'update:loaded', 'update:playing', 'update:fadeout'],
  setup (props, { emit }) {
    const audioStore = useAudioStore()
    const audioElement = ref<HTMLAudioElement | null>(null)
    const volume = ref(1)

    const play = () => {
      try {
        // set audio element to mute, will be anyway muted after connecting to the web audio graph
        // console.log('Trigger Play of the audioelement tag: CurrentTime ' + currentTime + ' paused' + paused + ' ended' + ended)

        audioElement.value?.play()
        if (audioElement.value) { audioElement.value.muted = true }
      } catch (e) {
      }
    }

    const pause = () => {
      audioElement.value?.pause()
    }

    const pauseFadeOut = () => {
      // console.log('pauseFadeOut')
      emit('update:fadeout')
      setTimeout(() => {
        pause()
      }, 2000)
    }

    const isPlaying = () => {
      return audioStore.playing
    }

    onUpdated(() => {
      if (props.title === 'Noise') {
        // console.log('cannot set control of noise to false')
      } else if ('mediaSession' in navigator) {
        const path = window.location.origin + '/images/scenery/' + props.title.toLowerCase() + '.jpg'
        navigator.mediaSession.metadata = new MediaMetadata({
          title: props.title,
          artist: 'Mindboost',
          artwork: [
            { src: path, sizes: '192x192', type: 'image/jpeg' }
          ]
        })
      }
    })

    watch(() => audioStore.playing, (newValue) => {
      if (newValue) {
        // console.log('PLAY THE AUDIO')
        play()
      } else {
        // console.log('PAUSE THE AUDIO')
        pauseFadeOut()
      }
    })

    watch(() => volume.value, (newValue) => {
      if (audioElement.value) {
        emit('update:volume', newValue)
      }
    })

    const changeVolumeOnWheel = (event:WheelEvent) => {
      // Adjust volume on wheel scroll
      const deltaY = event.deltaY
      if (deltaY < 0) {
        const volumeAdd = (Math.min(1, volume.value + 0.02))
        volume.value = volumeAdd
      } else {
        const volumeCut = (Math.max(0, volume.value - 0.02))
        volume.value = volumeCut
      }
    }

    let enableKeyHandler = true

    const debounce = <T extends (...args: any[]) => void>(func: T, timeout: number = 1500): () => void => {
      let timer: NodeJS.Timeout | null
      return () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => { func.apply(this) }, timeout)
      }
    }

    const reEnableKeyHandler = debounce(() => {
      enableKeyHandler = true
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableKeyHandler) { return }
      if (e.code === 'Space') {
        e.preventDefault() // Prevent the default action (scrolling)
        // console.log('The current state is ' + audioStore.playing + ' so start or stop audio')
        if (audioStore.playing) {
          handlePause()
        } else {
          handlePlay()
        }
        enableKeyHandler = false // Disable handler
        reEnableKeyHandler()
      }
    }

    const handlePlay = () => {
      // console.log('handlePlay called ' + audioStore.isPlaying())
      // First handlePlay is triggered by the autoplay, so no need to start play
      emit('update:playing', true)
      audioStore.setPlaying(true)
      // console.log('handlePlay ended with ' + audioStore.isPlaying())
    }

    const handlePause = () => {
      // console.log('handlePause: Change play state to false')
      emit('update:playing', false)
      audioStore.playing = false
    }

    const handleLoaded = () => {
      emit('update:loaded', true)
    }

    onMounted(() => {
      if (audioElement.value) {
        audioElement.value.src = props.src
        if (props.title !== 'Noise') {
          window.addEventListener('keydown', handleKeyDown.bind(this))
          if ('mediaSession' in navigator) {
            // Play action
            navigator.mediaSession.setActionHandler('play', (_e) => {
              handlePlay()
              // if (!enableMediaHandler) {
              /// / console.log('during event handling - being busy ')
              //   return
              // }
              // enableMediaHandler = false // Disable handler
              // reEnableMediaHandler()
              // // Your play action here
            })

            // Stop action
            navigator.mediaSession.setActionHandler('stop', (_e) => {
              // if (!enableMediaHandler) { return }
              // // Your stop action here
              // if (audioElement.value) {
              //   audioElement.value.currentTime = 0
              //   audioElement.value.src = ''
              //   audioElement.value.removeAttribute('src')
              // }
              // audioStore.playing = false
            })

            // Pause action
            navigator.mediaSession.setActionHandler('pause', (_e) => {
              handlePause()
              // if (!enableMediaHandler) {
              /// / console.log('during event handling - being busy ')
              //   return
              // }
              // audioStore.playing = false
              // enableMediaHandler = false // Disable handler
              // reEnableMediaHandler()
            })
          }
        }
      }
    })

    onRenderTriggered(() => {
      // console.log('render AudioElement-----------' + props.title)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown.bind(this))
    })

    return {
      audioElement,
      play,
      pause,
      isPlaying,
      handlePlay,
      handlePause,
      handleLoaded,
      handleKeyDown,
      volume,
      changeVolumeOnWheel
    }
  }
}
</script>
<style scoped>
.slider {
  margin-bottom: 1em;
}
/* Style adjustments if needed */
input[type="range"] {
  background:transparent !important;
}
/* Styles the track */
input[type="range"]::-webkit-slider-runnable-track {
  background: #e9c046; /* yellow track */
  height: 10px;
  border-radius: 5px;
}

input[type="range"]::-moz-range-track {
  background: #e9c046; /* yellow track */
  height: 10px;
  border-radius: 5px;
}

input[type="range"]::-ms-track {
  background: #e9c046; /* yellow track */
  border-color: transparent;
  color: transparent;
  height: 8px;
}

/* Styles the thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /* Required to style in Webkit browsers */
  margin-top: -6px; /* Adjusts the position of the thumb relative to the track */
}

input[type="range"]::-moz-range-thumb {
  border: none; /* Removes any default border */
}

input[type="range"]::-ms-thumb {
  margin-top: 0; /* May need to adjust the position similar to webkit */
  border: none; /* Removes any default border */
}
</style>
