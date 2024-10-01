<template>
  <h1>Clitching in audio</h1>
  <h1>Test Version Noise Patch Music: mit WebAudio, ohne Noise-Patch & ohne Music-Patch, aber Musik</h1>
  <h2>Currently Artifacts caused by the import of the RNBO Patch </h2>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
    @update:volume="updateNoiseGain"
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
    @update:volume="updateMusicGain"
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
import { type Device, createDevice } from '@rnbo/js'
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'

import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'

export default {
  name: 'MicNoisePatchMusic',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext() as AudioContext,
      playing: false,
      paused: false,
      createdNodes: {} as any,
      noiseDevice: null as Device | null,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string
    }
  },
  beforeMount () {
    // console.log('beforeMount')
    this.createNoiseDevice()
  },
  methods: {
    async createNoiseDevice () {
      if (!this.noiseDevice) {
        const patcher = await importedNoisePatcher as any

        //
        // the method createDevice is called and right after the audio clichtes start
        //
        this.noiseDevice = await createDevice({
          context: this.audioContext,
          patcher
        })
        // console.log(patcher)
      }
    },
    async handlePlayingUpdate () {
      const noiseElement = await this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      const musicElement = this.$refs.Music as typeof AudioElement
      const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
      const audioContext = this.audioContext
      const destination = this.audioContext.destination

      this.createdNodes.musicGain ||= audioContext.createGain()
      this.createdNodes.noiseGain ||= audioContext.createGain()

      this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
      this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

      this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
      this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

      this.createdNodes.noiseGain.connect(destination)
      this.createdNodes.musicGain.connect(destination)

      await this.createNoiseDevice()

      musicAudioElement.muted = false
      noiseAudioElement.muted = false
    },

    updateNoiseGain (volume: number) {
      this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
    },
    updateMusicGain (volume: number) {
      this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
    }
  }
}

</script>
