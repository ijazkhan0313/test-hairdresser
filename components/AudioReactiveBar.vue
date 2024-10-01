<template>
  <div class="progress" style="height: 10px">
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
</template>

<script>
import { mapState } from 'pinia'
import { useMicStore } from '@/stores/microphone'
export default {
  components: {
  },
  data () {
    return {
      t: useI18n,
      // meter
      meter: null,
      bar_width: 0,
      analyser: null,
      dataArray: null,
      bar_val: 25
    }
  },
  computed: {
    ...mapState(useMicStore, 'microphone')
  },
  beforeUnmount () {
    this.disconnectNodes()
    if (this.audioContext) { this.audioContext.close() }
    this.audioContext = null
  },
  mounted () {
    // console.log('mounted ', this.microphone)
    useMicStore().getMicrophone().then((mic) => {
      // console.log('Microphone ready')
      const audioCtx = mic.microphoneNode.context
      this.analyser = audioCtx.createAnalyser()
      mic.microphoneNode.connect(this.analyser)
      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(bufferLength)
      this.updateMeter()
    })
  },
  methods: {
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
  <style scoped>
  </style>
