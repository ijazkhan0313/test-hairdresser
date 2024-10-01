<template>
  <div class="rnboplayer">
    <button v-if="preparedForWebAudio" @click="skip('next')">
      skip sound
    </button>
    <button v-if="preparedForWebAudio" @click="skip('previous')">
      previous sound
    </button>

    <button v-if="preparedForWebAudio" @click="mute">
      mute AudioElements
    </button>
    <button v-if="preparedForWebAudio" @click="connectMusicDevice">
      connect Music
    </button>
    <button v-if="preparedForWebAudio" @click="connectNoiseNode">
      connect Noise & Music
    </button>
    <button v-if="preparedForWebAudio" @click="disconnectNodes">
      disconnect Nodes
    </button>
    <button v-if="preparedForWebAudio" @click="disconnectMusicNodes">
      disconnnect Music Nodes
    </button>
    <AudioElement
      ref="Noise"
      key="5"
      :src="sourceNoiseURL"
      title="Noise"
      @volume:update="changeNoiseVolume"
    >
      <template #default="{}">
        <!-- tropic icon -->
        <img style="width: 25px" src="~/assets/image/noiseicon.svg">
      </template>
      <!-- Slot content for AudioElement, if needed -->
    </AudioElement>
    <AudioElement
      v-if="selectedAudioTitle"
      :ref="selectedAudio.title"
      :key="selectedAudio.id"
      :src="selectedAudio.src"
      :title="selectedAudio.title"
      @update:playing="handlePlayingUpdate"
      @update:paused="handlePausedUpdate"
      @volume:update="changeMusicVolume"
    >
      <template #default="{ }">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/musicicon.svg">
        </div>
      </template>
      <!-- Slot content for AudioElement, if needed -->
    </AudioElement>
  </div>
</template>

<script>
import AudioElement from '@/components/experiments/AudioElement.vue'
import importedMusicPatcher from '@/assets/patch/music_patch.export.json'
import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'
import importedTestPatcher from '@/assets/patch/test_patch.export.json'
import { createRNBODevice, getAttenuationFactor } from '@/lib/AudioFunctions'
import { useAudioStore } from '~/stores/audio'
import { useUserStore } from '~/stores/user'

