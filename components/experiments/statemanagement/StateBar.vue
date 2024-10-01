<template>
  <h3>{{ playing }}</h3>
  <h3>{{ numberOfAudioTags }}</h3>
  <p>{{ errorMessage }}</p>
  <li v-for="(audio, index) in audioTags" :key="index">
    Tag {{ index + 1 }}: <span v-if="checkAudioElementPlaying(audio)">Playing</span><span v-else>Not Playing</span>
  </li>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAudioStore } from '~/stores/audio'

export default {
  name: 'StateBar',
  setup () {
    const audioStore = useAudioStore()
    const playing = ref(useAudioStore().playing)
    const audioTags = ref(Array.from(document.querySelectorAll('audio')))
    const numberOfAudioTags = ref(audioTags.value.length)
    const errorMessage = ref('')

    watch(() => audioStore.playing, (newValue) => {
      playing.value = newValue
      // Run the function to log the status of audio elements
      checkAudioElementsStatus()
    })
    watch(() => numberOfAudioTags, (_newValue) => {
      // console.log('new AudioTag Amount' + newValue)
      // Run the function to log the status of audio elements
      checkAudioElementsStatus()
    })

    const checkAudioElementPlaying = (audioElement:HTMLAudioElement) => {
      const isPlaying = !audioElement.paused && audioElement.currentTime > 0 && !audioElement.ended
      // console.log(`Audio Element ${audioElement.src}: ${isPlaying ? 'Playing' : 'Not Playing'}`)
      errorMessage.value = `Audio Element ${audioElement.src}: ${isPlaying ? 'Playing' : 'Not Playing'}`
      return isPlaying
    }

    const monitor = () => {
      // This could be an interval or a direct method call in your gain changing methods
      setInterval(() => {
        const audioElements = document.querySelectorAll('audio')
        errorMessage.value = ''
        let currentTime, paused, ended
        audioElements.forEach((element) => {
          currentTime = element.currentTime
          paused = element.paused
          ended = element.ended
          errorMessage.value += (`  Audio Element ${element.src}: time ${currentTime},paused ${paused}, ended ${ended} _______________`)
        })
      }, 100) // Update every 100 ms, adjust interval as necessary
    }

    onMounted(() => {
      monitor()
    })

    onUnmounted(() => {
    })

    return {
      numberOfAudioTags,
      audioTags,
      playing,
      checkAudioElementPlaying,
      errorMessage,
      monitor
    }
  }
}
function checkAudioElementsStatus () {
  // Find all audio elements on the page
  const audioElements = document.querySelectorAll('audio')

  // Iterate over each audio element to check if it's playing
  audioElements.forEach((_audioElement, _index) => {
    //  const _isPlaying = !audioElement.paused && audioElement.currentTime > 0 && !audioElement.ended
    // console.log(`Audio Element ${index + 1}: ${isPlaying ? 'Playing' : 'Not Playing'}`, { audioElement })
  })
}

</script>
  <style scoped>
   /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
  </style>
