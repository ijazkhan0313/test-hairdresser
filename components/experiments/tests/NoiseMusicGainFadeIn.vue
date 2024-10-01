<template>
  <h1>Test Version NoiseMusicGain and FadeIn: mit WebAudio & Gain, ohne Noise-Patch & ohne Music-Patch</h1>
  <h2> Obwohl die Methode linearRampToValueAtTime verwendet wird, startet das audio einfach nach der eingestellten Zeit ohne fade</h2>
  <button @click="fadeInGains">
    Trigger FadeIn
  </button>
  <button @click="fadeOutGains">
    Trigger FadeOut
  </button>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
    @update:volume="updateNoiseGain"
  >
    <template #default="{}">
      <img style="width: 25px" src="~/assets/image/noiseicon.svg">
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
      <img style="width: 25px" src="~/assets/image/musicicon.svg">
    </template>
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
      playing: false,
      paused: false,
      createdNodes: {} as any,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string
    }
  },
  methods: {
    handlePlayingUpdate () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      const musicElement = this.$refs.Music as typeof AudioElement
      const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
      const audioContext = this.audioContext
      const destination = this.audioContext.destination

      this.createdNodes.musicGain ||= audioContext.createGain()
      this.createdNodes.noiseGain ||= audioContext.createGain()

      this.createdNodes.musicGain.gain.setValueAtTime(0, audioContext.currentTime)
      this.createdNodes.noiseGain.gain.setValueAtTime(0, audioContext.currentTime)

      musicAudioElement.muted = false
      noiseAudioElement.muted = false

      this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
      this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

      this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
      this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

      this.createdNodes.noiseGain.connect(destination)
      this.createdNodes.musicGain.connect(destination)

      this.fadeInGains()
    },
    fadeInGains () {
      const noiseGain = this.createdNodes.noiseGain
      const musicGain = this.createdNodes.musicGain
      noiseGain.gain.linearRampToValueAtTime(1.0, noiseGain.context.currentTime + 7)
      musicGain.gain.linearRampToValueAtTime(1.0, musicGain.context.currentTime + 5)
    },
    fadeOutGains () {
      this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0, this.createdNodes.noiseGain.context.currentTime + 3)
      this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.createdNodes.musicGain.context.currentTime + 3)
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
