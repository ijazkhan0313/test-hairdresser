<template>
  <div class="player">
    {{ controllValues }}
    <Microphone ref="Microphone" @update:attach="setupMicrophone" />
    <AudioElement
      ref="Noise"
      key="5"
      :src="noise_src"
      title="Noise"
      @update:volume="updateNoiseGain"
      @update:canplay="handleCanPlayNoise"
    >
      <template #default="{}">
        <img style="width: 25px" src="~/assets/image/noiseicon.svg">
      </template>
    </AudioElement>
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
        <img style="width: 25px" src="~/assets/image/musicicon.svg">
      </template>
    </AudioElement>
  </div>
</template>
<script lang="ts">
import AudioElement from '../AudioElement.vue'
import { useAudioStore } from '../../../stores/audio'
import Microphone from '../tests/Microphone.vue'
import { useDevicesStore } from '../../../stores/device'

export default {
  name: 'NoiseMusicGain',
  components: { AudioElement, Microphone },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      createdNodes: {} as any,
      noiseReady: false,
      musicReady: false,
      micReady: false,
      deviceReady: false,
      lagoon_src: window.location.origin + useRuntimeConfig().public.lagoon_src as string,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string,
      fading: false,
      connected: false,
      lastUpdate: Date.now(),
      updateInterval: 125,
      controllValues: new Map() // milliseconds
    }
  },
  methods: {

    // This methodd gets a microphone stream from the micorphone component and creates the microphone node
    // need to be called before the noise device is connected to the audio graph
    setupMicrophone (stream:MediaStream) {
      try {
        this.createdNodes.microphone = this.audioContext.createMediaStreamSource(stream)
        this.micReady = true
      } catch (error: any) {
        this.micReady = false
        throw new Error(error.message)
      }
    },
    async setupDevice () {
      try {
        const deviceStore = useDevicesStore()
        await deviceStore.create3BandDevice('adaptive_masking_controller_NoMusic')
        this.createdNodes.noiseDevice = deviceStore.getDeviceAudioNode('adaptive_masking_controller_NoMusic')
        this.createdNodes.noiseDevice.port.onmessage = this.handleEvent
        this.deviceReady = true
      } catch (error) {
        this.deviceReady = false
      }
    },
    // This method helps to get the ressources free when we stop playing the audio
    // without it would be louder each time we start playing
    refreshAudioContext () {
      const newAudioContext = new AudioContext()
      this.audioContext.close()
      useAudioStore().audioContext = newAudioContext
      this.audioContext = useAudioStore().getContext()
    },

    handleEvent (event:any) {
      const now = Date.now()
      if (now - this.lastUpdate < this.updateInterval) { return } // Skip this update

      if (event.data && Array.isArray(event.data) && event.data.length > 1) {
        const eventDataDetail = event.data[1] // Assuming the relevant data is at index 1
        if (eventDataDetail && eventDataDetail.tag && eventDataDetail.payload && Array.isArray(eventDataDetail.payload)) {
          if (/out[3-9]|out1[01]/.test(eventDataDetail.tag)) {
            this.controllValues.set(eventDataDetail.tag, eventDataDetail.payload[0])
            this.lastUpdate = now
          }
        }
      }
    },
    fadeInGains () {
      // console.log('Fade In Gains')
      const fadeTime = this.audioContext.currentTime + 6.0
      this.fading = true
      const noiseGain = this.createdNodes.noiseGain
      const musicGain = this.createdNodes.musicGain

      noiseGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      musicGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      this.createdNodes.noiseSource.muted = false
      this.createdNodes.musicSource.muted = false
      setTimeout(() => {
        this.fading = false
      }, fadeTime * 1000)
    },
    fadeOutGains () {
      if (this.createdNodes.noiseGain) {
        const noiseGainValue = this.createdNodes.noiseGain.gain.value

        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(noiseGainValue, this.audioContext.currentTime)
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.3)
      }
      if (this.createdNodes.musicGain) {
        const musicGainValue = this.createdNodes.noiseGain.gain.value
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(musicGainValue, this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.3)
      }
    },

    handleCanPlayMusic (state: boolean) {
      // console.log('MusicElemeint has now playingstate: ' + state)
      this.musicReady = state
    },
    handleCanPlayNoise (state: boolean) {
      // console.log('NoiseElement has now playingstate: ' + state)
      this.noiseReady = state
    },
    readyForWebaudio () {
      if (!this.musicReady) {
        // console.log('music not ready')
        return false
      }
      if (!this.noiseReady) {
        // console.log('noise not ready')
        return false
      }
      if (!this.micReady) {
        // console.log('mic not ready')
        return false
      }
      if (!this.deviceReady) {
        // console.log('device not ready')
        return false
      }
      return true
    },
    async handlePlayingUpdate2 (state: boolean) {
      // console.log('A new State reached us, it is a handlingPlay update' + state)
      // console.log('ReadyState of all:' + this.readyForWebaudio())
      if (this.readyForWebaudio()) {
        this.handlePlayingUpdate(state)
      } else {
        if (!this.deviceReady) { await this.setupDevice() }
        if (!this.micReady) {
          // console.log('micophone not yet ready attach it!! ')
          // console.log('microphone attached' + stream)
        }
        if (this.readyForWebaudio()) {
          this.handlePlayingUpdate(state)
        } else {
          // console.log('Waiting for all devices to be ready')
        }
      }
    },
    handlePlayingUpdate (state: boolean) {
      // Stop the music again, mute it and set the noiseReady or musicReady to true
      if (state) {
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

        this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(noiseAudioElement)
        this.createdNodes.musicSource ||= audioContext.createMediaElementSource(musicAudioElement)

        // HERE THE NOISE PATCH COMES INTO PLAY

        this.createdNodes.micSplitter ||= audioContext.createChannelSplitter(2)
        this.createdNodes.noiseInputChannelSplitter ||= audioContext.createChannelSplitter(2)
        // console.log({ currentlyCreatedNodes })
        this.createdNodes.microphone.connect(this.createdNodes.micSplitter)
        this.createdNodes.noiseSource.connect(this.createdNodes.noiseInputChannelSplitter)
        this.createdNodes.micSplitter.connect(this.createdNodes.noiseDevice, 0, 0)
        this.createdNodes.noiseInputChannelSplitter.connect(this.createdNodes.noiseDevice, 0, 1)
        this.createdNodes.noiseInputChannelSplitter.connect(this.createdNodes.noiseDevice, 1, 2)

        this.createdNodes.noiseDevice.connect(this.createdNodes.noiseGain)
        this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

        this.createdNodes.noiseGain.connect(destination)
        this.createdNodes.musicGain.connect(destination)

        this.createdNodes.noiseGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.cancelScheduledValues(this.audioContext.currentTime)

        this.createdNodes.noiseGain.gain.setValueAtTime(0, this.audioContext.currentTime)
        this.createdNodes.musicGain.gain.setValueAtTime(0, this.audioContext.currentTime)

        musicAudioElement.muted = false
        noiseAudioElement.muted = false
        this.connected = true
        this.fadeInGains()
        useAudioStore().playing = true
      } else {
        // Music has just stopped react on it.

        this.fadeOutGains()
        this.createdNodes = []
        this.refreshAudioContext()
        this.connected = false
      }
    },
    mounted () {
      this.addMediaNavigationHandling()
    },
    addMediaNavigationHandling () {
      if ('mediaSession' in navigator) {
        // Play action
        navigator.mediaSession.setActionHandler('play', (_e) => {
          useAudioStore().setPlaying(true)
        })

        // Pause action
        navigator.mediaSession.setActionHandler('pause', (_e) => {
          useAudioStore().setPlaying(false)
        })
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
