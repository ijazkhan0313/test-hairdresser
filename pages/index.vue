<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-0 mx-0">
          <video-background
            poster="/images/posters/poster1.png"
            src="/video/Lagoon.mp4"
            style=" height: 100vh;"
            preload="auto"
          >
            <home-bar :title="t(currentTitle)" @update:soundscape="changeSoundscape" />
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="adaptive pb-3">
                  <MusicGainLagoon v-if="currentIndex == 2" ref="Lagoon" />
                  <MusicGainTropic v-if="currentIndex == 1" ref="Tropics" />
                  <MusicGainForest v-if="currentIndex == 0" ref="Forest" />
                  <MusicGainMeadow v-if="currentIndex == 3" ref="Meadow" />
                  <RNBODevice v-if="true" @update:microphone="changeSoundscape" />
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
                      <nuxt-link
                        to="#adaptive-modal"
                        data-bs-target="#adaptive-modal"
                        data-bs-toggle="modal"
                        class="text-muted text-decoration-none fw-bold fs-6 "
                      >
                        {{ t('Adaptive soundscape') }}: <span class="" style="color: #e9c046">{{ t('On') }}</span>
                      </nuxt-link><span class="ps-3"><i
                        style="padding: 5px 0px;"
                        class="fa-solid text-muted d-flex  fa-chevron-right"
                      /></span>
                    </div>
                    <div class="d-block d-md-none mx-auto  pb-1" style="width: 225px">
                 
                    </div>
                  </div>
                  <BootomBar />
                </div>
              </div>
            </div>
          </video-background>
          <!--            <video  muted id="myVideo" autoplay loop>-->
          <!--              <source src="~/assets/video/bg-video.mp4" type="video/mp4">-->
          <!--              <source src="~/assets/video/bg-video.ogg" type="video/ogg">-->
          <!--              Your browser does not support HTML5 video.-->
          <!--            </video>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'pinia'
import HomeBar from '../components/homebar'
import MusicGainLagoon from '../components/experiments/homepages/MusicGainLagoon'
import MusicGainForest from '../components/experiments/homepages/MusicGainForest'
import MusicGainMeadow from '../components/experiments/homepages/MusicGainMeadow'
import MusicGainTropic from '../components/experiments/homepages/MusicGainTropic'
import RNBODevice from '../components/experiments/homepages/RNBODevice'
import { useAudioStore } from '@/stores/audio'
import { useMicStore } from '@/stores/microphone'
import { useUserStore } from '~/stores/user'
// import AudioReactiveBar from '~/components/audioreactivebar'

