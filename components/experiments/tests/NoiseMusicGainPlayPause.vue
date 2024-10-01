<template>
  <h1>Test Version NoiseMusicGain: mit WebAudio & Gain und PlayPause, ohne Noise-Patch & ohne Music-Patch</h1>
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
    {{ musicGain }}
  </div>
  <div v-else>
    No MusicGain
  </div>
  <div v-if="createdNodes.noiseGain">
    {{ noiseGain }}
  </div>
  <div v-else>
    No noiseGain
  </div>
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
import AudioElement from '../AudioElement2.vue'
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
      fading: false,
      noiseReady: false,
      musicReady: false,
      musicGain: 0,
      noiseGain: 0,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string
    }
  },
  mounted () {
    this.monitorGainNodes()
  },
  methods: {
    monitorGainNodes () {
      // This could be an interval or a direct method call in your gain changing methods
      setInterval(() => {
        if (this.createdNodes.musicGain) {
          this.musicGain = this.createdNodes.musicGain.gain.value
        }
        if (this.createdNodes.noiseGain) {
          this.noiseGain = this.createdNodes.noiseGain.gain.value
        }
      }, 100) // Update every 100 ms, adjust interval as necessary
    },
    // This method helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
    refreshAudioContext () {
      const newAudioContext = new AudioContext()
      this.audioContext.close()
      useAudioStore().audioContext = newAudioContext
      this.audioContext = useAudioStore().getContext()
    },
    fadeOutGains () {
      // console.log('Fade OUT Gains')
      // Define the duration of the fade out
      const fadeDuration = 2.0 // 2 seconds for fade out
      const currentTime = this.audioContext.currentTime
      const fadeEndTime = currentTime + fadeDuration

      this.fading = true

      if (this.createdNodes.noiseGain) {
        // Cancel scheduled values to clear any previous scheduled changes
        this.createdNodes.noiseGain.gain.cancelScheduledValues(currentTime)
        // Set the current value
        this.createdNodes.noiseGain.gain.setValueAtTime(this.createdNodes.noiseGain.gain.value, currentTime)
        // Schedule the fade out
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0, fadeEndTime)
        this.noiseGain = 0
      }

      if (this.createdNodes.musicGain) {
        // Cancel scheduled values to clear any previous scheduled changes
        this.createdNodes.musicGain.gain.cancelScheduledValues(currentTime)
        // Set the current value
        this.createdNodes.musicGain.gain.setValueAtTime(this.createdNodes.musicGain.gain.value, currentTime)
        // Schedule the fade out
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, fadeEndTime)
        this.playing = false
      }
      setTimeout(() => {
        this.fading = false
      }, fadeDuration * 1000)
    },
    fadeInGains () {
      // console.log('Fade In Gains')
      const fadeTime = this.audioContext.currentTime + 6.0
      this.fading = true
      const noiseGain = this.createdNodes.noiseGain
      const musicGain = this.createdNodes.musicGain
      this.createdNodes.noiseSource.muted = false
      this.createdNodes.musicSource.muted = false
      noiseGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      musicGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      this.noiseGain = noiseGain.gain.value
      this.musicGain = musicGain.gain.value
      this.playing = true
      setTimeout(() => {
        this.fading = false
      }, fadeTime * 1000)
    },

    handlePlayingUpdate (state: boolean) {
      // console.log(`Audio Element is ${state ? 'Playing' : 'Not Playing'}`)
      if (!this.musicReady && !this.noiseReady) {
        // console.log('not yet ready' + this.musicReady + ' ready noise' + this.noiseReady)
        return
      }
      if (state && useAudioStore().isPlaying()) {
        // Everytime a AudioTag starts playing it is muted, because we want to control everything in web audio
        // Music has just started react on it.
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

        musicAudioElement.volume = 1.0
        noiseAudioElement.volume = 1.0

        this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
        this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

        this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
        this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

        this.createdNodes.noiseGain.connect(destination)
        this.createdNodes.musicGain.connect(destination)

        this.fadeInGains()
      } else {
        if (this.fading && this.createdNodes.noiseGain && this.createdNodes.musicGain) {
          this.createdNodes.noiseGain.gain.cancelScheduledValues(this.createdNodes.noiseGain.currentTime)
          this.createdNodes.musicGain.gain.cancelScheduledValues(this.createdNodes.musicGain.currentTime)
        }
        // Music has just stopped react on it.

        setTimeout(() => {
          this.playing = false
          this.createdNodes = []
          this.refreshAudioContext()
        }, 2000)
      }
    },
    updateNoiseGain (volume: number) {
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
        this.noiseGain = this.createdNodes.noiseGain.gain.value
      }
    },
    updateMusicGain (volume: number) {
      if (this.createdNodes.musicGain) {
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
        this.musicGain = this.createdNodes.musicGain.gain.value
      }
    }
  }
}

</script>
