<template>
  <div
    class="container"
    style="display: flex; flex-wrap: wrap; gap:20px"
  >
    <h1>The component is currently not working regarding to the change of buffersource nodes to audioelement source nodes</h1>
    <div v-if="playing == false" class="play yellow" @click.prevent="startPlay">
      <audio id="hiddenAudio" controls style="display:none;" />
    </div>
    <div v-if="playing == true && isStartPlayRunning == false" class="pause yellow" @click.prevent="stopPlay">
      <audio id="hiddenAudio" controls style="display:none;" />
    </div>
    <div v-if="isStartPlayRunning" class="spinner-border spinner-border-sm yellow" role="status">
      <span class="sr-only">"Loading..."</span>
    </div>
    <div class="row">
      <div class="slider">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/noiseicon.svg">
        </div>
        <input
          id="gain-control"
          v-model="outputNoiseGain"
          type="range"
          min="0"
          max="100"
          step="1"
          @wheel="changeNoiseGain"
        >
      </div>
    </div>
    <div class="row">
      <div class="slider">
        <div class="icon">
          <!-- tropic icon -->
          <img style="width: 25px" src="~/assets/image/musicicon.svg">
        </div>
        <input
          id="gain-control"
          v-model="outputMusicGain"
          type="range"
          min="0"
          max="100"
          step="1"
          @wheel="changeMusicGain"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { type Device } from '@rnbo/js'
import { mapActions, mapState } from 'pinia'
import { useAudioStore } from '@/stores/audio'
import { ANC } from '@/stores/interfaces/ANC'
import { HeadsetType } from '@/stores/interfaces/HeadsetType'
import {
  createRNBODevice
} from '@/lib/AudioFunctions'
import { useMicStore } from '@/stores/microphone'
import importedNoisePatcher from '@/assets/patch/noise_patch.export.json'
import importedMusicPatcher from '@/assets/patch/music_patch.export.json'
import { useUserStore } from '~/stores/user'

enum AttenuationFactor{
  OverEarANC = 0.0562,
  OverEar = 0.5623,
  InEar = 0.1778,
  InEarANC = 0.0316
}

interface ComponentData {
  audioContext: AudioContext | null,

  // Howler
  html5AudioPoolSize: number,

  // sources:
  micSource: MediaStreamAudioSourceNode | null,
  noiseAudioSource: AudioBufferSourceNode | null,
  musicAudioSource: AudioBufferSourceNode | null,
  music: Howl | null,

  // RNBO devices:
  noiseDevice: Device | null,
  musicDevice: Device | null,

  // modules:
  noiseGainNode: GainNode | null,
  musicGainNode: GainNode | null,

  // user input:
  outputNoiseGain: number | 0,
  outputMusicGain: number | 0,

  // music splitter node
  musicInputChannelSplitter :ChannelSplitterNode | null,
  noiseInputChannelSplitter: ChannelSplitterNode | null,

  // keep for later:
  micStream: MediaStream | null,

  // fading
  isFading: boolean | false,

  // DEBUG:
  eventLog: string,

  // Button handling to avoid spamming button as long as the audio preossing is busy
  isStopPlayRunning: boolean,
  isStartPlayRunning: boolean,

  // component state:
  // isPlaying: boolean <- replaced with the stored state
  startTime: number
  pauseTime: number
  startOffset: number

