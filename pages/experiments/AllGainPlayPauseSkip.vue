<template>
  <div>
    <h2>Press Space to start, wait few seconds then the sound should start. You will hear the arifacts right after the music begins</h2>
    <h2>These file contain both patches, use Gainsliders of AudioElement to control volume and allow to skip. No AudioStore used</h2>
    <div class="rnboplayer">
      <div v-if="selectedAudioTitle">
        {{ selectedAudio.title }}
        <AudioElement
          :ref="selectedAudio.title"
          :key="selectedAudio.id"
          :src="selectedAudio.src"
          :title="selectedAudio.title"
          @update:playing="handlePlayingUpdate"
          @update:volume="changeMusicVolume"
        >
          <template #default="{}">
            <img style="width: 25px" src="~/assets/image/musicicon.svg">
          </template>
        </AudioElement>
      </div>
      <AudioElement
        :ref="noise.title"
        :key="noise.id"
        :src="noise.src"
        :title="noise.title"
        @update:volume="changeNoiseVolume"
      >
        <template #default="{}">
          <img style="width: 25px" src="~/assets/image/noiseicon.svg">
        </template>
      <!-- Slot content for AudioElement, if needed -->
      </AudioElement>

      <button @click="skip">
        Skip
      </button>
    </div>
  </div>
</template>

<script>
import AudioElement from '@/components/experiments/AudioElement.vue'
import importedMusicPatcher from '@/assets/patch/music_patch.export.json'
import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'
import { createRNBODevice } from '@/lib/AudioFunctions'

