<template>
  <div>
    <client-only>
      <div class="container">
        <div class="row">
          <div class="col-md-3 form-group">
            <label>Attack Time:</label>
            <input v-model="attackTime" type="text" class="form-control" placeholder="Enter time ramp to increase or decrease smoothing">
          </div>
          <div class="col-md-3 form-group">
            <label>Release Time:</label>
            <input v-model="releaseTime" type="text" class="form-control" placeholder="Enter time ramp to increase or decrease smoothing">
          </div>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <label for="input-devices">Input Devices:</label>
              <select id="input-devices" v-model="selectedInputDevice" @change="updateInputDevice">
                <option v-for="device in inputDevices" :key="device.deviceId" :value="device.deviceId">
                  {{ device.label }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="output-devices">Output Devices:</label>
              <select id="output-devices" v-model="selectedOutputDevice" @change="updateOutputDevice">
                <option v-for="device in outputDevices" :key="device.deviceId" :value="device.deviceId">
                  {{ device.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="home">
              <button class="btn btn-success" @click="StartButtonPressed">
                Start
              </button>
              <VueMeter
                :val="RecentLevelValue"
              />

              <div><CircleProgress :size="80" :percent="height" :viewport="true" :is-gradient="true" /></div>
              Masking Gain : <input
                id="gain-control"
                v-model="maxGain1000"
                type="range"
                min="0"
                max="1"
                step="0.01"
              >
              Harmonic Gain : <input
                id="gain-control"
                v-model="harmonicGain"
                type="range"
                min="0"
                max="1"
                step="0.01"
              >
              <div class="row">
                <div class="col-md-2">
                  <p>Mili Seconds: {{ totalms }}</p>
                </div>
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Band Frequency</th>
                    <th>Percentile</th>
                    <th>Result ABC</th>
                    <th>Masking Gain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Global</td>
                    <td>{{ Percentile_Global.percentile }}</td>
                    <td>{{ Percentile_Global.result }}</td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td>Bandpass 65</td>
                    <td>{{ Percentile_65.percentile }}</td>
                    <td>{{ Percentile_65.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 125</td>
                    <td>{{ Percentile_125.percentile }}</td>
                    <td>{{ Percentile_125.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 250</td>
                    <td>{{ Percentile_250.percentile }}</td>
                    <td>{{ Percentile_250.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 500</td>
                    <td>{{ Percentile_500.percentile }}</td>
                    <td>{{ Percentile_500.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 1000</td>
                    <td>{{ Percentile_1000.percentile }}</td>
                    <td>{{ Percentile_1000.result }}</td>
                    <td>{{ maskingGain1000 }}</td>
                  </tr>
                  <tr>
                    <td>Bandpass 2000</td>
                    <td>{{ Percentile_2000.percentile }}</td>
                    <td>{{ Percentile_2000.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 4000</td>
                    <td>{{ Percentile_4000.percentile }}</td>
                    <td>{{ Percentile_4000.result }}</td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td>Bandpass 8000</td>
                    <td>{{ Percentile_8000.percentile }}</td>
                    <td>{{ Percentile_8000.result }}</td>
                    <td>--</td>
                  </tr>

                  <tr>
                    <td>Bandpass 16000</td>
                    <td>{{ Percentile_16000.percentile }}</td>
                    <td>{{ Percentile_16000.result }}</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              {{ LevelValues }}
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'
export default {
  name: 'HomeView',
  components: {
    CircleProgress
  },
  emits: ['inputstream'],
  data () {
    return {
      selectedInputDevice: '',
      selectedOutputDevice: '',
      inputDevices: [],
      outputDevices: [],
      timeRamp: 11,

      // This object holds all state of the app
      classes: [
        ['h1', 'Heading 1', '6rem', '300', '-.015625em', -1],
        ['h2', 'Heading 2', '3.75rem', '300', '-.0083333333em', 0],
        ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
        ['h4', 'Heading 4', '2.125rem', '400', '.0073529412em', 2],
        ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
        ['h6', 'Heading 6', '1.25rem', '500', '.0125em', 3],
        ['subtitle-1', 'Subtitle 1', '1rem', '400', '.009375em', 4],
        ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '.0071428571em', 4],
        ['body-1', 'Body 1', '1rem', '400', '.03125em', 4],
        ['body-2', 'Body 2', '0.875rem', '400', '.0178571429em', 4],
        ['button', 'Button', '0.875rem', '500', '.0892857143em', 4],
        ['caption', 'Caption', '0.75rem', '400', '.0333333333em', 4],
        ['overline', 'Overline', '0.75rem', '500', '.1666666667em', 4]
      ],
      // meineReaktiveVariable: "Leon",
      AlteSeite: 0,
      NeueSeite: 0,

      pdf: 0,
      valid: true,
      Vorname: '',
      Nachname: '',
      nameRules: [
        v => !!v || 'Feld muss ausgefüllt sein'
      ],
      Anrede: '',
      Mail: '',
      emailRules: [
        v => !!v || 'Feld muss ausgefüllt sein',
        v => /.+@.+\..+/.test(v) || 'Eingabe ungültig'
      ],
      Firma: '',
      Raum: '',
      Zusatzinfos: '',

      date: {},
      time: {},

      Timeframe: 125,
      timeHeight: 0,
      UpperPercentile: 0.9,
      LowerPercentile: 0.1,
      LimitA: 2.5,
      LimitB: 10.0,

      totalms: 0,
      audioCtx: {},
      source: {},

      stream: {},
      Gain: {},
      HPF: {},
      LPF: {},
      BandPass_65: {},
      BandPass_125: {},
      BandPass_250: {},
      BandPass_500: {},
      BandPass_1000: {},
      BandPass_2000: {},
      BandPass_4000: {},
      BandPass_8000: {},
      BandPass_6000: {},
      analyser: {},
      LevelAnalyser: {},
      LevelBuffer: {},
      AnalyserbandPass65: {},
      AnalyserbandPass125: {},
      AnalyserbandPass250: {},
      AnalyserbandPass500: {},
      AnalyserbandPass1000: {},
      AnalyserbandPass2000: {},
      AnalyserbandPass4000: {},
      AnalyserbandPass8000: {},
      AnalyserbandPass16000: {},
      bandPass65Buffer: [],
      bandPass125Buffer: [],
      bandPass250Buffer: [],
      bandPass500Buffer: [],
      bandPass1000Buffer: [],
      bandPass2000Buffer: [],
      bandPass4000Buffer: [],
      bandPass8000Buffer: [],
      bandPass16000Buffer: [],
      AnimationID: {},
      id: {},

      bufferLength: {},
      dataArray: {},
      RecentRMS: 0,
      RecentRMS65: 0,
      RecentRMS125: 0,
      RecentRMS250: 0,
      RecentRMS500: 0,
      RecentRMS1000: 0,
      RecentRMS2000: 0,
      RecentRMS4000: 0,
      RecentRMS8000: 0,
      RecentRMS16000: 0,
      ByteToDecimal: 0,
      RecentLevelValue: 0,
      RecentLevelValue65: 0,
      RecentLevelValue125: 0,
      RecentLevelValue250: 0,
      RecentLevelValue500: 0,
      RecentLevelValue1000: 0,
      RecentLevelValue2000: 0,
      RecentLevelValue4000: 0,
      RecentLevelValue8000: 0,
      RecentLevelValue16000: 0,

      ArrayCounter: 0,
      LevelValues: [],
      LevelValues65: [],
      LevelValues125: [],
      LevelValues250: [],
      LevelValues500: [],
      LevelValues1000: [],
      LevelValues2000: [],
      LevelValues4000: [],
      LevelValues8000: [],
      LevelValues16000: [],
      CummulatedLevelValues: 0,
      CummulatedLevelValues65: 0,
      CummulatedLevelValues125: 0,
      CummulatedLevelValues250: 0,
      CummulatedLevelValues5000: 0,
      CummulatedLevelValues1000: 0,
      CummulatedLevelValues2000: 0,
      CummulatedLevelValues4000: 0,
      SortedArray: [],
      SortedArray65: [],
      IndexMax: {},
      IndexMin: {},
      PercentileValue: {},
      Percentile_65: {},
      Percentile_125: {},
      Percentile_250: {},
      Percentile_500: {},
      Percentile_1000: {},
      Percentile_2000: {},
      Percentile_4000: {},
      Percentile_8000: {},
      Percentile_16000: {},
      Percentile_Global: {},

      height: 0,
      value: 1,
      secondsDown: 25,

      Result: {},
      ResultABC: {},

      MicError: 0,
      bandPass1: {},
      bandPass125: {},
      bandPass250: {},
      bandPass500: {},
      bandPass1000: {},
      bandPass2000: {},
      bandPass4000: {},
      bandPass8000: {},
      bandPass16000: {},
      lastArrayCouhter: 0,
      firstArrayCounter: 0,
      data125CountArray: [],
      dt125counter: 0,
      source100: {},
      Gain1000: {},
      SoundNode: {},
      maxGain1000: 0.5,
      lastGainValue: 0,
      maskingGain1000: 0,
      harmonicGain: 1,
      harmonicGainNode: {},
      currentDestination: {},
      compressorNode: {},
      attackTime: 25,
      releaseTime: 30,
      targetValue: 0,
      currentValue: 0
    }
  },
  mounted () {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.inputDevices = devices.filter(device => device.kind === 'audioinput')
      this.outputDevices = devices.filter(device => device.kind === 'audiooutput')

      if (this.inputDevices.length > 0) {
        this.selectedInputDevice = this.inputDevices[0].deviceId
        // this.updateInputDevice();
      }

      if (this.outputDevices.length > 0) {
        this.selectedOutputDevice = this.outputDevices[0].deviceId
        // this.updateOutputDevice();
      }
    })
  },

  methods: {
    updateInputDevice () {
      const constraints = {
        audio: {
          deviceId: { exact: this.selectedInputDevice },
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.$emit('inputstream', stream)
        this.stream = stream
        if (this.source) {
          this.source.disconnect()
        }
        this.source = this.audioCtx.createMediaStreamSource(this.stream)
      })
    },
    updateOutputDevice () {
      this.audioCtx.setSinkId(this.selectedOutputDevice)
    },
    // Write your own functions that mutate data via `this.`
    nextPage () {
      // this.seite = (this.seite + 1) % 3;
      this.AlteSeite = this.NeueSeite
      this.NeueSeite = (this.NeueSeite + 1)
    },
    firstPage () {
      this.AlteSeite = this.NeueSeite
      this.NeueSeite = 0
    },
    previousPage () {
      this.NeueSeite = this.AlteSeite
      this.AlteSeite = (this.AlteSeite - 1)
      this.pdf = 0
    },

    pdfForm () {
      this.pdf = 1
    },

    about () {
      this.AlteSeite = this.NeueSeite
      this.NeueSeite = 10
    },

    ResetLevelValues () {
      this.ArrayCounter = 0
      this.LevelValues = []
      this.LevelValues65 = []
      this.LevelValues125 = []
      this.LevelValues250 = []
      this.LevelValues500 = []
      this.LevelValues1000 = []
      this.LevelValues2000 = []
      this.LevelValues4000 = []
      this.LevelValues8000 = []
      this.LevelValues16000 = []
    },

    RMStoDBFS (InputArray) {
      for (let i = 0; i < InputArray.length; i++) {
        if (typeof InputArray[i] !== 'number' || InputArray[i] <= 0) {
          // console.log("InputArray[" + i + "] is not a valid number or <=0, skipping...");
          continue
        }
        InputArray[i] = 20 * Math.log10(InputArray[i])
      }
    },

    numSort (a, b) {
      return (a - b)
    },
    DBFStoRMS (dbfsValue, referenceLevel = -18) {
      const rmsValue = Math.pow(10, (dbfsValue - referenceLevel) / 20)
      return rmsValue
    },

    RMStoGain (rmsValue) {
      const gainValue = Math.sqrt(rmsValue)
      return gainValue
    },

    Percentile (InputArray, band = 0) {
      const tempArray = [...InputArray]
      this.SortedArray = tempArray.sort(this.numSort)

      this.RMStoDBFS(this.SortedArray)
      // console.log(this.SortedArray);

      // console.log('Sortiertes Array DBFS: ' + SortedArray);

      this.IndexMax = Math.round(this.SortedArray.length * this.UpperPercentile)
      this.IndexMin = Math.round(this.SortedArray.length * this.LowerPercentile)
      this.PercentileValue = this.SortedArray[this.IndexMax] - this.SortedArray[this.IndexMin]

      // this.PercentileValue = this.PercentileValue.toFixed(2); //nach zwei Dazimalstellen abbrechen
      // console.log('percentile Value = ' + this.PercentileValue);

      if (this.PercentileValue < this.LimitA) {
        this.Result = 1
        this.ResultABC = 'A'
      } else if (this.PercentileValue < this.LimitB) {
        this.Result = 2
        this.ResultABC = 'B'
      } else {
        this.Result = 3
        this.ResultABC = 'C'
      }
      // console.log('seite = ' + this.seite);

      this.NeueSeite = 4

      return { percentile: this.PercentileValue, result: this.ResultABC, band }
    },
    reset25 () {

      // this.LevelValues65.splice(0,this.firstArrayCounter);
      // this.LevelValues125.slice(this.firstArrayCounter);
      // this.LevelValues250.slice(this.firstArrayCounter);
      // this.LevelValues500.slice(this.firstArrayCounter);
      // this.LevelValues1000.slice(this.firstArrayCounter);
      // this.LevelValues2000.slice(this.firstArrayCounter);
      // this.LevelValues4000.slice(this.firstArrayCounter);
      // this.LevelValues8000.slice(this.firstArrayCounter);
      // this.LevelValues16000.slice(this.firstArrayCounter);

      //
      // this.ArrayCounter=this.LevelValues65.length;
      // console.log("Real Array Counter",this.ArrayCounter);

    },

    stopmeasurement () {
      window.cancelAnimationFrame(this.AnimationID)
      clearInterval(this.id)
      // console.log('Measurement stopped.')
      this.height = 0
      this.secondsDown = 25
      this.CummulatedLevelValues = 0
      this.CummulatedLevelValues65 = 0
    },

    frame () {
      this.Percentile_Global = this.Percentile(this.LevelValues, 0)
      this.Percentile_65 = this.Percentile(this.LevelValues65, 65)
      this.Percentile_125 = this.Percentile(this.LevelValues125, 125)
      this.Percentile_250 = this.Percentile(this.LevelValues250, 250)
      this.Percentile_500 = this.Percentile(this.LevelValues500, 500)
      this.Percentile_1000 = this.Percentile(this.LevelValues1000, 1000)
      this.Percentile_2000 = this.Percentile(this.LevelValues2000, 2000)
      this.Percentile_4000 = this.Percentile(this.LevelValues4000, 4000)
      this.Percentile_8000 = this.Percentile(this.LevelValues8000, 8000)
      this.Percentile_16000 = this.Percentile(this.LevelValues16000, 16000)

      this.height++
    },

    startmeasurement () {
      // this.visualize();
      this.ResetLevelValues()

      const today = new Date()
      this.date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()
      this.time = today.getHours() + ':' + today.getMinutes()
      // requestAnimationFrame(this.RecentLevel);
      this.height = 0
      requestAnimationFrame(this.RecentLevel)
      // setTimeout(()=>{
      //   this.id = setInterval(this.frame, this.Timeframe);
      // },5000)

      // this.frame();

      this.id = setInterval(() => {
        if (this.timeHeight > 40) {
          this.frame()

          const linearGain = (this.Percentile_1000.percentile - 0) / (10 - 0)
          // const linearGain = (Math.pow(10, this.Percentile_1000.percentile / 20))*0.5;
          // this.envelop(this.maxGain1000*this.Percentile_1000.percentile);
          this.envelop(linearGain)

          // console.log('Linear Gian', linearGain)
          // this.logarithmicSmooth(linearGain,5,10);
        }

        ++this.timeHeight
        this.totalms += 125

        // console.log('Lendgt',this.LevelValues.length);
        // this.data125CountArray[this.dt125counter]=this.ArrayCounter;
        // ++this.dt125counter;
        // // console.log('Array',this.data125CountArray);
        // console.log(this.data125CountArray);
        // console.log(this.Percentile_Global.percentile);

        this.harmonicGainNode.gain.setValueAtTime(this.harmonicGain, this.audioCtx.currentTime)
      }, this.Timeframe)
    },
    envelop (targetValue) {
      const now = this.audioCtx.currentTime
      // Cancel all previous Schedule
      this.Gain1000.gain.cancelScheduledValues(now)
      // Set the value for the previous gain
      this.Gain1000.gain.setValueAtTime(this.currentValue, now)
      // Linear ramp to the the attack time normal 25s
      this.Gain1000.gain.linearRampToValueAtTime(targetValue, now + this.attackTime)
      // Set Target
      this.Gain1000.gain.setTargetAtTime(targetValue, now + this.attackTime, this.releaseTime)
      // Store the current value for the next iteration
      this.currentValue = this.Gain1000.gain.value

      // console.log('Current Value', this.currentValue)

      // Use the target value for audio processing or as needed
      // console.log('Target Value:', targetValue)
    },
    CancleMeasurement () {
      this.stopmeasurement()
      this.previousPage()
      this.MicError = 0
    },
    Reset125 () {
      this.LevelValues65.shift()
      this.ArrayCounter = this.LevelValues65.length
    },

    // RMS Value
    RecentLevel () {
      this.LevelAnalyser.getByteTimeDomainData(this.LevelBuffer)
      this.AnalyserbandPass65.getByteTimeDomainData(this.bandPass65Buffer)
      this.AnalyserbandPass125.getByteTimeDomainData(this.bandPass125Buffer)
      this.AnalyserbandPass250.getByteTimeDomainData(this.bandPass250Buffer)
      this.AnalyserbandPass500.getByteTimeDomainData(this.bandPass500Buffer)
      this.AnalyserbandPass1000.getByteTimeDomainData(this.bandPass1000Buffer)
      this.AnalyserbandPass2000.getByteTimeDomainData(this.bandPass2000Buffer)
      this.AnalyserbandPass4000.getByteTimeDomainData(this.bandPass4000Buffer)
      this.AnalyserbandPass8000.getByteTimeDomainData(this.bandPass8000Buffer)
      this.AnalyserbandPass16000.getByteTimeDomainData(this.bandPass16000Buffer)
      // console.log('Buffer 1000',this.bandPass1000Buffer);

      for (let i = 0; i < 512; i++) {
        this.ByteToDecimal = (this.LevelBuffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass65Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS65 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass125Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS125 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass250Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS250 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass500Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS500 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass1000Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS1000 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass2000Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS2000 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass4000Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS4000 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass8000Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS8000 += this.ByteToDecimal * this.ByteToDecimal

        this.ByteToDecimal = (this.bandPass16000Buffer[i] - 128) / 128
        // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
        this.RecentRMS16000 += this.ByteToDecimal * this.ByteToDecimal
      }

      // Global
      this.RecentRMS /= 512
      this.RecentLevelValue = Math.sqrt(this.RecentRMS)

      // Freq 65
      this.RecentRMS65 /= 512
      this.RecentLevelValue65 = Math.sqrt(this.RecentRMS65)

      // console.log(this.RecentLevelValue65);
      // Freq 125
      this.RecentRMS125 /= 512
      this.RecentLevelValue125 = Math.sqrt(this.RecentRMS125)

      // Freq 250
      this.RecentRMS250 /= 512
      this.RecentLevelValue250 = Math.sqrt(this.RecentRMS250)

      this.RecentRMS500 /= 512
      this.RecentLevelValue500 = Math.sqrt(this.RecentRMS500)

      this.RecentRMS1000 /= 512
      this.RecentLevelValue1000 = Math.sqrt(this.RecentRMS1000)

      this.RecentRMS2000 /= 512
      this.RecentLevelValue2000 = Math.sqrt(this.RecentRMS2000)

      this.RecentRMS4000 /= 512
      this.RecentLevelValue4000 = Math.sqrt(this.RecentRMS4000)

      this.RecentRMS8000 /= 512
      this.RecentLevelValue8000 = Math.sqrt(this.RecentRMS8000)

      this.RecentRMS16000 /= 512
      this.RecentLevelValue16000 = Math.sqrt(this.RecentRMS16000)

      if (this.timeHeight > 40) {
        this.LevelValues.shift()
        this.LevelValues65.shift()
        this.LevelValues125.shift()
        this.LevelValues250.shift()
        this.LevelValues500.shift()
        this.LevelValues1000.shift()
        this.LevelValues2000.shift()
        this.LevelValues4000.shift()
        this.LevelValues8000.shift()
        this.LevelValues16000.shift()
      }
      this.LevelValues.push(this.RecentLevelValue)
      this.LevelValues65.push(this.RecentLevelValue65)
      this.LevelValues125.push(this.RecentLevelValue125)
      this.LevelValues250.push(this.RecentLevelValue250)
      this.LevelValues500.push(this.RecentLevelValue500)
      this.LevelValues1000.push(this.RecentLevelValue1000)
      this.LevelValues2000.push(this.RecentLevelValue2000)
      this.LevelValues4000.push(this.RecentLevelValue4000)
      this.LevelValues8000.push(this.RecentLevelValue8000)
      this.LevelValues16000.push(this.RecentLevelValue16000)

      if (this.timeHeight > 50) {
        // this.stopmeasurement();
      }
      // console.log('Level 65',this.LevelValues65.length)

      this.CummulatedLevelValues = this.CummulatedLevelValues + this.RecentLevelValue * 1000
      // if (this.ArrayCounter > 200 && this.CummulatedLevelValues < 50){
      //   this.stopmeasurement();
      //   this.MicError = 1;
      // }

      // if (isNaN(this.RecentLevelValue)
      //     || isNaN(this.RecentLevelValue65)
      //     || isNaN(this.RecentLevelValue125)
      //     || isNaN(this.RecentLevelValue250)
      //     || isNaN(this.RecentLevelValue500)
      //     || isNaN(this.RecentLevelValue1000)
      //     || isNaN(this.RecentLevelValue2000)
      //     || isNaN(this.RecentLevelValue4000)
      //     || isNaN(this.RecentLevelValue16000)
      // ){
      //   this.stopmeasurement();
      //   this.MicError = 1;
      // }

      // if (this.RecentLevelValue > 0.5){
      //   this.stopmeasurement();
      //   this.MicError = 2;
      // }
      ++this.ArrayCounter
      // if(this.timeHeight >=40){
      //   this.Reset125()
      // }
      // console.log("Recent Level",this.RecentLevelValue);
      // console.log("Recent Level 65",this.RecentLevelValue65);
      this.AnimationID = requestAnimationFrame(this.RecentLevel)
    },

    StartButtonPressed () {
      const constraints = {
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
          deviceId: { exact: this.selectedInputDevice }

        }
      }
      if (navigator.mediaDevices.getUserMedia) {
        // console.log('getUserMedia supported.')

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          this.stream = stream
          this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()

          this.source = this.audioCtx.createMediaStreamSource(this.stream)
          this.source100 = this.audioCtx.createBufferSource()
          this.Gain1000 = this.audioCtx.createGain()
          this.Gain1000.gain.setValueAtTime(0, this.audioCtx.currentTime)

          this.compressorNode = this.audioCtx.createDynamicsCompressor()

          fetch('/masking/MaskingNoise_1000.aac')
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
              // Set buffer on AudioBufferSourceNode
              this.source100.buffer = audioBuffer
              this.source100.loop = true
              // Connect nodes
              // this.source100.connect(compressorNode);
              this.source100.connect(this.Gain1000)
              this.Gain1000.connect(this.audioCtx.destination)
              this.source100.start()
            })
          this.SoundNode = this.audioCtx.createBufferSource()
          this.harmonicGainNode = this.audioCtx.createGain()
          fetch('/sounds/Forest.aac')
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
              // Set buffer on AudioBufferSourceNode
              this.SoundNode.buffer = audioBuffer
              this.SoundNode.loop = true
              // compressorNode.attack.value = .25;
              // this.SoundNode.connect(compressorNode);
              // this.harmonicGainNode.gain.value=this.harmonicGain;
              this.currentDestination = this.audioCtx.destination
              this.SoundNode.connect(this.harmonicGainNode)
              this.harmonicGainNode.connect(this.currentDestination)
              // Play source node
              this.SoundNode.start()
              // 1102500
            })

          // Attack time in seconds

          // set up the different audio nodes we will use for the app
          this.Gain1000.gain.value = Math.pow(10, (-39 / 20))
          this.Gain = this.audioCtx.createGain()
          this.Gain.gain.setValueAtTime(Math.pow(10, (-39 / 20)), this.audioCtx.currentTime)
          // this.Gain.gain.setValueAtTime(0.5,0);

          this.HPF = this.audioCtx.createBiquadFilter()
          this.HPF.type = 'highpass'
          this.HPF.frequency.value = 450

          this.LPF = this.audioCtx.createBiquadFilter()
          this.LPF.type = 'lowpass'
          this.LPF.frequency.value = 1000

          this.bandPass1 = this.audioCtx.createBiquadFilter()
          this.bandPass1.type = 'bandpass'
          this.bandPass1.frequency.value = 63
          this.bandPass1.Q.value = 1.41

          this.analyser = this.audioCtx.createAnalyser()
          this.analyser.fftSize = 256
          this.analyser.minDecibels = -90
          this.analyser.maxDecibels = -10
          this.analyser.smoothingTimeConstant = 0.9

          this.LevelAnalyser = this.audioCtx.createAnalyser()
          this.LevelAnalyser.fftSize = 512
          this.LevelAnalyser.minDecibels = -100
          this.LevelAnalyser.maxDecibels = -1
          this.LevelAnalyser.smoothingTimeConstant = 0.95
          this.LevelBuffer = new Uint8Array(512)

          // Band Pass 65
          this.AnalyserbandPass65 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass65.fftSize = 512
          this.AnalyserbandPass65.minDecibels = -100
          this.AnalyserbandPass65.maxDecibels = -1
          this.AnalyserbandPass65.smoothingTimeConstant = 0.95
          this.bandPass65Buffer = new Uint8Array(512)

          // Band Pass 125
          this.AnalyserbandPass125 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass125.fftSize = 512
          this.AnalyserbandPass125.minDecibels = -100
          this.AnalyserbandPass125.maxDecibels = -1
          this.AnalyserbandPass125.smoothingTimeConstant = 0.95
          this.bandPass125Buffer = new Uint8Array(512)

          this.bandPass125 = this.audioCtx.createBiquadFilter()
          this.bandPass125.type = 'bandpass'
          this.bandPass125.frequency.value = 125
          this.bandPass125.Q.value = 1.41

          // Band Pass 250
          this.AnalyserbandPass250 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass250.fftSize = 512
          this.AnalyserbandPass250.minDecibels = -100
          this.AnalyserbandPass250.maxDecibels = -1
          this.AnalyserbandPass250.smoothingTimeConstant = 0.95
          this.bandPass250Buffer = new Uint8Array(512)

          this.bandPass250 = this.audioCtx.createBiquadFilter()
          this.bandPass250.type = 'bandpass'
          this.bandPass250.frequency.value = 250
          this.bandPass250.Q.value = 1.41

          // Band Pass 500
          this.AnalyserbandPass500 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass500.fftSize = 512
          this.AnalyserbandPass500.minDecibels = -100
          this.AnalyserbandPass500.maxDecibels = -1
          this.AnalyserbandPass500.smoothingTimeConstant = 0.95
          this.bandPass500Buffer = new Uint8Array(512)

          this.bandPass500 = this.audioCtx.createBiquadFilter()
          this.bandPass500.type = 'bandpass'
          this.bandPass500.frequency.value = 500
          this.bandPass500.Q.value = 1.41

          // Band Pass 1000
          this.AnalyserbandPass1000 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass1000.fftSize = 512
          this.AnalyserbandPass1000.minDecibels = -100
          this.AnalyserbandPass1000.maxDecibels = -1
          this.AnalyserbandPass1000.smoothingTimeConstant = 0.95
          this.bandPass1000Buffer = new Uint8Array(512)

          this.bandPass1000 = this.audioCtx.createBiquadFilter()
          this.bandPass1000.type = 'bandpass'
          this.bandPass1000.frequency.value = 1000
          this.bandPass1000.Q.value = 1.41

          // Band Pass 2000
          this.AnalyserbandPass2000 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass2000.fftSize = 512
          this.AnalyserbandPass2000.minDecibels = -100
          this.AnalyserbandPass2000.maxDecibels = -1
          this.AnalyserbandPass2000.smoothingTimeConstant = 0.95
          this.bandPass2000Buffer = new Uint8Array(512)

          this.bandPass2000 = this.audioCtx.createBiquadFilter()
          this.bandPass2000.type = 'bandpass'
          this.bandPass2000.frequency.value = 2000
          this.bandPass2000.Q.value = 1.41

          // Band Pass 4000
          this.AnalyserbandPass4000 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass4000.fftSize = 512
          this.AnalyserbandPass4000.minDecibels = -100
          this.AnalyserbandPass4000.maxDecibels = -1
          this.AnalyserbandPass4000.smoothingTimeConstant = 0.95
          this.bandPass4000Buffer = new Uint8Array(512)

          this.bandPass4000 = this.audioCtx.createBiquadFilter()
          this.bandPass4000.type = 'bandpass'
          this.bandPass4000.frequency.value = 4000
          this.bandPass4000.Q.value = 1.41

          // Band Pass 8000
          this.AnalyserbandPass8000 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass8000.fftSize = 512
          this.AnalyserbandPass8000.minDecibels = -100
          this.AnalyserbandPass8000.maxDecibels = -1
          this.AnalyserbandPass8000.smoothingTimeConstant = 0.95
          this.bandPass8000Buffer = new Uint8Array(512)

          this.bandPass8000 = this.audioCtx.createBiquadFilter()
          this.bandPass8000.type = 'bandpass'
          this.bandPass8000.frequency.value = 8000
          this.bandPass8000.Q.value = 1.41

          // Band Pass 16000
          this.AnalyserbandPass16000 = this.audioCtx.createAnalyser()
          this.AnalyserbandPass16000.fftSize = 512
          this.AnalyserbandPass16000.minDecibels = -100
          this.AnalyserbandPass16000.maxDecibels = -1
          this.AnalyserbandPass16000.smoothingTimeConstant = 0.95
          this.bandPass16000Buffer = new Uint8Array(512)

          this.bandPass16000 = this.audioCtx.createBiquadFilter()
          this.bandPass16000.type = 'bandpass'
          this.bandPass16000.frequency.value = 400
          this.bandPass16000.Q.value = 1.41

          this.source.connect(this.Gain)
          this.Gain.connect(this.HPF)
          this.HPF.connect(this.LPF)
          this.LPF.connect(this.analyser)
          this.LPF.connect(this.LevelAnalyser)

          this.source.connect(this.bandPass1)
          this.bandPass1.connect(this.AnalyserbandPass65)
          // this.bandPass1.connect(this.audioCtx.destination);
          // 125 Band
          this.source.connect(this.bandPass125)
          this.bandPass125.connect(this.AnalyserbandPass125)

          this.source.connect(this.bandPass250)
          this.bandPass250.connect(this.AnalyserbandPass250)

          this.source.connect(this.bandPass500)
          this.bandPass500.connect(this.AnalyserbandPass500)

          this.source.connect(this.bandPass1000)
          this.bandPass1000.connect(this.AnalyserbandPass1000)

          this.source.connect(this.bandPass2000)
          this.bandPass2000.connect(this.AnalyserbandPass2000)

          this.source.connect(this.bandPass4000)
          this.bandPass4000.connect(this.AnalyserbandPass4000)

          this.source.connect(this.bandPass8000)
          this.bandPass8000.connect(this.AnalyserbandPass8000)
          //
          this.source.connect(this.bandPass16000)
          this.bandPass16000.connect(this.AnalyserbandPass16000)

          // this.bandPass16000.connect(this.audioCtx.destination);
          // this.source.connect(this.bandPass1);
          // this.source.connect(this.audioCtx.destination);
          // this.LevelAnalyser.connect(this.audioCtx.destination);

          this.FirstStart = false
          // this.startmeasurement();
          setTimeout(this.startmeasurement, 800) // short break to avoid zeros at beginning of measurement
        })

        // Error callback
          .catch(function (_err) {
            // console.log('The following gUM error occured: ' + err)
          })
      } else {
        // console.log('Error: This Site is not supported on your browser!')
      }
    }
  }
}
</script>