  hoveringNoiseSlider: false,
  hoveringMusicSlider: false

}
export default {
  name: 'RNBOPlayer',
  props: {
    scenery: {
      type: String,
      default: 'forest'
    }
  },

  data (): ComponentData {
    return {
      audioContext: null,
      micSource: null,

      // Howler.js
      html5AudioPoolSize: 0,
      music: null,
      noiseAudioSource: null,
      musicAudioSource: null,

      // RNBO devices:
      noiseDevice: null,
      musicDevice: null,

      // modules:
      noiseGainNode: null,
      musicGainNode: null,

      // user input:
      outputNoiseGain: 0.0,
      outputMusicGain: 0.0,

      // music splitter node
      // Music input channel splitter:
      musicInputChannelSplitter: null,
      noiseInputChannelSplitter: null,
      // keep for later:
      micStream: null,

      // fading
      isFading: false,

      // component state:
      // isPlaying: false, replaced with the audio store state
      startTime: 0,
      pauseTime: 0,
      startOffset: 0,

      // Handle state of buttons
      isStopPlayRunning: false,
      isStartPlayRunning: false,

      eventLog: '',
      // audio context playtime

      hoveringNoiseSlider: false,
      hoveringMusicSlider: false
    }
  },

  computed: {
    ...mapState(useAudioStore, ['playing']),
    ...mapState(useUserStore, ['user']),
    normalizedNoiseGain: function () {
      return this.outputNoiseGain / 100.0
    },
    normalizedMusicGain: function () {
      return this.outputMusicGain / 100.0
    }

  },
  watch: {
    scenery () {
      // console.log('Scenery changed to: ' + this.scenery)
    },

    /**
     * This methods watches changes on the music gain slider and use a simple ramp for adaption
     * @param newValue
     */
    async outputMusicGain (newValue) {
      // console.log('Value Music Changed: new Volume is ' + newValue)
      this.outputMusicGain = newValue
      const musicGainNode = this.musicGainNode
      const audioCtx = await useAudioStore().getAudioContext()
      if (musicGainNode && !this.isFading) { musicGainNode.gain.linearRampToValueAtTime(this.normalizedMusicGain, audioCtx.currentTime + 0.5) }
    },

    /**
     * This methods watches changes on the noise gain slider and use a simple ramp for adaption
     * @param newValue
     */
    async outputNoiseGain (newValue) {
      // console.log('Value Noise Changed: new Volume is ' + newValue)
      this.outputNoiseGain = newValue
      const noiseGainNode = this.noiseGainNode
      const audioCtx = await useAudioStore().getAudioContext()
      if (noiseGainNode && !this.isFading) { noiseGainNode.gain.linearRampToValueAtTime(this.normalizedNoiseGain, audioCtx.currentTime + 0.5) }
    }
  },
  beforeUnmount (): void {
    this.slowlyFadeOutAudio(1000)
    useAudioStore().resetAudioContext()
  },

  mounted () {
    const audioStore = useAudioStore()
    const micStore = useMicStore()

    // Change global volume.
    Howler.volume(1)
    // bufferStore.preLoadAudioFiles()
    micStore.getMicrophone()
    this.startPlay()
    this.audioContext = audioStore.getAudioContext()
    const hiddenAudio = document.getElementById('hiddenAudio')
    hiddenAudio?.addEventListener('play', (_e) => {
      // console.log('Eventhandler play  of hiddenAudio: ' + e)
      if (!this.isStartPlayRunning || !useAudioStore().playing) {
        this.startPlay()
      }
    })
    hiddenAudio?.addEventListener('pause', (_e) => {
      // console.log('Eventhandler pause of hiddenAudio: ' + e)
      this.stopPlay()
    })

    if ('mediaSession' in navigator) {
      this.showMediaInformation()
      // Play action
      navigator.mediaSession.setActionHandler('play', (_e) => {
      // Your play action here
        // console.log('Eventhandler play of navigator: ' + e)
        if (!this.isStartPlayRunning === false || !useAudioStore().playing) { this.startPlay() }
      })

      // Pause action
      navigator.mediaSession.setActionHandler('pause', (_e) => {
        this.stopPlay()
      })
      /* CURRENTLY NOT IMPLEMENTED MORE A FEATURE
      // Previous track action
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        const localePath = useLocalePath()
      // Your previous track action here
        if (this.scenery === 'Tropics') { this.scenery }
        localePath('Home' + this.scenery)
    // console.log('Previous track button pressed')
      })

      // Next track action
      navigator.mediaSession.setActionHandler('nexttrack', () => {
      // Your next track action here
    // console.log('Next track button pressed')
      })
 */
    }
  },
  methods: {
    ...mapActions(useAudioStore, ['addNode', 'startAllSources', 'startNode']),
    /**
     * This methods the audio playback
     */
    showMediaInformation () {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.scenery,
          artist: 'Mindboost',
          artwork: [
            { src: '/images/scenery/' + this.scenery + '.jpg', sizes: '96x96', type: 'image/jpeg' }
          ]
        })
      }
    },
    /**
     * This method is called to stop playing music and noise. As audiobuffernodes can only be started once,
     * the audiocontext is used to create new buffernodes.
     * @param audioCtx
     */
    changeNoiseGain (event:WheelEvent): void {
      event.preventDefault()
      // Determine the direction of the scroll
      const delta = Math.sign(event.deltaY)
      if (this.outputNoiseGain - delta < 101 && this.outputNoiseGain - delta > -1) {
        this.outputNoiseGain -= delta
      }
    },
    changeMusicGain (event:WheelEvent): void {
      event.preventDefault()
      // Determine the direction of the scroll
      const delta = Math.sign(event.deltaY)
      if (this.outputMusicGain - delta < 101 && this.outputMusicGain - delta > -1) {
        this.outputMusicGain -= delta
      }
    },

    stopPlay () {
      if (this.isStopPlayRunning) {
        // console.log('StopPlay is already running. Please wait.')
        return
      }
      this.isStopPlayRunning = true
      if (useAudioStore().isPlaying) {
        // console.log('Its play is. Please wait, we stop it')
        this.slowlyFadeOutAudio(1000)
        // this.music?.stop()
      }

      useMicStore().detachMicrophoneSource()
      this.isStopPlayRunning = false
    },
    slowlyFadeOutAudio (duration = 5000) {
      this.isFading = true
      let currentValue = 100
      const targetValue = 0
      const increment = targetValue / (duration / 100) // Calculate how much to increment every 10ms
      this.musicGainNode?.gain.linearRampToValueAtTime(0, duration / 1000) // Convert duration to seconds
      this.noiseGainNode?.gain.linearRampToValueAtTime(0, duration / 1000)
      const intervalId = setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          currentValue = targetValue // Ensure it doesn't go over 100
          clearInterval(intervalId) // Stop the interval
        }
        this.outputNoiseGain = currentValue
        this.outputMusicGain = currentValue
        if (this.musicAudioSource instanceof MediaElementAudioSourceNode) {
          this.musicAudioSource.disconnect()
          this.musicAudioSource = null
        }
        if (this.noiseAudioSource instanceof MediaElementAudioSourceNode) {
          this.noiseAudioSource.disconnect()
          this.noiseAudioSource = null
        }
        useAudioStore().setPlaying(false)
        // console.log(currentValue)
      }, 50) // Update every 50 milliseconds (0.05 second)
      this.isFading = false
    },

    /**
     * raises slowly the sliders to trigger the watcher that fades in the audio
     * @param duration
     */
    slowlyFadeInAudio (duration = 5000) {
      this.isFading = true
      let currentValue = 1
      const targetValue = 100
      const increment = targetValue / (duration / 100) // Calculate how much to increment every 10ms

      const intervalId = setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          currentValue = targetValue // Ensure it doesn't go over 100
          clearInterval(intervalId) // Stop the interval
        }
        this.outputNoiseGain = currentValue
        this.outputMusicGain = currentValue
        // console.log(currentValue)
      }, 30) // Update every 50 milliseconds (0.05 second)
      this.isFading = false
    },
    testHowler () {

    },
    async startPlay () {
      const audioStore = useAudioStore()
      const microStore = useMicStore()
      // const bufferStore = useBufferStore()
      //
      // State management of playing audio
      //
      if (this.isStartPlayRunning) { return } else { this.isStartPlayRunning = true }

      // get the current context
      const audioContext = await useAudioStore().getAudioContext()

      // get inputs
      const mic = await microStore.getMicrophone()
      const microphone = useAudioStore().getMicrophoneNode()
      this.micSource = mic.microphoneNode as MediaStreamAudioSourceNode
      this.micStream = mic.microphoneStream // needed later to stop audio input

      // get audio files:
      /*
      this.noiseAudioSource = await audioStore.getBufferSourceNode('noise')
      this.musicAudioSource = await audioStore.getBufferSourceNode(this.scenery)
      */

      const noiseAudioSource = await audioStore.getBufferSourceNode('noise')
      const musicAudioSource = await audioStore.getBufferSourceNode(this.scenery)

      // const musicAudioSource:AudioNodeItem = await audioStore.getBufferSourceNode(this.scenery)

      // RNBO devices:
      this.musicDevice = await createRNBODevice(audioContext, importedMusicPatcher)
      this.noiseDevice = await createRNBODevice(audioContext, importedNoisePatcher)
      const musicDevice = audioStore.addNode('musicDevice', this.musicDevice.node)
      const noiseDevice = audioStore.addNode('noiseDevice', this.noiseDevice.node)

      // Music input channel splitter:
      this.musicInputChannelSplitter = new ChannelSplitterNode(
        audioContext,
        { numberOfOutputs: 2 }
      )
      const musicInputChannelSplitter = audioStore.addNode('musicInputChannelSplitter', this.musicInputChannelSplitter)

      this.noiseInputChannelSplitter = new ChannelSplitterNode(
        audioContext,
        { numberOfOutputs: 2 }
      )
      const noiseInputChannelSplitter = audioStore.addNode('noiseInputChannelSplitter', this.noiseInputChannelSplitter)

      const musicOutputChannelSplitterNode : ChannelSplitterNode = new ChannelSplitterNode(
        audioContext,
        { numberOfOutputs: 2 }
      )
      const musicOutputChannelSplitter = audioStore.addNode('musicOutputChannelSplitter', musicOutputChannelSplitterNode)

      /**
       *
       * GAIN NODES
       */
      const musicGainNode : GainNode = audioContext.createGain()
      const noiseGainNode : GainNode = audioContext.createGain()
      musicGainNode.gain.value = 0.5
      noiseGainNode.gain.value = 0.5
      this.noiseGainNode = noiseGainNode
      this.musicGainNode = musicGainNode
      const musicGain = audioStore.addNode('musicGainNode', musicGainNode)
      const noiseGain = audioStore.addNode('noiseGainNode', noiseGainNode)
      /**
       * MUSIC PATCH
       */
      try {
        if (microphone && musicDevice) { audioStore.connectNodes(microphone, musicDevice, 0, 0) }
        if (musicAudioSource && musicInputChannelSplitter) { audioStore.connectNodes(musicAudioSource, musicInputChannelSplitter, 0, 0) } // 2
        if (musicDevice && musicInputChannelSplitter) { audioStore.connectNodes(musicInputChannelSplitter, musicDevice, 0, 1) } // 2
        if (musicDevice && musicInputChannelSplitter) { audioStore.connectNodes(musicInputChannelSplitter, musicDevice, 1, 2) } // 1
      } catch (error) {
        // const logger = useNuxtApp().$logger as Logger

        // logger.info('Initializing audio context...')
      }
      // Gains of Music PATCH
      const destination = await audioStore.addNode('destination', audioContext.destination)
      audioStore.connectNodes(musicDevice, musicGain) // 2
      audioStore.connectNodes(musicGain, destination) // 2

      /**
       * NOISE PATCH
       */
      audioStore.connectNodes(microphone, noiseDevice, 0, 0)

      audioStore.connectNodes(noiseAudioSource, noiseInputChannelSplitter, 0, 0) // 2
      audioStore.connectNodes(noiseInputChannelSplitter, noiseDevice, 0, 1) // 1
      audioStore.connectNodes(noiseInputChannelSplitter, noiseDevice, 1, 2) // 1

      // cross connect music to audio devices:
      audioStore.connectNodes(musicDevice, musicOutputChannelSplitter, 0, 0) // 2
      audioStore.connectNodes(musicOutputChannelSplitter, noiseDevice, 0, 3) // 1
      audioStore.connectNodes(musicOutputChannelSplitter, noiseDevice, 1, 4) // 1
      // this.noiseDevice?.node.connect(audioContext.destination, 0, 0) // 2
      audioStore.connectNodes(noiseDevice, noiseGain, 0, 0) // 2

      /**
       * Gain of the noise
       */
      audioStore.connectNodes(noiseGain, destination)
      // noiseGainNode.connect(audioContext.destination)

      /**
       * START ALL SOURCES
       */

      // audioStore.startAllSources()
      // console.error('Audio Source is not defined and cannot be started')

      this.startTime = audioContext.currentTime
      this.pauseTime = 0

      /**
       * Parameters for rnbo device
       */

      const attenuationFactor = this.noiseDevice.parametersById.get('attenuation')
      attenuationFactor.value = getAttenuationFactor('Yes' as ANC, 'OverEar' as HeadsetType)

      this.noiseDevice.messageEvent.subscribe((e) => {
        if (e.tag === 'out7') {
          this.eventLog = e.payload + '\n'
        }
      })
      this.noiseDevice.messageEvent.subscribe((e) => {
        if (e.tag === 'out7') {
          this.eventLog = e.payload + '\n'
        }
      })

      /**
       * DEBUG
       */

      // call the fade in in 3s
      this.slowlyFadeInAudio(3000)
      this.isStartPlayRunning = false
    }
  }
}
function getAttenuationFactor (anc:ANC, ht:HeadsetType): Number {
  useUserStore()
  if (anc === ANC.Yes && ht === HeadsetType.OverEar) { return AttenuationFactor.OverEarANC }
  if (anc === ANC.No && ht === HeadsetType.OverEar) { return AttenuationFactor.OverEar }
  if (anc === ANC.Yes && ht === HeadsetType.InEar) { return AttenuationFactor.InEarANC }
  if (anc === ANC.No && ht === HeadsetType.InEar) { return AttenuationFactor.InEar }
  return 0.5623
}

