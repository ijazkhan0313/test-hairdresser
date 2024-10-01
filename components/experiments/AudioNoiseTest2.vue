<template>
  <div class="rnboplayer">
    <button v-if="preparedForWebAudio" @click="fixAudio">
      fix Audio
    </button>
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
      connect Noise
    </button>
    <button v-if="preparedForWebAudio" @click="connectNodes">
      connect Nodes
    </button>
    <button v-if="preparedForWebAudio" @click="disconnectMusicNodes">
      disconnnect Music Nodes
    </button>

    <div v-if="selectedAudioTitle">
      <AudioElement
        :ref="selectedAudio.title"
        :key="selectedAudio.id"
        :src="selectedAudio.src"
        :title="selectedAudio.title"
        @update:playing="handlePlayingUpdate"
        @volume="changeMusicVolume"
      >
        <template #default="{ play, pause }">
          <div class="icon">
            <!-- tropic icon -->
            <img style="width: 25px" src="~/assets/image/musicicon.svg">
          </div>
          <div style="display:none">
            <button v-if="!isPlaying()" @click="play">
              Play
            </button>
            <button v-else @click="pause">
              Pause
            </button>
          </div>
        </template>
      <!-- Slot content for AudioElement, if needed -->
      </AudioElement>
    </div>
    <AudioElement
      ref="Noise"
      key="5"
      :src="sourceNoiseURL"
      title="Noise"
      @volume="changeNoiseVolume"
    >
      <template #default="{ play, pause }">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/noiseicon.svg">
        </div>
        <div style="display:none">
          <button v-if="!isPlaying()" @click="play">
            Play
          </button>
          <button v-else @click="pause">
            Pause
          </button>
        </div>
      </template>
    </AudioElement>
  </div>
</template>

<script>
import AudioElement from '@/components/experiments/AudioElement.vue'
import importedMusicPatcher from '@/assets/patch/music_patch.export.json'
import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'
import importedTestPatcher from '@/assets/patch/test_patch.export.json'
import { createRNBODevice } from '@/lib/AudioFunctions'
import { ANC } from '~/stores/interfaces/ANC'
import { HeadsetType } from '~/stores/interfaces/HeadsetType'
import { useUserStore } from '~/stores/user'