// import setupNodes from '@/components/Player/Nodes'
// import { useAudioStore } from '~/stores/audio'
export default {
  components: {
    AudioElement
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
      playState: false
    }
  },
  computed: {
    selectedAudio () {
      return this.audioList.find(audio => audio.title === this.selectedAudioTitle) || null
    },
    isPlaying () {
      return this.playState
    }
  },
  beforeUnmount () {
    this.disconnectNodes()
    if (this.audioContext) { this.audioContext.close() }
    this.audioContext = null
  },
  mounted () {
    this.audioContext = new AudioContext()
    // Example: Select 'Song Three' by default
    this.selectAudioByTitle(this.audioList[0].title)
    this.addUserNavigationHandling()
    this.musicPatch = importedMusicPatcher
    this.noisePatch = importedNoisePatcher
  },
  methods: {
    checkAudioContext () {
      // Check if there are any keys (node names) in the createdNodes object
      if (Object.keys(this.createdNodes).length === 0) {
        return false
      }
      // Check if the 'musicGain' node exists and has a context
      if (this.createdNodes.musicGain && this.createdNodes.musicGain.context) {
        const audioContextOfNodes = this.createdNodes.musicGain.context

        // Compare the contexts
        if (this.audioContext === audioContextOfNodes) {
          // console.log('Same context')
          return true
        } else {
          if (audioContextOfNodes.state === 'closed' || audioContextOfNodes.state === 'suspended') {
            // console.log('AudioContext of nodes is closed or suspended')
            return false
          } else {
            this.audioContext = audioContextOfNodes
          }
          return false
        }
      } else {
        // console.log('musicGain node does not exist or has no context')
        return false
      }
    },
    changeNoiseVolume (volume) {
      if (this.createdNodes.noiseGain) {
        this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
        this.noiseGain = this.createdNodes.noiseGain.gain.value
      }
    },
    changeMusicVolume (volume) {
      if (this.createdNodes.musicGain) {
        this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
        this.musicGain = this.createdNodes.musicGain.gain.value
      }
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
    connectNodes () {
    // Destructure for easier access
      const {
        musicSource, musicSplitter, microphoneSource,
        musicDevice, outputSplitter, musicGain,
        noiseSource, noiseSplitter, noiseDevice,
        noiseGain, merger
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

      // Assuming you want to merge and output both processed signals (Stereo from both musicGain and noiseGain)
      // Connect noiseGain to the first two inputs of the merger (Stereo)
      noiseGain.connect(merger, 0, 0) // 1 channel: Left
      noiseGain.connect(merger, 0, 1) // 1 channel: Right

      // Connect musicGain to the last two inputs of the merger (Stereo)
      musicGain.connect(merger, 0, 2) // 1 channel: Left
      musicGain.connect(merger, 0, 3) // 1 channel: Right

      // Finally, connect the merger to the audio context's destination (Stereo to output)
      merger.connect(merger.context.destination)
    },
    handlePlayingUpdate (isPlaying) {
      const ContextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext)
      const audioContext = this.audioContext ? this.audioContext : new ContextClass()

      let microphoneSource = null
      // console.log('Handling playing update = ' + isPlaying) // true when playing
      if (isPlaying) {
        // Web Audio API is available.
        // const musicAudioComponent = this.$refs[this.currentElement.title].audioElement
        if (this.areAllNodesAvailable() && this.checkAudioContext()) {
          this.disconnectNodes()
          const musicAudioElement = this.$refs[this.currentElement.title].$refs.audioElement
          const musicGainValue = this.createdNodes.musicGain.value
          const noiseGainValue = this.createdNodes.noiseGain.value
          // Prepare the audio elements (unmute)
          this.$refs[this.currentElement.title].$refs.audioElement.muted = false
          this.$refs.Noise.$refs.audioElement.muted = false
          // replace music node because all Nodes are there
          this.createdNodes.musicSource = null
          this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)
          this.connectNodes()

          if (musicGainValue > 0 && musicGainValue <= 1.0) {
            this.createdNodes.musicGain.gain.linearRampToValueAtTime(musicGainValue || 1.0, audioContext.currentTime + 2)
          }
          if (noiseGainValue > 0 && noiseGainValue <= 1.0) {
            this.createdNodes.noiseGain.gain.linearRampToValueAtTime(noiseGainValue || 1.0, audioContext.currentTime + 3)
          }
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
              microphoneSource = this.audioContext.createMediaStreamSource(micStream)
              this.createdNodes.microphoneSource ||= microphoneSource
              // Return both audioContext and microphoneSource to the next link in the chain
              return { audioContext, microphoneSource }
            })
            .then(({ audioContext, microphoneSource }) => {
              // First RNBO device creation
              return createRNBODevice(audioContext, this.noisePatch).then((noiseRNBODevice) => {
                this.createdNodes.noiseRNBODevice ||= noiseRNBODevice
                // Return al.then(() => {hen(() => necessary objects for the next step
                return { audioContext, microphoneSource, noiseRNBODevice }
              })
            })
            .then(({ audioContext, microphoneSource, noiseRNBODevice }) => {
              // Second RNBO device creation
              return createRNBODevice(audioContext, this.musicPatch).then((musicRNBODevice) => {
                // Return all necessary objects for the final setup
                this.createdNodes.musicRNBODevice ||= musicRNBODevice
                return { audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }
              })
            }).then(({ audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }) => {
              const musicElement = this.$refs[this.currentElement.title]
              const musicAudioElement = musicElement.$refs.audioElement

              // Ensure this.createdNodes is initialized
              this.createdNodes ||= {}
              // Assign nodes if they don't exist
              this.createdNodes.microphoneSource ||= microphoneSource
              this.createdNodes.musicDevice ||= musicRNBODevice.node
              this.createdNodes.noiseDevice ||= noiseRNBODevice.node
              this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(this.$refs.Noise.$refs.audioElement)
              this.createdNodes.musicSource ||= audioContext.createMediaElementSource(musicAudioElement)
              this.createdNodes.musicSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.noiseSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.outputSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.musicGain ||= audioContext.createGain()
              this.createdNodes.noiseGain ||= audioContext.createGain()
              this.createdNodes.merger ||= audioContext.createChannelMerger(4)

              musicAudioElement.muted = false
              this.$refs.Noise.$refs.audioElement.muted = false
              this.createdNodes.musicGain.gain.value = 0.0001
              this.createdNodes.noiseGain.gain.value = 0.0001 // macht nichts
              this.connectNodes()
              setTimeout(() => {
                this.playState = true
                this.createdNodes.musicGain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 3)
                this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 4)
              }, 150)
            })
            .catch((_error) => {
              this.disconnectNodes()

              if (this.audioContext) {
                this.audioContext.destination.disconnect()
                // audioContext.destination = null
              }

            //  console.error('Error setting up audio:', error)
            })
        }
      } else {
        this.disconnectNodes()
        const newAudioContext = new AudioContext()
        this.audioContext.close()
        this.audioContext = newAudioContext
      }
    },
    disconnectNodes () {
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
        this.playState = false
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
  height: 100px;
  display: inline-grid;
  z-index: 2;
  bottom: 11%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
