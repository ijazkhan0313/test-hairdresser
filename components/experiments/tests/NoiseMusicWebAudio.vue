<template>
  <h1>Test Version NoiseMusicWebAudio: mit WebAudio, ohne Gain, ohne Noise-Patch & ohne Music-Patch</h1>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
  >
    <template #default="{}">
      <div class="icon">
        <img style="width: 25px" src="~/assets/image/noiseicon.svg">
      </div>
    </template>
  </AudioElement>
  <AudioElement
    ref="Music"
    key="1"
    :src="forest_src"
    title="Forest"
    @update:playing="handlePlayingUpdate"
  >
    <template #default="{ }">
      <div class="icon">
        <!-- tropic icon -->
        <img style="width: 25px" src="~/assets/image/musicicon.svg">
      </div>
    </template>
    <!-- Slot content for AudioElement, if needed -->
  </AudioElement>
</template>
<script lang="ts">
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'

export default {
  name: 'NoiseMusicGain',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      createdNodes: {} as any,
      playing: false,
      paused: false,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src
    }
  },
  beforeUnmount () {
    this.audioContext.close()
    this.audioContext = null
  },
  methods: {
    handlePlayingUpdate () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      const musicElement = this.$refs.Music as typeof AudioElement
      const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
      const audioContext = this.audioContext
      const destination = this.audioContext.destination

      this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(noiseAudioElement)
      this.createdNodes.musicSource ||= audioContext.createMediaElementSource(musicAudioElement)

      musicAudioElement.muted = false
      noiseAudioElement.muted = false

      this.createdNodes.noiseSource.connect(destination)
      this.createdNodes.musicSource.connect(destination)
    }
  }
}

</script>
