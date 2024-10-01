<template>
  <h1>Test Version NoiseMusicGain: mit WebAudio & Gain und PlayPause, Laden von Devices</h1>
  <h2>Play State: {{ playing }} </h2>
  <p>
    The method refreshAudioContext helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
  </p>
  <p>
    Whenever I view this page the audio starts playing, when I hit 'space' it fades out within 2seconds
    when i start playing again nothing happens... I would expect playing.
  </p>

  <div v-if="createdNodes.musicGain">
    {{ createdNodes.musicGain.gain.value }}
  </div>
  <div v-if="createdNodes.noiseGain">
    {{ createdNodes.noiseGain.gain.value }}
  </div>
  <AudioElement
    ref="Microphone"
    key="6"
    src="window.location.origin + /sounds/debug/LMusik_RSprache.mp3"
    title="Microphone"
    @update:volume="updateNoiseGain"
  >
    <template #default="{}">
      <div class="icon">
        <img style="width: 25px" src="~/assets/image/headphone.png">
      </div>
    </template>
  </AudioElement>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
    @update:volume="updateNoiseGain"
    @update:loaded="noiseReady=true"
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
    @update:fadeout="fadeOutGains"
    @update:loaded="musicReady=true"
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
import { type Device } from '@rnbo/js'
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'
import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'
import importedMusicPatcher from '@/assets/patch/music_patch.export.json'
import { createRNBODevice } from '@/lib/AudioFunctions'
import setupNodes from '~/components/Player/Nodes'
export default {
  name: 'NoiseMusicGain',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      playing: false,
      paused: false,
      createdNodes: {} as any,
      fading: false,
      noiseReady: false,
      musicReady: false,
      musicDevice: {} as Device,
      noiseDevice: {} as Device,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string
    }
  },
  async beforeMount () {
    this.noiseDevice = await createRNBODevice(this.audioContext, importedNoisePatcher)
    this.musicDevice = await createRNBODevice(this.audioContext, importedMusicPatcher)
    // console.log('beforeMount: created RNBO devices ', this.musicDevice, this.noiseDevice)
  },
  mounted () {

  },
  methods: {
    // This method helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
    refreshAudioContext () {
      const newAudioContext = new AudioContext()
      this.audioContext.close()
      useAudioStore().audioContext = newAudioContext
      this.audioContext = useAudioStore().getContext()
    },
    fadeOutGains () {
      const fadeTime = this.audioContext.currentTime + 1.3
      this.fading = true
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 3)
      }
      if (this.createdNodes.musicGain) {
        this.createdNodes.musicGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 3)
      }
      setTimeout(() => {
        this.fading = false
      }, fadeTime * 1000)
    },
    fadeInGains () {
      const fadeTime = this.audioContext.currentTime + 6
      this.fading = true
      const noiseGain = this.createdNodes.noiseGain
      const musicGain = this.createdNodes.musicGain
      noiseGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      musicGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      setTimeout(() => {
        this.fading = false
      }, fadeTime * 1000)
    },

    async handlePlayingUpdate (state: boolean) {
      if (!this.musicReady && !this.noiseReady) {
        // console.log('not yet ready' + this.musicReady + ' ready noise' + this.noiseReady)
        return
      }
      if (state && useAudioStore().isPlaying()) {
        // Music has just started react on it.
        const noiseElement = this.$refs.Noise as typeof AudioElement
        const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
        const musicElement = this.$refs.Music as typeof AudioElement
        const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
        const audioContext = this.audioContext

        this.createdNodes.musicGain ||= audioContext.createGain()
        this.createdNodes.noiseGain ||= audioContext.createGain()

        this.createdNodes.musicGain.gain.setValueAtTime(0, audioContext.currentTime)
        this.createdNodes.noiseGain.gain.setValueAtTime(0, audioContext.currentTime)

        musicAudioElement.muted = false
        noiseAudioElement.muted = false

        this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
        this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

        const gains = await setupNodes(this.createdNodes.noiseSource, this.createdNodes.musicSource)

        this.createdNodes.musicGain = gains.pop() // Order is important frost music then noiseGains
        this.createdNodes.noiseGain = gains.pop()
        // console.log('GAINVALUES M:' + this.createdNodes.musicGain.gain.value, '    N:' + this.createdNodes.noiseGain.gain.value)

        this.fadeInGains()
      } else {
        if (this.fading) { return }

        // Music has just stopped react on it.
        this.playing = false
        setTimeout(() => {
          this.createdNodes = []
          this.refreshAudioContext()
        }, 1500)
      }
    },
    updateNoiseGain (volume: number) {
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
      }
    },
    updateMusicGain (volume: number) {
      if (this.createdNodes.musicGain) {
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
      }
    }
  }
}

</script>
