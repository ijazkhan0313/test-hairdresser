<template>
  <div>
    <div class="row">
      <div class="col-12 ">
        <h4 class="text-center fw-bold pt-5">
          {{ t("How is your audio hardware connected?") }}
        </h4>
        <p class="text-center mb-0 pb-0 text-muted">
          {{ t('As input, please select the microphone of your laptop, webcam or mobile device – not of your headphones.') }}
        </p>
        <p class="text-center mt-0 pt-0 text-muted">
          {{ t('To use Mindboost, headphones are required.') }}
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-11 pt-md-4">
        <form>
          <div class="row justify-content-center ">
            <div class="col-md-3 text-center">
              <h6 class="pb-0 mb-0">
                {{ t('Input device:') }}
              </h6>
              <p class="pt-0 mt-0 text-muted pb-0 mb-0" style="font-size: 14px;font-weight: 500">
                ({{ t('select laptop or mobile device microphone') }})
              </p>
              <select v-model="selectedInput" class="form-select pt-1 mt-0 select-box " @change="checkIfSameDevice">
                <option v-for="(item,index) in audioInputDevices" :key="index" :value="index">
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="row justify-content-center pt-3">
            <div class="col-md-3 text-center">
              <h6 class="pb-0 mb-0 ">
                {{ t('Output device:') }}
              </h6>
              <p class="pt-0 mt-0 text-muted pb-0 mb-0" style="font-size: 14px;font-weight: 500">
                {{ t('select headphones or headphone output') }}
              </p>
              <select v-model="selectedOutput" class="form-select pt-1 mt-0 select-box " @change="checkIfSameDevice">
                <option v-for="(item,index) in audioOutputDevices" :key="index" :value="index">
                  {{ item.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="row justify-content-center pt-3">
            <div class="col-md-3 text-center" style="z-index: 1000000;">
              <a href="#" style="z-index: 1000000" class="btn col-4 next-btn" @click.prevent="saveDevices">{{ t("Next") }}</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/stores/user'
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
      bar_val: 100,
      form: {
        soundscape: ''
      },
      audioInputDevices: [],
      audioOutputDevices: [],
      selectedInput: null,
      selectedOutput: null,
      stream: null

    }
  },

  computed: {
    ...mapState(useUserStore, ['audioInputDevice', 'audioOutputDevice'])

  },
  created () {
    try {
      this.getUserMedia().then(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          this.audioInputDevices = devices.filter(device => device.kind === 'audioinput')
          this.audioOutputDevices = devices.filter(device => device.kind === 'audiooutput')

          this.selectedDevice = this.audioInputDevices.length > 0 ? this.audioInputDevices[0].deviceId : null
          this.selectedInput = this.audioInputDevices.findIndex(item => item.deviceId === this.audioInputDevice.deviceId)
          this.selectedOutput = this.audioOutputDevices.findIndex(item => item.deviceId === this.audioOutputDevice.deviceId)

          if (this.selectedInput < 0) { this.selectedInput = 0 }
          if (this.selectedOutput < 0) { this.selectedOutput = 0 }
          if (this.checkIfSameDevice()) { this.$toast.warning(this.t('bluetoothWarning'), { duration: 6000, pauseOnHover: true, dismissible: true, queue: true, position: 'bottom-left' }) }
        })
      })
    } catch (error) {
      this.$toast.error('Error enumerating media devices: ', error)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['saveInputdevice', 'saveOutputDevice']),
    normalizeDeviceName (deviceName) {
      return deviceName
        .replace('Standard - ', '') // Remove 'Standard - '
        .replace(/ \(.*\)$/, '') // Remove any content in parentheses
        .trim()
    },
    checkIfSameDevice () {
      const outputDevice = this.audioOutputDevices[this.selectedOutput] || this.audioOutputDevices[this.index]
      const inputDevice = this.audioInputDevices[this.selectedInput]
      const inputLabel = inputDevice.label
      const outputLabel = outputDevice.label

      if (!inputLabel || !outputLabel) {
        throw new Error('Device labels are not selected or not available')
      }
      const normalizedInput = this.normalizeDeviceName(inputLabel)
      const normalizedOutput = this.normalizeDeviceName(outputLabel)
      // console.log(`Normalized Input: ${normalizedInput}, Normalized Output: ${normalizedOutput}`)
      return normalizedInput === normalizedOutput
    },
    saveDevices () {
      this.saveInputdevice(this.audioInputDevices[this.selectedInput])
      this.saveOutputDevice(this.audioOutputDevices[this.selectedOutput])
      this.$router.push(this.localePath('/onboarding'))
    },
    getUserMedia () {
      const constraints = {
        audio: { deviceId: this.selectedDevice ? { exact: this.selectedDevice } : undefined }
      }

      try {
        return navigator.mediaDevices.getUserMedia(constraints)
      } catch (error) {
        this.$toast.error('Error accessing media devices: ', error)
      }
    }
  },
  saveSetting (value) {
    this.form.soundscape = value
    this.$axios.post('/api/update-setting', this.form).then(({ data }) => {
      this.$toast.success(data)
      if (data.success) {
        this.$toast.success('Success!')
        this.$router.push(this.localePath('onboarding'))
      }
    }).catch(() => {
      this.$toast.error('something went wrong while saving...')
    })
  }
}
</script>

<style scoped>
.bar{
  background-color: #e9c046;
}

.select-box{
  border: 2px solid #e9c046;
  box-shadow: none;
}

.select-box:focus{
  border: 2px solid #e9c046;
  box-shadow: none;

}
.next-btn{
  background: #e9c046;
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 8px 10px;
}
.next-btn:hover{
  background: #e9c046;
  color: white;
}
</style>