export default {
  components: { HomeBar, MusicGainLagoon, AudioReactiveBar, MusicGainTropic, MusicGainMeadow, MusicGainForest, RNBODevice },
  setup () {
    definePageMeta({
      middleware: 'auth'
    })
    const { t } = useI18n()
    const localePath = useLocalePath()
    const Tropics = ref(null)
    const Lagoon = ref(null)
    const Meadow = ref(null)
    const Forest = ref(null)

    return {
      t,
      localePath,
      useUserStore,
      Tropics,
      Lagoon,
      Meadow,
      Forest
    }
  },
  data () {
    return {
      bar_width: 0,
      analyser: null,
      dataArray: null,
      bar_val: 25,
      currentIndex: 0,
      currentTitle: 'Lagoon',
      currentRef: null,
      audioMonitor: {},
      user: null
    }
  },
  computed: {
    ...mapState(useAudioStore, ['audioContext']),
    // Berechnete Eigenschaft für die dynamische Übersetzung des Titels

    title () {
      const currentString = this.currentTitle
      return this.$t(currentString)
    }
  },
  beforeMount () {
    const audioStore = useAudioStore()
    this.audioMonitor = setInterval(() => {
      audioStore.checkAndResumeAudioContext()
      if (audioStore.audioContext.state === 'running') { clearInterval(this.audioMonitor) }
    }, 10000)
  },
  mounted () {
    this.addMediaNavigationHandling()
    const user = useUserStore(app.$pinia)
    this.user = user.settings.soundscape
    this.currentTitle = user.settings.soundscape
  },
  attachMicrophoneAnalyser (mic) { // MediaStreamAudioNode
    if (!(mic instanceof AudioNode)) {
      throw new TypeError('Microphone cannot be used, please reload')
    } {
      this.analyser = mic.context.createAnalyser()
      mic.connect(this.analyser)
      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(bufferLength)
      this.updateMeter()
    }
  },

  beforeUnmount () {
    // Stop each track of the microphone stream and reset the AudioContext
    try {
      useMicStore().detachMicrophoneSource()
      useAudioStore().pauseContext()
      clearInterval(this.audioMonitor)
    } catch (_error) {
    // console.log(_error)
    }
  },
  methods: {
    ...mapActions(useAudioStore, ['getAudioContext']),
    setTitleByIndex (index) {
      switch (index) {
        case 0:
          this.currentTitle = 'Lagoon'
          this.currentRef = this.$refs.Lagoon
          break
        case 1:
          this.currentTitle = 'Tropics'
          this.currentRef = this.$refs.Tropics
          break
        case 2:
          this.currentTitle = 'Forest'
          this.currentRef = this.$refs.Forest
          break
        case 3:
          this.currentTitle = 'Meadow'
          this.currentRef = this.$refs.Meadow
          break
      }
    },
    changeSoundscape (soundscape) {
      let newSoundscape = 0
      if (soundscape === 'x') {
        newSoundscape = 1
        this.currentTitle = 'Tropics'
        this.currentRef = this.$refs.Tropics
      }
      if (soundscape === 'Lagoon') {
        newSoundscape = 0
        this.currentTitle = 'Lagoon'
        this.currentRef = this.$refs.Lagoon
      }
      if (soundscape === 'Forest') {
        newSoundscape = 2
        this.currentTitle = 'Forest'
        this.currentRef = this.$refs.Forest
      }
      if (soundscape === 'Meadow') {
        newSoundscape = 3
        this.currentTitle = 'Meadow'
        this.currentRef = this.$refs.Meadow
      }
      this.currentIndex = newSoundscape
      this.$nextTick().then(() => {
        this.unmuteActive()
      })
    },
    setupMicrophone (microphoneNode) {
      const mic = microphoneNode
      const audioCtx = mic.context
      this.analyser = audioCtx.createAnalyser()
      mic.connect(this.analyser)
      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(bufferLength)
      this.$nextTick().then(() => {
        this.updateMeter()
      })
    },
    // Sketchy but working... best would not stopping the noise
    unmuteActive () {
      useAudioStore().setPlaying(false)
      setTimeout(() => {
        useAudioStore().setPlaying(true)
      }, 50)
    },
    handleAnimation: function (anim) {
      this.anim = anim
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
        // Pause action
        navigator.mediaSession.setActionHandler('nexttrack', (_e) => {
          if (this.currentIndex < 3) { // Check if currentIndex is less than the maximum index (3)
            this.currentIndex++
          } else {
            this.currentIndex = 0
          }
          this.$nextTick().then(() => {
            this.setTitleByIndex(this.currentIndex)
            this.unmuteActive()
          })
        })
        // Pause action
        navigator.mediaSession.setActionHandler('previoustrack', (_e) => {
          if (this.currentIndex < 1) {
            this.currentIndex = 3
          } else {
            this.currentIndex--
          }
          this.$nextTick().then(() => {
            this.setTitleByIndex(this.currentIndex)
            this.unmuteActive()
          })
        })
      }
    },
    updateMeter () {
      requestAnimationFrame(this.updateMeter)
      this.analyser.getByteFrequencyData(this.dataArray)
      const rms = this.getRMS(this.dataArray)
      let level = 20 * Math.log10(rms / 128)
      level = Math.max(0, Math.min(100, level + 100))
      // bar.style.width = level + '%'
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
    }

  }
}
</script>

<style>
#myVideo{
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;

  padding: 0;
  margin: 0;
  z-index: -99;
}
.adaptive{
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
}
.rnboplayer{
  position:sticky;
  width: 225px;
  height: inherit;
  display:flex;
  float: bottom;
}

</style>