</script>

<style scoped>

.player {
  background-color: #fff;
  border-radius: 12px;
}
.player button  {
  border-radius: 10px;
  padding: 10px;
}

.container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px; /* Spacing between items */
            width: 225px;
            margin-bottom: 20px;
        }

        .icon, .slider {
            flex: 1 1 100px; /* Flex-grow, flex-shrink, flex-basis */
            display: flex;
            align-items: center; /* Center items vertically */
            justify-content: center; /* Center items horizontally */
        }
        .icon {
    /* Add padding around the icon for margin */
    margin-right: 15px; /* Adjust this value as needed */

    /* Align items if using flexbox */
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon img {
    /* Adjust width and height as needed or keep them auto to maintain aspect ratio */
    width: auto;
    height: 100%; /* Example height, adjust based on your icon size */
}

        .slider input[type=range] {
            width: 100%; /* Full width of its parent */
            background-color: transparent !important;
        }

        @media (min-width: 600px) {
            .row {
                display: flex;
                width: 100%;
            }

            .icon, .slider {
                flex: 1; /* Take up equal space */
            }
        }

/* Styles the track */
input[type="range"]::-webkit-slider-runnable-track {
  background: #e9c046; /* yellow track */
    height: 8px;
    border-radius: 5px;
  }

input[type="range"]::-moz-range-track {
    background: #e9c046; /* yellow track */
    height: 8px;
    border-radius: 5px;
}

input[type="range"]::-ms-track {
    background: #e9c046; /* yellow track */
    border-color: transparent;
    color: transparent;
    height: 8px;
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
