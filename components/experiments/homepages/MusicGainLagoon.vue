<template>
  <div class="player">
    <AudioElement
      ref="Music"
      key="1"
      :src="lagoon_src"
      title="Lagoon"
      @update:volume="updateMusicGain"
      @update:playing="handlePlayingUpdate2"
      @update:canplay="handleCanPlayMusic"
    >
      <template #default="{ }">
        <img v-if="!muted" style="width: 25px" src="~/assets/image/musicicon.svg" title="Click to mute" @click="toggleMute()">
        <img v-if="muted" style="width: 25px" src="~/assets/image/musicicon_muted.svg" title="Click to unmute" @click="toggleMute()">
      </template>
    </AudioElement>
  </div>
</template>
<script lang="ts">
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'

export default {
  name: 'MusicGainLagoon',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      createdNodes: {} as any,
      musicReady: false,

      lagoon_src: window.location.origin + useRuntimeConfig().public.lagoon_src as string,
      fading: false,
      connected: false,
      muted: false
    }
  },
  beforeUnmount () {
    this.disconnectNodes()
  },
  methods: {
    disconnectNodes () {
      if (typeof this.createdNodes === 'object' && this.createdNodes !== null) {
        Object.values(this.createdNodes).forEach((node) => {
        // Check if the node exists and has a disconnect method
          if (node && typeof AudioNode) {
            const tobedisconnected = node as AudioNode
            tobedisconnected.disconnect()
            node = null
          }
        })
        this.createdNodes = null
      }
    },
    toggleMute () {
      const element = this.$refs.Music as typeof AudioElement
      const audioElement = element.$refs.audioElement as HTMLMediaElement
      audioElement.muted = !audioElement.muted
      this.muted = audioElement.muted
    },
    mute () {
      const element = this.$refs.Music as typeof AudioElement
      const audioElement = element.$refs.audioElement as HTMLMediaElement
      audioElement.muted = true
      this.muted = audioElement.muted
    },
    unmute () {
      const element = this.$refs.Music as typeof AudioElement
      const audioElement = element.$refs.audioElement as HTMLMediaElement
      audioElement.muted = false
      this.muted = audioElement.muted
    },
    // This method helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
    refreshAudioContext () {
      const newAudioContext = new AudioContext()
      this.audioContext.close()
      useAudioStore().audioContext = newAudioContext
      this.audioContext = useAudioStore().getContext()
    },
    fadeInGains () {
      if (useAudioStore().playing !== true) { return }
      const fadeTime = this.audioContext.currentTime + 3.0
      this.fading = true
      this.unmute()
      const musicGain = this.createdNodes.musicGain
      this.createdNodes.musicGain.gain.setValueAtTime(0, this.audioContext.currentTime)
      musicGain.gain.linearRampToValueAtTime(1.0, fadeTime)

      setTimeout(() => {
        this.fading = false
      }, fadeTime * 1000)
    },
    fadeOutGains () {
      if (this.createdNodes.musicGain) {
        const musicGainValue = this.createdNodes.musicGainValue.gain.value
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(musicGainValue, this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.3)
      }
    },
    handleCanPlayMusic () {
      // console.log('MusicElemeint has now playingstate: ' + state)
      this.musicReady = true
      this.handlePlayingUpdate(true)
    },
    readyForWebaudio () {
      if (!this.musicReady) {
        // console.log('music not ready')
        return false
      }
      return true
    },
    handlePlayingUpdate2 (state: boolean) {
      if (!state) {
        this.mute()
        return
      }
      if (this.readyForWebaudio()) {
        if (state) {
          this.handlePlayingUpdate(state)
        } else {
          this.fadeOutGains()
        }
      } else if (this.readyForWebaudio()) {
        this.handlePlayingUpdate(state)
      }
    },
    handlePlayingUpdate (state: boolean) {
      if (state) {
        const musicElement = this.$refs.Music as typeof AudioElement
        const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
        const audioContext = this.audioContext
        const destination = this.audioContext.destination
        this.createdNodes.musicGain ||= audioContext.createGain()
        this.createdNodes.musicGain.gain.setValueAtTime(0, audioContext.currentTime)
        if (musicAudioElement.currentSrc !== this.lagoon_src) {
          this.createdNodes.musicSource.disconnect()
          this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)
          this.createdNodes.musicSource.connect(this.createdNodes.musicGain)
          this.createdNodes.musicGain.connect(destination)
        }

        this.createdNodes.musicSource ||= audioContext.createMediaElementSource(musicAudioElement)

        // console.log({ currentlyCreatedNodes })
        this.createdNodes.musicSource.connect(this.createdNodes.musicGain)
        this.createdNodes.musicGain.connect(destination)
        this.createdNodes.musicGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.setValueAtTime(0, this.audioContext.currentTime)

        this.connected = true
        this.fadeInGains()
      } else {
        // Music has just stopped react on it.
        // console.log('Stop everything webaudio is still running')
        this.fadeOutGains()
        this.createdNodes = []
        this.refreshAudioContext()
        this.connected = false
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
