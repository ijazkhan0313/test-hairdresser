<template>
  <div>
    <video-background
      src="/video/bg-video.mp4"
      style=" height: 100vh;"
      poster="/images/poster.png"
    >
      <div class="container-fluid  pt-3">
        <div class="row">
          <div class="col-12 col-lg-3 text-center text-sm-start">
            <nuxt-link class="navbar-brand" to="/">
              <img src="/mindboostlogo.svg" height="35" class="img " alt="imae">
            </nuxt-link>
          </div>
          <!-- Showing the inpout by the microphone in a simplified bar chart -->
          <div class="col-12 text-center d-flex justify-content-center col-lg-12 pt-1">
            <div class="progress mx-auto   mt-2 " style="width: 50%;height: 12px">
              <div
                class="progress-bar bar"
                style="transition: 0.1s !important;"
                :style="{width:bar_width+'%'}"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>

          <div class="col-12 pt-3">
            <h6 class="text-muted text-center">
              {{ t("We are analyzing your background noise...") }}
            </h6>
          </div>
        </div>

        <NuxtPage page-key="child" />

        <div class="row pt-5 mt-0 mt-sm-4 " style="position: fixed;bottom: 0px;left: 0;right: 0">
          <div class="col-12 text-center pt-5 mt-3   pb-2 mb-2">
            <NuxtLink class="btn btn-warning px-2 mx-1" exact-active-class="px-4 mx-2" :to="localePath('/onboarding/selectinput')" />
            <NuxtLink class="btn btn-warning px-2" exact-active-class="px-4 mx-2" :to="localePath('/onboarding')" />
            <NuxtLink class="btn btn-warning px-2 mx-2" exact-active-class="px-4 mx-2" :to="localePath('/onboarding/onboarding2')" />
            <NuxtLink class="btn btn-warning px-2 " exact-active-class="px-4 mx-2" :to="localePath('/onboarding/onboarding3')" />
            <NuxtLink class="btn btn-warning px-2 mx-2" exact-active-class="px-4 mx-2" :to="localePath('/onboarding/onboarding4')" />
            <h6 class="text-muted text-center pt-3">
              {{ t("You can customize your selection later") }}
            </h6>
          </div>
        </div>
      </div>
    </video-background>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { useAudioStore } from '@/stores/audio'
import { useMicStore } from '@/stores/microphone'
export default {
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      t,
      localePath
    }
  },
  data () {
    return {
      bar_val: 25,
      bar_width: 0,
      analyser: null,
      dataArray: null
    }
  },
  computed: {
    ...mapState(useCounterStore, ['count']),
    ...mapState(useAudioStore, ['audioContext'])
  },
  beforeUnmount () {
    useMicStore().detachMicrophoneSource()
  },
  mounted () {
    try {
      this.getAudioContext().then(async (audioContext) => {
        const mic = await useMicStore().getMicrophone()
        const source = mic.microphoneNode
        this.analyser = audioContext.createAnalyser()
        source.connect(this.analyser)
        this.analyser.fftSize = 2048
        const bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(bufferLength)
        this.updateMeter()
      })
    } catch (error) {
      this.$toast.error('Error connecting to the microphone')
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['increment']),
    ...mapActions(useCounterStore, ['decrement']),
    ...mapActions(useAudioStore, ['getAudioContext']),
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
    }
  }
}
</script>

<style>
.bar{
  background-color: #e9c046 !important;
}
.checklabel{
  background-color: white !important;
  width: 150px ;
  height: 134px ;
}
.px-4{
  transition: 1s;
}
</style>
