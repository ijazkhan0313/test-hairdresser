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
        data-toggle="tooltip"
        data-placement="top"
        :title="tooltipTitle"
        @wheel.prevent="changeVolumeOnWheel"
      >
    </div>
    <audio
      ref="audioElement"
      hidden
      muted
      loop
      @play="handlePlay"
      @pause="handlePause"
      @loadedmetadata="handleUpdatedMetadata"
      @canplay="handleCanPlay"
    />
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAudioStore } from '@/stores/audio'

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
    },
    tooltipTitle: {
      type: String,
      default: 'Change the volume by click, scroll or touch.',
      required: false
    }
  },
  emits: ['update:volume', 'update:loaded', 'update:playing', 'update:canplay'],
  setup (props, { emit }) {
    const audioStore = useAudioStore()
    const audioElement = ref<HTMLAudioElement | null>(null)
    const volume = ref(1)

    const mute = () => {
      if ((audioElement.value instanceof HTMLAudioElement)) {
        const ae = audioElement.value
        ae.muted = true
      } else {
        // console.log('audioelement not defined')
      }
    }
    const play = () => {
      try {
        if ((audioElement.value instanceof HTMLAudioElement)) {
        // set audio element to mute, will be anyway muted after connecting to the web audio graph
          audioElement.value?.play()
        // audioStore.setPlaying(true)
        } else {
          // console.log('audioelement not defined')
        }
      } catch (_e) {
        // console.error('Oouh sorry! Error while setting up audio, please reload.')
      }
    }

    const pause = () => {
      audioElement.value?.pause()
    }

    const isPlaying = () => {
      return audioStore.playing
    }
    const togglePlayPause = () => {
      if (audioElement.value) {
        if (audioStore.playing) {
          audioElement.value.play()
        } else {
          audioElement.value.pause()
        }
      }
    }

    watch(() => audioStore.playing, (newValue) => {
      if (newValue) {
        play()
        // unmute()
      } else {
        mute()
        pause()
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

    const updateMediaSession = () => {
      try {
        const path = window.location.origin + '/images/scenery/' + props.title.toLowerCase() + '.jpg'
        // console.log(navigator.mediaSession.metadata)
        if (audioElement.value) {
          audioElement.value.controls = true
          navigator.mediaSession.metadata = new MediaMetadata({
            title: props.title,
            artist: 'Mindboost',
            album: 'Mindboost Originale',
            artwork: [
              { src: path, sizes: '192x192', type: 'image/jpeg' }
            ]
          })
        }
      } catch (e) {
        // console.error(e)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault() // Prevent the default action (scrolling)
        // console.log('The current state is ' + audioStore.playing + ' so react on it in togglePlayPause')
        console.log('play or pause: ' + audioStore.playing)
        audioStore.playing = !audioStore.playing
      }
    }

    const handlePlay = () => {
      emit('update:playing', true)
    }

    const handleCanPlay = () => {
      emit('update:canplay', true)
    }

    const handlePause = () => {
      emit('update:playing', false)
    }
    const handleUpdatedMetadata = () => {
    // use the navigator for the soundscape.
    // console.log('update:metadata, a new metadata is loaded')
      if (props.title !== 'Noise') {
        updateMediaSession()
      }
    }

    onMounted(() => {
      if (audioElement.value) {
        audioElement.value.src = props.src
      }
    })

    onRenderTriggered(() => {
      // console.log('render AudioElement-----------' + props.title)
    })

    onUnmounted(() => {
      audioElement.value = null
      volume.value = 0
    })

    return {
      audioElement,
      play,
      pause,
      isPlaying,
      handlePlay,
      handlePause,
      handleUpdatedMetadata,
      handleCanPlay,
      volume,
      togglePlayPause,
      changeVolumeOnWheel,
      handleKeyDown,
      updateMediaSession
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
