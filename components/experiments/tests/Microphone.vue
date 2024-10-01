<template>
  <div v-show="false">
    <h1>Microphone</h1>
    <button @click="attach">
      {{ microphoneActive ? 'Mikrofon trennen' : 'Mikrofon aktivieren' }}
    </button>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, onUnmounted, watch, onUpdated } from 'vue'
import { useAudioStore } from '~/stores/audio'

export default {
  name: 'MicrophoneHandler',
  emits: ['update:attach'],
  setup (_props, { emit }) {
    const audioStore = useAudioStore()
    const microphone = ref<Promise<MediaStream> | null>(null)
    const microphoneActive = ref(false)

    const attach = () => {
      if (!microphone.value) {
        microphone.value = navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          },
          video: false
        })
        microphoneActive.value = true
      }

      return microphone.value.then((stream) => {
        // console.log('stream there' + stream)
        emit('update:attach', stream)
        return stream
      })
    }

    const detach = async () => {
      if (microphone.value) {
        const stream = await microphone.value
        stream.getTracks().forEach(track => track.stop())
      }
      microphone.value = null
      microphoneActive.value = false
    }

    onUpdated(() => {
      // console.log('Microphone rerendered')
    })

    watch(() => audioStore.playing, (newValue) => {
      if (newValue) {
        attach()
      } else {
        detach()
      }
    })
    watch(() => audioStore.playing, (newValue) => {
      if (newValue) {
        attach()
      } else {
        detach()
      }
    })

    onMounted(() => {
      // Removed the window event listener for keydown as there is no handler defined in the provided code.
    })

    onUnmounted(() => {
      // Clean up by detaching the microphone when the component is unmounted
      detach()
    })

    // Return the public properties and methods
    return {
      attach,
      detach,
      isPlaying: () => audioStore.playing,
      microphoneActive
    }
  }
}
</script>