export default {
  components: {
    AudioElement
  },
  props: {
    soundscape: {
      type: String,
      default: 'Lagoon'
    }
  },
  data () {
    return {
      audioList: [
        { id: 1, title: 'Lagoon', src: window.location.origin + '/sounds/lagoon.m4a' },
        { id: 2, title: 'Forest', src: window.location.origin + '/sounds/forest.m4a' },
        { id: 3, title: 'Meadow', src: window.location.origin + '/sounds/meadow.m4a' },
        { id: 4, title: 'Tropics', src: window.location.origin + '/sounds/tropics.m4a' }
      ],
      noise: { id: 5, title: 'Noise', src: window.location.origin + '/masking/noise.flac' },
      selectedAudioTitle: '',
      currentElement: {},
      createdNodes: {},
      createdNodesCount: 0,
      noiseRNBODevice: {},
      musicPatch: importedMusicPatcher,
      noisePatch: importedTestPatcher,
      audioContext: null,
      toggleMute: false,
      readyPlayer: false,
      createMusicNodeCounter: 0
    }
  },
  computed: {
    selectedAudio () {
      return this.audioList.find(audio => audio.title === this.selectedAudioTitle) || null
    },
    isPlaying () {
      return useAudioStore().isPlaying()
    },
    preparedForWebAudio () {
      return this.areAllNodesAvailable()
    },
    sourceNoiseURL () {
      return window.location.origin + '/masking/noise.flac'
    }
  },
  onRenderTriggered () {
    // console.log('render AudioNoiseTest-' + props.title)
  },
  watch: {
    createdNodesCount: {
      handler () {
        if (this.areAllNodesAvailable()) {
          // console.log('we are complete with the node generation , lets start the noise once ')
          this.connectNoiseNode()
        }
      },
      deep: true
    }
  },
  beforeUnmount () {
    this.disconnectNodes()
    if (this.audioContext) { this.audioContext.close() }
    this.audioContext = null
  },
  beforeMount () {
    this.audioContext = useAudioStore().getContext()
  },
  mounted () {
    this.selectAudioByTitle(this.audioList[0].title)
    this.currentElement = this.audioList[0]
    this.addUserNavigationHandling()
    this.musicPatch = importedMusicPatcher
    this.noisePatch = importedNoisePatcher
    this.testPatch = importedTestPatcher
  },

  methods: {
    unmute () {
      const musicAudioElement = this.$refs[this.currentElement.title].audioElement
      const noiseAudioElement = this.$refs.Noise.audioElement
      noiseAudioElement.volume = 1
      musicAudioElement.volume = 1
      musicAudioElement.muted = false
      noiseAudioElement.muted = false
      const musicGain = this.createdNodes.musicGain
      const audioContext = this.createdNodes.musicGain.context
      const noiseGain = this.createdNodes.musicGain
      if (musicGain.gain.value === 0) { musicGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 10) }
      noiseGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 10)
      useAudioStore().setPlaying(false)
    },
    changeMusicVolume (newValue) {
      if (!this.createdNodes.musicGain.gain) { return }
      // console.log(this.createdNodes.musicGain.gain)
      this.createdNodes.musicGain.gain.cancelScheduledValues(this.createdNodes.musicGain.context.currentTime)
      this.createdNodes.musicGain.gain.linearRampToValueAtTime(newValue / 100, this.createdNodes.musicGain.context.currentTime + 0.30)
    },
    changeNoiseVolume (newValue) {
      const noiseGain = this.createdNodes.noiseGain
      if (!noiseGain) { return }
      noiseGain.gain.cancelScheduledValues(noiseGain.context.currentTime)
      noiseGain.gain.linearRampToValueAtTime(newValue / 100, noiseGain.context.currentTime + 0.30)
    },
    addUserNavigationHandling () {
      if ('mediaSession' in navigator) {
      // Set the handler for the next track action
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          this.skip('next')
        })

        // Set the handler for the previous track action
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          this.skip('previous')
        })
      }
    },
    getSong (currentTitle, direction) {
      const index = this.audioList.findIndex(song => song.title === currentTitle)
      let adjacentIndex = index + (direction === 'next' ? 1 : -1)
      // Loop back to the first song if 'next' goes beyond the last index
      if (adjacentIndex >= this.audioList.length) {
        adjacentIndex = 0
      } else if (adjacentIndex < 0) {
        adjacentIndex = this.audioList.length - 1
      }
      return this.audioList[adjacentIndex]
    },
    skip (_direction) {
      // console.log('fade out the song')
      const musicGain = this.createdNodes.musicGain
      if (musicGain instanceof GainNode) {
        musicGain.gain.setValueAtTime(musicGain.gain.value, this.createdNodes.musicGain.context.currentTime)
        musicGain.gain.linearRampToValueAtTime(0, musicGain.context.currentTime + 2)
        // console.log('volume of musicAudio ' + musicAudioElement.volume)
      }
      setTimeout(() => {
        // console.log('gain of musicAudio ' + musicGain.gain.value)
      }, 6000)

      // console.log(nextSong)
      /*
       setTimeout(() => {
    // console.log('replace the song')
        this.selectAudioByTitle(nextSong.title)
      }, 2000) */
    },
    selectAudioByTitle (title) {
      this.selectedAudioTitle = title // update the selected Audio what is a reactive prop that triggers rerenderin the Audioelement
      setTimeout(() => {
        this.replaceMusicNode()
        // this line triggers a rerender of the noise audio element what is not what we want
        this.currentElement = this.audioList[this.audioList.findIndex(e => e.title === title)]
      }, 100)
    },
    areAllNodesAvailable () {
    // List of required node keys as you've named them in this.createdNodes
      const requiredNodes = [
        'musicSource', 'musicSplitter', 'microphoneSource',
        'musicDevice', 'outputSplitter', 'musicGain',
        'noiseSource', 'noiseSplitter', 'noiseDevice',
        'noiseGain', 'merger'
      ]

      // Check if each required node exists and is not undefined in this.createdNodes
      return requiredNodes.every(nodeKey => this.createdNodes[nodeKey] !== undefined)
    },
    connectMusicDevice () {
      const { musicDevice, microphoneSource, musicSplitter, musicSource, musicGain, outputSplitter } = this.createdNodes
      // console.log('connect Music device')
      musicSource.connect(musicSplitter, 0, 0)
      // musicSource.connect(musicSource.context.destination)
      microphoneSource.connect(musicDevice, 0, 0)
      musicSplitter.connect(musicDevice, 0, 1)
      musicSplitter.connect(musicDevice, 1, 2)
      musicDevice.connect(musicGain)
      musicDevice.connect(outputSplitter)
      musicGain.connect(this.audioContext.destination)
      // console.log('Music device connected')
      musicGain.gain.value = 1
    },

    //
    // hier Version 2 testen Noise und Music rein, dann Gain
    //

    //
    // hier Version 1 testen Noise und Music Mergen dann Gain
    //

    connectNoiseNode () {
      // console.log('CONNECT NOISE NODE')
      const {
        noiseSplitter, microphoneSource, noiseDevice,
        musicSplitter, noiseSource, noiseGain
      } = this.createdNodes

      this.connectMusicDevice()
      noiseSource.connect(noiseSplitter, 0, 0)
      microphoneSource.connect(noiseDevice, 0, 0)
      noiseSplitter.connect(noiseDevice, 0, 1)
      noiseSplitter.connect(noiseDevice, 1, 2) // 2 channels
      musicSplitter.connect(noiseDevice, 0, 3)
      musicSplitter.connect(noiseDevice, 1, 4)
      const attenuation = this.noiseRNBODevice.parametersById.get('attenuation')
      attenuation.value = getAttenuationFactor()
      noiseDevice.connect(noiseGain)
      noiseGain.connect(noiseGain.context.destination)
      setTimeout(() => {
        this.unmute()
      }, 300)
    },
    connectNoiseNodeOrginal () {
      // console.log('CONNECT NOISE NODE')
      const {
        noiseSplitter, microphoneSource, noiseDevice,
        outputSplitter, noiseSource, noiseGain
      } = this.createdNodes

      this.connectMusicDevice()
      noiseSource.connect(noiseSplitter, 0, 0)
      microphoneSource.connect(noiseDevice, 0, 0)
      noiseSplitter.connect(noiseDevice, 0, 1)
      noiseSplitter.connect(noiseDevice, 1, 2) // 2 channels
      outputSplitter.connect(noiseDevice, 0, 3)
      outputSplitter.connect(noiseDevice, 1, 4)
      const attenuation = this.noiseRNBODevice.parametersById.get('attenuation')
      attenuation.value = getAttenuationFactor()
      noiseDevice.connect(noiseGain)
      noiseGain.connect(noiseGain.context.destination)
      setTimeout(() => {
        this.unmute()
      }, 300)
    },
    handleLoadingUpdate () {
      // console.log('Loaded Audio File we are ready to connect everything')
    },
    handlePlayingUpdate (isPlaying) {
      // console.log('prepared AudioNodes ' + this.createMusicNodeCounter)
      if (!isPlaying) { this.disconnectNodes() } else if (this.areAllNodesAvailable()) {
        this.replaceMusicNode()
      } else {
        // Whatever was before, reset
        if (this.createdNodes.length > 0) {
          this.createdNodes.musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2)
          this.disconnectNodes()
        }
        this.prepareWebAudioNodes()
      }
    },
    prepareWebAudioNodes () {
      this.createMusicNodeCounter++
      const userStore = useUserStore()
      const isAuth = userStore.isAuthenticated
      // Create new Context there might be some nodes missing.
      // const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)
      // console.log('user', { userStore }, { isAuth })
      if (!isAuth) {
        // console.error('User no logged in ')
        return
      }
      //  Take the microphone and all the other nodes and make them available for mindbooost
      navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        },
        video: false
      }).then((micStream) => {
        const audioContext = this.audioContext ? this.audioContext : useAudioStore().getContext()
        const microphoneSource = audioContext.createMediaStreamSource(micStream)
        this.createdNodes.microphoneSource ||= microphoneSource
        // Return both audioContext and microphoneSource to the next link in the chain
        return { audioContext, microphoneSource }
      })
        .then(({ audioContext, microphoneSource }) => {
          // First RNBO device creation
          return createRNBODevice(audioContext, this.testPatch).then((noiseRNBODevice) => {
            this.createdNodes.noiseRNBODevice ||= noiseRNBODevice
            return { audioContext, microphoneSource, noiseRNBODevice }
          })
        })
        .then(({ audioContext, microphoneSource, noiseRNBODevice }) => {
          // Second RNBO device creation
          return createRNBODevice(audioContext, this.musicPatch).then((musicRNBODevice) => {
            this.createdNodes.musicRNBODevice ||= musicRNBODevice

            return { audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }
          })
        }).then(({ audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }) => {
          this.createdNodes ||= {}
          this.noiseRNBODevice = noiseRNBODevice
          const noiseAudioElement = this.$refs.Noise.$refs.audioElement
          const musicAudioElement = this.$refs[this.currentElement.title].$refs.audioElement
          // Assign nodes if they don't exist
          this.createdNodes.microphoneSource ||= microphoneSource
          this.createdNodes.musicDevice ||= musicRNBODevice.node
          this.createdNodes.noiseDevice ||= noiseRNBODevice.node
          this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(noiseAudioElement)
          this.createdNodes.musicSource ||= audioContext.createMediaElementSource(musicAudioElement)
          this.createdNodes.musicSplitter ||= audioContext.createChannelSplitter(2)
          this.createdNodes.noiseSplitter ||= audioContext.createChannelSplitter(2)
          this.createdNodes.outputSplitter ||= audioContext.createChannelSplitter(2)
          this.createdNodes.musicGain ||= audioContext.createGain()
          this.createdNodes.noiseGain ||= audioContext.createGain()
          this.createdNodes.merger ||= audioContext.createChannelMerger(4)
          this.createdNodesCount = this.createdNodes.length
        })
    },
    replaceMusicNode () {
      if (this.areAllNodesAvailable()) {
        const { musicSource, musicGain } = this.createdNodes
        setTimeout(() => {
          const musicAudioElement = this.$refs[this.currentElement.title].$refs.audioElement
          const currentGain = musicGain.gain.value
          const newMusicNode = musicSource.context.createMediaElementSource(musicAudioElement)
          musicSource.disconnect()
          this.connectMusicDevice()
          this.createdNodes.musicSource = newMusicNode
          // newMusicNode.connect(musicSplitter)
          musicGain.gain.linearRampToValueAtTime(currentGain, this.audioContext.currentTime + 2)
        }, 2100)
      }
    },
    disconnectMusicNodes () {
      const { musicDevice, musicSplitter, musicSource, outputSplitter, musicGain, noiseGain } = this.createdNodes
      // console.log('disconnect Music device')
      if (this.areAllNodesAvailable()) {
        if (musicGain instanceof GainNode) { musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2) }
        if (noiseGain instanceof GainNode) { noiseGain.gain.linearRampToValueAtTime(noiseGain.gain.value, this.audioContext.currentTime) }
        setTimeout(() => {
          musicSource.disconnect()
          musicSplitter.disconnect()
          musicDevice.disconnect()
          outputSplitter.disconnect()
          // console.log('Music device disconnected')
          musicSource.disconnect()
        }, 2050)
      } else {
        // console.log('No nodes present to disconnect')
      }
    },
    disconnectNodes () {
      // console.log('DISCONNECT ALL NODES')
      if (this.createdNodes.microphoneSource) { this.createdNodes.microphoneSource.mediaStream.getTracks().forEach(track => track.stop()) }
      // Ensure this.createdNodes is defined and is an object
      if (typeof this.createdNodes === 'object' && this.createdNodes !== null) {
        Object.values(this.createdNodes).forEach((node) => {
        // Check if the node exists and has a disconnect method
          if (node && typeof node.disconnect === 'function') {
            node.disconnect()
          }
          // Additional handling for specific types of nodes, if necessary
          // For example, stopping an OscillatorNode
          if (node instanceof OscillatorNode) {
            node.stop()
          }
        })
      }
      useAudioStore().setPlaying(false)
    }
  }
}
</script>
<style scoped>
.rnboplayer {
  position: fixed;
  width: 220px; /* Or specify a fixed width like 220px if you prefer */
  max-width: 220px; /* This line might be redundant depending on your width strategy */
  height: fit-content;
  display: inline-grid;
  z-index: 2;
  bottom: 11%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
}

.play.yellow {
background: rgba(255, 176, 66, 0.008);
border-radius: 50%;
box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
animation: pulse-yellow 4s infinite;
position: fixed;
bottom: 40%;
width: 200px;
height: 200px;
background-image: url('/images/playbtn.svg');
background-repeat:no-repeat;
background-attachment:fixed;
background-position: 58% 55%;
}
.pause.yellow {
background: rgba(255, 176, 66, 0.008);
border-radius: 50%;
box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
opacity: 0.05;
position: fixed;
bottom: 40%;
width: 200px;
height: 200px;
background-image: url('/images/pausebtn.svg');
background-size: 130px 100px;
background-repeat:no-repeat;
background-attachment:fixed;
background-position: center;
}
.pause.yellow:hover{
  opacity: 0.5;
}

@keyframes pulse-yellow {
0% {
  transform: scale(0.95);
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
}

70% {
  transform: scale(1);
  box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
}

100% {
  transform: scale(0.95);
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
}
}
</style>
