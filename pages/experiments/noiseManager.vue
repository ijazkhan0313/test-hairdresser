<template>
  <div class="rnboplayer">
    <label class="switch">
      <input type="checkbox" :v-model="deviceUsed">
      <span class="slider" />
    </label>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="adaptive pb-3">
          <div class="col-12 ">
            <div class="d-none d-md-block mx-auto  pb-1" style="width: 225px">
              <div class="progress " style="height: 10px">
                <div
                  class="progress-bar bar"
                  role="progressbar"
                  aria-label="Basic example"
                  :style="{width:bar_width+'%'}"
                  style="background-color: #e9c046;transition: 0.1s"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
            <div class="d-flex justify-content-center  mb-1">
              <nuxt-link to="#adaptive-modal" data-bs-target="#adaptive-modal" data-bs-toggle="modal" class="text-muted text-decoration-none fw-bold fs-6 ">
                {{ t('Adaptive soundscape') }} : <span class="" style="color: #e9c046">{{ t('On') }}</span>
              </nuxt-link><span class="ps-3"><i style="padding: 5px 0px;" class="fa-solid text-muted d-flex  fa-chevron-right" /></span>
            </div>
            <div class="d-block d-md-none mx-auto  pb-1" style="width: 225px">
              <div class="progress " style="height: 10px">
                <div
                  class="progress-bar bar"
                  role="progressbar"
                  aria-label="Basic example"
                  :style="{width:bar_width+'%'}"
                  style="background-color: #e9c046;transition: 0.1s"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          </div>
          <BootomBar />
        </div>
      </div>
    </div>
    <div v-if="selectedAudioTitle">
      {{ selectedAudio.title }}
      <AudioElement
        :ref="selectedAudio.title"
        :key="selectedAudio.id"
        :src="selectedAudio.src"
        :title="selectedAudio.title"
        @update:playing="handlePlayingUpdate"
        @volume="changeMusicVolume"
      >
        <template #default="{ }" />
      <!-- Slot content for AudioElement, if needed -->
      </AudioElement>
    </div>
    <AudioElement
      :ref="noise.title"
      :key="noise.id"
      :src="noise.src"
      :title="noise.title"
      @update:playing="handlePlayingUpdate"
      @volume="changeNoiseVolume"
    >
      <template #default="{}" />
      <!-- Slot content for AudioElement, if needed -->
    </AudioElement>

    <button @click="skip">
      Skip
    </button>
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
      t: useI18n,
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
      isPlayerRunning: false,
      checked: false,
      // meter
      meter: null,
      bar_width: 0,
      analyser: null,
      dataArray: null,
      bar_val: 25
    }
  },
  computed: {
    selectedAudio () {
      return this.audioList.find(audio => audio.title === this.selectedAudioTitle) || null
    },
    deviceUsed () {
      return this.isPlayerRunning
    }

  },
  beforeUnmount () {
    this.disconnectNodes()
    if (this.audioContext) { this.audioContext.close() }
    this.audioContext = null
  },
  mounted () {
    this.audioContext = new AudioContext()
    this.currentElement = this.audioList[0]
    // Example: Select 'Song Three' by default
    this.selectAudioByTitle(this.audioList[0].title)
    this.addUserNavigationHandling()
    this.musicPatch = importedMusicPatcher
    this.noisePatch = importedNoisePatcher
  },
  methods: {
    changeMusicVolume (newValue) {
      if (!this.createdNodes.musicGain.gain) { return }
      // console.log(this.createdNodes.musicGain.gain)
      this.createdNodes.musicGain.gain.cancelScheduledValues(this.createdNodes.musicGain.context.currentTime)
      this.createdNodes.musicGain.gain.setValueAtTime(newValue / 100, this.createdNodes.musicGain.context.currentTime + 0.01)
    },
    changeNoiseVolume (newValue) {
      if (!this.createdNodes.noiseGain.gain) { return }
      this.createdNodes.noiseGain.gain.setValueAtTime(newValue / 100, this.createdNodes.noiseGain.context.currentTime + 0.01)
      // this.createdNodes.noiseGain.gain.value = newValue / 100
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
    updateMeter () {
      requestAnimationFrame(this.updateMeter)
      this.analyser.getByteFrequencyData(this.dataArray)
      const rms = this.getRMS(this.dataArray)
      let level = 20 * Math.log10(rms / 128)
      level = Math.max(0, Math.min(100, level + 100))
      // bar.style.width = level + '%';

      this.bar_width = level
    },
    getRMS (dataArray) {
      let rms = 0
      for (let i = 0; i < dataArray.length; i++) {
        rms += dataArray[i] * dataArray[i]
      }
      rms /= dataArray.length
      rms = Math.sqrt(rms)
      return rms
    },
    connectNodes () {
    // Destructure for easier access
      const audioCtx = this.createdNodes.microphoneSource.context
      this.analyser = audioCtx.createAnalyser()
      this.createdNodes.microphoneSource.connect(this.analyser)
      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(bufferLength)
      this.updateMeter()

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
      let audioContext = this.audioContext ? this.audioContext : new ContextClass()
      let microphoneSource = null
      // console.log('Handling playing update = ' + isPlaying) // true when playing
      if (isPlaying) {
        // Web Audio API is available.
        // const musicAudioComponent = this.$refs[this.currentElement.title].audioElement
        if (this.areAllNodesAvailable()) {
          this.disconnectNodes()
          // reconnecting because all Nodes are there
          this.connectNodes()
          this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 2)
          this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(1.0, audioContext.currentTime + 3)
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
              audioContext = new ContextClass()
              microphoneSource = audioContext.createMediaStreamSource(micStream)
              this.createdNodes.microphoneSource ||= microphoneSource
              // Return both audioContext and microphoneSource to the next link in the chain
              // console.log('Step 1 Micstream created')
              return { audioContext, microphoneSource }
            })
            .then(({ audioContext, microphoneSource }) => {
              // First RNBO device creation
              return createRNBODevice(audioContext, this.noisePatch).then((noiseRNBODevice) => {
                this.createdNodes.noiseRNBODevice ||= noiseRNBODevice
                // Return al.then(() => {hen(() => necessary objects for the next step
                // console.log('Step 2 AudioContext, NoiseDevice und MicSource created')
                return { audioContext, microphoneSource, noiseRNBODevice }
              })
            })
            .then(({ audioContext, microphoneSource, noiseRNBODevice }) => {
              // Second RNBO device creation
              return createRNBODevice(audioContext, this.musicPatch).then((musicRNBODevice) => {
                // Return all necessary objects for the final setup
                this.createdNodes.musicRNBODevice ||= musicRNBODevice
                // console.log('Step 3 AudioContext, NoiseDevice, musicDevice und MicSource created')
                return { audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }
              })
            }).then(({ audioContext, microphoneSource, noiseRNBODevice, musicRNBODevice }) => {
              // Ensure this.createdNodes is initialized
              this.createdNodes ||= {}
              // Assign nodes if they don't exist
              this.createdNodes.microphoneSource ||= microphoneSource
              this.createdNodes.musicDevice ||= musicRNBODevice.node
              this.createdNodes.noiseDevice ||= noiseRNBODevice.node
              this.createdNodes.noiseSource ||= audioContext.createMediaElementSource(this.$refs.Noise.$refs.audioElement)
              this.createdNodes.musicSource ||= audioContext.createMediaElementSource(this.$refs[this.currentElement.title].$refs.audioElement)
              this.createdNodes.musicSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.noiseSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.outputSplitter ||= audioContext.createChannelSplitter(2)
              this.createdNodes.musicGain ||= audioContext.createGain()
              this.createdNodes.noiseGain ||= audioContext.createGain()
              this.createdNodes.merger ||= audioContext.createChannelMerger(4)

              this.createdNodes.musicGain.gain.value = 0.001
              this.createdNodes.noiseGain.gain.value = 0.001 // macht nichts
              this.connectNodes()
              this.createdNodes.musicGain.gain.exponentialRampToValueAtTime(0.5, audioContext.currentTime + 3)
              this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(0.5, audioContext.currentTime + 4)
            })
            .catch((_error) => {
              // this.disconnectNodes()
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
    disconnectNodes () {
    // Ensure this.createdNodes is defined and is an object
      if (this.createdNodes !== null) {
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
  height: 100px;
  display: inline-grid;
  z-index: 2;
  bottom: 11%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

</style>
