<template>
  <div class="player">
    <Microphone ref="Microphone" @update:attach="setupMicrophone" />
    <AudioElement
      ref="Noise"
      key="5"
      :src="noise_src"
      title="Noise"
      @update:volume="updateNoiseGain"
      @update:canplay="handleCanPlayNoise"
      @update:playing="handlePlayingUpdate2"
    >
      <template #default="{}">
        <img v-if="!muted" style="width: 25px" src="~/assets/image/noiseicon.svg" title="Click to mute" @click="toggleMute()">
        <img v-if="muted" style="width: 25px" src="~/assets/image/noiseicon_muted.svg" title="Click to unmute" @click="toggleMute()">
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
  name: 'RNBODevice',
  components: { AudioElement, Microphone },
  emits: ['update:microphoneNode'],
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      createdNodes: {} as any,
      noiseReady: false,
      micReady: false,
      deviceReady: false,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src as string,
      fading: false,
      connected: false,
      muted: false
    }
  },

  methods: {
    toggleMute () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      noiseAudioElement.muted = !noiseAudioElement.muted
      this.muted = noiseAudioElement.muted
    },
    mute () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      noiseAudioElement.muted = true
      this.muted = true
    },
    unmute () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      noiseAudioElement.muted = false
      this.muted = false
    },
    // This methodd gets a microphone stream from the micorphone component and creates the microphone node
    // need to be called before the noise device is connected to the audio graph
    setupMicrophone (stream:MediaStream) {
      try {
        this.createdNodes.microphone ||= this.audioContext.createMediaStreamSource(stream)
        this.micReady = true
        this.$emit('update:microphoneNode', this.createdNodes.microphone)
      } catch (error: any) {
        this.micReady = false
        throw new Error(error.message)
      }
    },
    // This method setup a RNBO Device, it gets the name of the Patch and add the noise audio node to createdNodes
    async setupDevice () {
      try {
        const deviceStore = useDevicesStore()
        await deviceStore.create3BandDevice('adaptive_masking_controller_NoMusic')
        this.createdNodes.noiseDevice = deviceStore.getDeviceAudioNode('adaptive_masking_controller_NoMusic')
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
    fadeInGains () {
      this.unmute()
      // console.log('Fade In Gains')
      if (useAudioStore().playing !== true) { return }
      const fadeTime = this.audioContext.currentTime + 3.0

      setTimeout(() => {
        this.fading = true
        const noiseGain = this.createdNodes.noiseGain
        noiseGain.gain.linearRampToValueAtTime(1.0, fadeTime)
      }, 450)
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
    },

    handleCanPlayNoise (state: boolean) {
      // console.log('NoiseElement has now playingstate: ' + state)
      this.noiseReady = state
    },
    readyForWebaudio () {
      if (!this.noiseReady) {
        return false
      }
      if (!this.micReady) {
        return false
      }
      if (!this.deviceReady) {
        return false
      }
      return true
    },
    async handlePlayingUpdate2 (state: boolean) {
      if (!state) {
        this.mute()
        return
      }
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
        const audioContext = this.audioContext
        const destination = this.audioContext.destination

        this.createdNodes.noiseGain ||= audioContext.createGain()
        this.createdNodes.noiseGain.gain.setValueAtTime(0, audioContext.currentTime)

        this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(noiseAudioElement)

        // HERE THE NOISE PATCH COMES INTO PLAY

        this.createdNodes.micSplitter ||= audioContext.createChannelSplitter(2)
        this.createdNodes.noiseInputChannelSplitter ||= audioContext.createChannelSplitter(2)
        this.createdNodes.microphone.connect(this.createdNodes.micSplitter)
        this.createdNodes.noiseSource.connect(this.createdNodes.noiseInputChannelSplitter)
        this.createdNodes.micSplitter.connect(this.createdNodes.noiseDevice, 0, 0)
        this.createdNodes.noiseInputChannelSplitter.connect(this.createdNodes.noiseDevice, 0, 1)
        this.createdNodes.noiseInputChannelSplitter.connect(this.createdNodes.noiseDevice, 1, 2)

        this.createdNodes.noiseDevice.connect(this.createdNodes.noiseGain)

        this.createdNodes.noiseGain.connect(destination)
        this.createdNodes.noiseGain.gain.cancelScheduledValues(this.audioContext.currentTime)
        this.createdNodes.noiseGain.gain.setValueAtTime(0, this.audioContext.currentTime)
        noiseAudioElement.muted = false
        this.connected = true
        this.fadeInGains()
        useAudioStore().playing = true
      } else {
        // Music has just stopped react on it.
        // console.log('Stop everything webaudio is still running')
        this.fadeOutGains()
        this.createdNodes = []
        this.refreshAudioContext()
        this.connected = false
      }
    },
    updateNoiseGain (volume: number) {
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
      }
    }
  }
}

</script>