function getAttenuationFactor (anc, ht) {
  useUserStore()
  if (anc === ANC.Yes && ht === HeadsetType.OverEar) { return 0.0562 }
  if (anc === ANC.No && ht === HeadsetType.OverEar) { return 0.5623 }
  if (anc === ANC.Yes && ht === HeadsetType.InEar) { return 0.1778 }
  if (anc === ANC.No && ht === HeadsetType.InEar) { return 0.0316 }
  return 0.5623
}

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
      musicPatch: importedMusicPatcher,
      noisePatch: importedNoisePatcher,
      audioContext: null,
      toggleMute: false
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
    // console.log('render AudioNoiseTest-----------' + props.title)
  },
  beforeUnmount () {
    this.disconnectNodes()
    if (this.audioContext) { this.audioContext.close() }
    this.audioContext = null
  },
  beforeMount () {
    this.audioContext = new AudioContext()
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
    fixAudio () {
      // console.log('fixAudio')
      // console.log(' ||||| noiseAudioElement ', { noiseAudioElement }, '      musicAudioElement ', { musicAudioElement })
      // console.log('||||| volume noise ' + noiseAudioElement.volume + '      volume music ' + musicAudioElement.volume)
      // console.log('||||| playstate noise ' + noiseAudioElement.autoplay + '      playstate music ' + musicAudioElement.autoplay)
      // console.log('||||| muted noise ' + noiseAudioElement.muted + '      playstate music ' + musicAudioElement.muted)
      // console.log('||||| gain noise ' + this.createdNodes.noiseGain.gain.value + '      gain music ' + this.createdNodes.musicGain.gain.value)
      this.connectToGainToDestination()
      this.unmute()
      // this.connectDirectToDestination() // brings the sound back
    },
    connectDirectToDestination () {
      this.createdNodes.noiseSource.connect(this.createdNodes.noiseSource.context.destination)
      this.createdNodes.musicSource.connect(this.createdNodes.musicSource.context.destination)
    },
    connectToGainToDestination () {
      this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
      this.createdNodes.musicSource.connect(this.createdNodes.musicGain)
      this.createdNodes.noiseGain.gain.setValueAtTime(0, this.createdNodes.noiseGain.context.currentTime)
      this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0.8, this.createdNodes.noiseGain.context.currentTime + 3)
      this.createdNodes.musicGain.gain.setValueAtTime(0, this.createdNodes.noiseGain.context.currentTime)
      this.createdNodes.musicGain.gain.linearRampToValueAtTime(0.8, this.createdNodes.musicGain.context.currentTime + 3)
      this.createdNodes.noiseGain.connect(this.createdNodes.noiseGain.context.destination)
      this.createdNodes.musicGain.connect(this.createdNodes.musicGain.context.destination)
    },
    mute () {
      // Assuming gainNode is an instance of GainNode and audioContext is your AudioContext
      let newValue = 0.5 // The new gain value you want to ramp to
      const rampDuration = 0.1 // Duration of the ramp in seconds
      const currentTime = this.audioContext.currentTime
      if (this.toggleMute) {
        newValue = 0
        const noiseAudioElement = this.$refs[this.currentElement.title].audioElement
        const musicAudioElement = this.$refs.Noise.audioElement
        noiseAudioElement.volume = 0
        musicAudioElement.volume = 0
        musicAudioElement.muted = true
        noiseAudioElement.muted = true
        this.createdNodes.musicGain.gain.setValueAtTime(this.createdNodes.musicGain.gain.value, currentTime) // Start at the current value
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(newValue, currentTime + rampDuration)
        this.createdNodes.noiseGain.gain.setValueAtTime(this.createdNodes.noiseGain.gain.value, currentTime) // Start at the current value
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(newValue, currentTime + rampDuration)
        this.toggleMute = false
      } else {
        newValue = 1
        this.toggleMute = true
        const noiseAudioElement = this.$refs[this.currentElement.title].audioElement
        const musicAudioElement = this.$refs.Noise.audioElement
        noiseAudioElement.volume = 1
        musicAudioElement.volume = 1
        musicAudioElement.muted = false
        noiseAudioElement.muted = false
        this.createdNodes.musicGain.gain.setValueAtTime(this.createdNodes.musicGain.gain.value, currentTime) // Start at the current value
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(newValue, currentTime + rampDuration)
        this.createdNodes.noiseGain.gain.setValueAtTime(this.createdNodes.noiseGain.gain.value, currentTime) // Start at the current value
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(newValue, currentTime + rampDuration)
      }
    },
    unmute () {
      const noiseAudioElement = this.$refs[this.currentElement.title].audioElement
      const musicAudioElement = this.$refs.Noise.audioElement
      noiseAudioElement.volume = 1
      musicAudioElement.volume = 1
      musicAudioElement.muted = false
      noiseAudioElement.muted = false
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
    skip (direction) {
      const nextSong = this.getSong(this.selectedAudioTitle, direction)
      this.selectAudioByTitle(nextSong.title)
    },
    updateCurrentElement (title) {
      this.currentElement = this.audioList.find(e => e.title === title)
    },
    selectAudioByTitle (title) {
      this.selectedAudioTitle = title
      // const audioElement = this.audioList.find(e => e.title === this.selectedAudioTitle)
      this.currentElement = this.audioList[this.audioList.findIndex(e => e.title === title)]
      // console.log('refs ', refs)
      // console.log('currentElement: ', this.selectedAudioTitle)
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
    connectMusicNode () {
      const {
        microphoneSource, musicSplitter,
        outputSplitter, musicSource, musicDevice
      } = this.createdNodes
      musicSource.connect(musicSplitter)
      microphoneSource.connect(musicDevice, 0, 0)
      musicSplitter.connect(musicDevice, 0, 1) // 1 channel: Left
      musicSplitter.connect(musicDevice, 1, 2) // 1 channel: Right
      musicDevice.connect(outputSplitter, 0, 0)
      outputSplitter.connect(outputSplitter.context.destination)
    },
    async connectTestNode () {
      const testPatch = await createRNBODevice(this.audioContext, importedTestPatcher)
      const testPatchNode = testPatch.node
      const {
        musicSource, musicSplitter, noiseSource, noiseSplitter

      } = this.createdNodes
      musicSource.connect(musicSplitter)
      noiseSource.connect(noiseSplitter)
      noiseSplitter.connect(testPatchNode, 0, 1) // 1 channel: Left
      noiseSplitter.connect(testPatchNode, 1, 2)
      musicSplitter.connect(testPatchNode, 0, 3) // 1 channel: Left
      musicSplitter.connect(testPatchNode, 1, 4) // 1 channel: Right
      testPatchNode.connect(this.audioContext.destination)
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
    connectNoiseNode () {
      const {
        noiseSplitter, microphoneSource, noiseDevice,
        outputSplitter, noiseSource
      } = this.createdNodes

      this.connectMusicDevice()
      noiseSource.connect(noiseSplitter, 0, 0)
      microphoneSource.connect(noiseDevice, 0, 0)
      noiseSplitter.connect(noiseDevice, 0, 1)
      noiseSplitter.connect(noiseDevice, 1, 2) // 2 channels
      outputSplitter.connect(noiseDevice, 0, 3)
      outputSplitter.connect(noiseDevice, 1, 4)
      noiseDevice.connect(this.audioContext.destination)
    },
    connectNodes () {
    // Destructure for easier access
      const {
        musicSource, musicSplitter, microphoneSource,
        musicDevice, outputSplitter, musicGain,
        noiseSource, noiseSplitter, noiseDevice,
        noiseGain
      } = this.createdNodes
      // Assuming all nodes are created and references to them are correct

      // Connect music source to splitter (Stereo to 2 Channels)
      musicSource.connect(musicSplitter) // 2 channels: L, R

      // Connect microphone to musicDevice input 0 (Mono)
      microphoneSource.connect(musicDevice, 0, 0) // 1 channel: Microphone

      // Connect musicSplitter to musicDevice inputs 1 and 2 (Stereo)
      musicSplitter.connect(musicDevice, 0, 1) // 1 channel: Left
      musicSplitter.connect(musicDevice, 1, 2) // 1 channel: Right

      // Connect musicDevice to outputSplitter (Stereo out)
      musicDevice.connect(outputSplitter) // Assuming musicDevice outputs stereo

      // Optionally connect musicDevice to musicGain for additional gain control (Stereo)
      musicDevice.connect(musicGain) // Assuming musicDevice outputs stereo, connected to both channels of musicGain

      // Connect noise source to noiseSplitter (Stereo to 2 Channels)
      noiseSource.connect(noiseSplitter) // 2 channels: L, R

      // Connect microphone to noiseDevice input 0 (Mono)
      microphoneSource.connect(noiseDevice, 0, 0) // 1 channel: Microphone

      // Connect noiseSplitter to noiseDevice inputs 1 and 2 (Stereo)
      noiseSplitter.connect(noiseDevice, 0, 1) // 1 channel: Left
      noiseSplitter.connect(noiseDevice, 1, 2) // 1 channel: Right

      // Connect outputSplitter to noiseDevice inputs 3 and 4 (Stereo from musicDevice)
      outputSplitter.connect(noiseDevice, 0, 3) // 1 channel: Left from musicDevice
      outputSplitter.connect(noiseDevice, 1, 4) // 1 channel: Right from musicDevice

      // Assuming noiseDevice outputs stereo, connect to noiseGain (Stereo)
      noiseDevice.connect(noiseGain) // Assuming noiseDevice outputs stereo, connected to both channels of noiseGain
      const attenuation = noiseDevice.parametersById.get('attenuation')
      attenuation.value = getAttenuationFactor('Yes', 'OverEar')
      noiseGain.connect(this.audioContext.destination)
      musicGain.connect(this.audioContext.destination)
    },
    handlePlayingUpdate (isPlaying) {
      const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)
      let audioContext = this.audioContext ? this.audioContext : new ContextClass()
      let microphoneSource = null
      if (isPlaying) {
        // Web Audio API is available.
        // const musicAudioComponent = this.$refs[this.currentElement.title].audioElement
        if (this.areAllNodesAvailable()) {
          this.disconnectNodes()
          // reconnecting because all Nodes are there
          this.connectNoiseNode()
          this.unmute()
          // console.log('Connected everything because it was there already')
        } else {
          navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false
            },
            video: false
          })
            .then((micStream) => {
              audioContext = this.audioContext
              microphoneSource = audioContext.createMediaStreamSource(micStream)
              this.createdNodes.microphoneSource ||= microphoneSource
              // Return both audioContext and microphoneSource to the next link in the chain
              return { audioContext, microphoneSource }
            })
            .then(({ audioContext, microphoneSource }) => {
              // First RNBO device creation
              return createRNBODevice(audioContext, this.noisePatch).then((noiseRNBODevice) => {
                // console.log({ noiseRNBODevice }, 'Noise RNBODEVICE created: with ' + noiseRNBODevice.node.numberOfInputs + ' inputs and ' + noiseRNBODevice.node.numberOfOutputs + ' outputs')
                this.createdNodes.noiseRNBODevice ||= noiseRNBODevice
                // Return al.then(() => {hen(() => necessary objects for the next step
                return { audioContext, microphoneSource, noiseRNBODevice }
              })
            })
            .then(({ audioContext, microphoneSource, noiseRNBODevice }) => {
              // Second RNBO device creation
              return createRNBODevice(audioContext, this.musicPatch).then((musicRNBODevice) => {
                // console.log({ noiseRNBODevice }, 'Music RNBODEVICE created: with ' + musicRNBODevice.node.numberOfInputs + ' inputs and ' + musicRNBODevice.node.numberOfOutputs + ' outputs')

                // Return all necessary objects for the final setup
                this.createdNodes.musicRNBODevice ||= musicRNBODevice

                return { audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }
              })
            }).then(({ audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }) => {
              // Ensure this.createdNodes is initialized
              this.createdNodes ||= {}
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

              this.createdNodes.musicGain.gain.value = 0.901
              this.createdNodes.noiseGain.gain.value = 0.901 // macht nichts
              musicAudioElement.muted = false
              noiseAudioElement.muted = false
              // this.connectNodes()

              // this.connectTestNode()
            })
            .catch((_error) => {
              this.disconnectNodes()
              if (this.audioContext) {
                this.audioContext.destination.disconnect()
                // audioContext.destination = null
              }
            })
        }
      } else {
        this.disconnectNodes()
      }
    },
    disconnectMusicNodes () {
      const { musicDevice, musicSplitter, musicSource, outputSplitter, musicGain } = this.createdNodes
      // console.log('discconnect Music device')
      musicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2)
      setTimeout(() => {
        musicSource.disconnect()
        // microphoneSource.disconnect()
        musicSplitter.disconnect()
        musicDevice.disconnect()
        outputSplitter.disconnect()
        // console.log('Music device disconnected')
        musicSource.disconnect()
      }, 2100)
    },
    fadeInToNewSoundscape (oldNode, newNode, audioContext, duration = 1) {
    // Create two gain nodes, one for each audio source
      const oldGain = this.createdNodes.musicGain
      const newGain = audioContext.createGain()

      // Initially, the old node is at full volume, and the new one is silent
      oldGain.gain.setValueAtTime(oldGain.value, audioContext.currentTime)
      newGain.gain.setValueAtTime(0, audioContext.currentTime)

      // Connect the nodes
      oldNode.connect(oldGain).connect(audioContext.destination)
      newNode.connect(newGain).connect(audioContext.destination)

      // Schedule the fade out of the old node
      oldGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)
      // Schedule the fade in of the new node
      newGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + duration)

      // Optionally, stop the old node after the fade out
      oldNode.mediaElement.addEventListener('ended', () => {
        oldNode.disconnect()
      })

      // Start playing the new node if it's not already playing
      if (newNode.mediaElement.paused) {
        newNode.mediaElement.play().catch(_error => 'Playback error:', error)
      }
    },
    disconnectNodes () {
      // console.log('DISCONNECT ALL NODES')
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
