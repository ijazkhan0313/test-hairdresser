<!-- eslint-disable no-console

  THIS FILE IS NOT WORKING

-->
<script>
import { mapActions, mapState } from 'pinia'
import { useAudioStore } from '@/stores/audio'
export default {
  name: 'AdaptiveSoundscape',
  components: {},
  props: {},
  data () {
    return {
      title: 'Adaptive Soundscape'
    }
  },
  computed: {
    ...mapState(useAudioStore, ['microphone', 'acusticCheckResult']),
    audioStore () {
      return useAudioStore()
    }
  },
  watch: {},
  mounted () {
    this.StartButtonPressed()
  },
  methods: {
    ...mapActions(useAudioStore, ['initializeAudioContext', 'resetAudioContext']),
    data: () => ({
    // This object holds all state of the app

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

      Timeframe: 250,
      UpperPercentile: 0.9,
      LowerPercentile: 0.1,
      LimitA: 2.5,
      LimitB: 10.0,

      audioCtx: {},
      source: {},
      audiodevices: {},

      Gain: {},
      HPF: {},
      LPF: {},
      analyser: {},
      LevelAnalyser: {},
      LevelBuffer: {},

      AnimationID: {},
      id: {},

      bufferLength: {},
      dataArray: {},
      RecentRMS: 0,
      ByteToDecimal: 0,
      RecentLevelValue: 0,

      ArrayCounter: 0,
      LevelValues: [],
      CummulatedLevelValues: 0,
      SortedArray: [],
      IndexMax: {},
      IndexMin: {},
      PercentileValue: {},

      height: 0,
      value: 1,
      secondsDown: 25,

      Result: {},
      ResultABC: {},

      MicError: 0

    }),

    computed: {
    // Computed properties (state derived from data properties)
    },
    methods: {
    // Write your own functions that mutate data via `this.`

      goto (refName) {
        const element = this.$refs[refName]
        const top = element.offsetTop

        window.scrollTo(0, top)
      },

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

      hyperImprint () {
      // window.open("https://dsi.informationssicherheit.fraunhofer.de/de/impressum/www.akustik-check.de/full","_blank");
        this.AlteSeite = this.NeueSeite
        this.NeueSeite = 11
      },

      hyperDataprotection () {
      // window.open("https://dsi.informationssicherheit.fraunhofer.de/de/dsi/www.akustik-check.de/full","_blank");
        this.AlteSeite = this.NeueSeite
        this.NeueSeite = 12
      },

      hyperBueroinfos () {
        window.open('https://www.youtube.com/watch?v=yAY1Gr5tcpw', '_blank')
      },

      hyperBI () {
        window.open('http://www.buero-initiative.de/', '_blank')
      },

      ResetLevelValues () {
        this.ArrayCounter = 0
        this.LevelValues = []
      },

      RMStoDBFS (InputArray) {
        for (let i = 0; i < InputArray.length; i++) {
          InputArray[i] = 20 * Math.log10(InputArray[i])
        }
      },

      numSort (a, b) {
        return (a - b)
      },

      Percentile (InputArray) {
        this.SortedArray = InputArray.sort(vm.numSort)
        vm.RMStoDBFS(this.SortedArray)
        // console.log('Sortiertes Array DBFS: ' + SortedArray);

        this.IndexMax = Math.round(this.SortedArray.length * this.UpperPercentile)
        this.IndexMin = Math.round(this.SortedArray.length * this.LowerPercentile)
        this.PercentileValue = this.SortedArray[this.IndexMax] - this.SortedArray[this.IndexMin]
        this.PercentileValue = this.PercentileValue.toFixed(2) // nach zwei Dazimalstellen abbrechen
        // console.log('percentile Value = ' + this.PercentileValue)

        if (this.PercentileValue < this.LimitA) {
          this.Result = 1
          this.ResultABC = 'A'
          this.acusticCheckResult = 1
        } else if (this.PercentileValue < this.LimitB) {
          this.Result = 2
          this.ResultABC = 'B'
          this.acusticCheckResult = 2
        } else {
          this.Result = 3
          this.ResultABC = 'C'
          this.acusticCheckResult = 3
        }
        // console.log('seite = ' + this.seite);

        this.NeueSeite = 4
        vm.ResetLevelValues()
      },

      stopAudioStream () {
        audiotracks.forEach((track) => {
          track.stop()
        })
      // console.log('Audiostream stopped.')
      },

      stopmeasurement () {
        window.cancelAnimationFrame(this.AnimationID)
        clearInterval(this.id)
        // console.log('Measurement stopped.')

        // stream.getTracks().forEach(function(track) {
        // rack.stop();
        // });

        this.height = 0
        this.secondsDown = 25
        this.CummulatedLevelValues = 0

        if (this.MicError === 0) {
          vm.stopAudioStream()
        }
      },

      frame () {
        if (this.height === 100) {
          vm.stopmeasurement()
          vm.Percentile(this.LevelValues)
        } else {
          this.height++
          this.value = this.height + 2
          // console.log(this.height);
          if (this.height % 4 === 0) {
            this.secondsDown = 25 - (this.height / 4)
          }
        }
      },

      startmeasurement () {
      // vm.visualize();
        vm.ResetLevelValues()

        const today = new Date()
        this.date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear()
        this.time = today.getHours() + ':' + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes()
        // requestAnimationFrame(vm.RecentLevel);
        this.height = 0
        requestAnimationFrame(vm.RecentLevel)
        this.id = setInterval(vm.frame, this.Timeframe)
      // vm.frame();
      },

      CancleMeasurement () {
        vm.previousPage()
        this.MicError = 0
      },

      // RMS Value
      RecentLevel () {
        self.LevelAnalyser.getByteTimeDomainData(self.LevelBuffer)

        for (let i = 0; i < 512; i++) {
          this.ByteToDecimal = (self.LevelBuffer[i] - 128) / 128
          // console.log("LevelBuffer i = "+ self.LevelBuffer[i]);
          this.RecentRMS += this.ByteToDecimal * this.ByteToDecimal
        };
        this.RecentRMS /= 512
        this.RecentLevelValue = Math.sqrt(this.RecentRMS)

        this.LevelValues[this.ArrayCounter] = this.RecentLevelValue

        this.CummulatedLevelValues = this.CummulatedLevelValues + this.RecentLevelValue * 1000

        if (this.ArrayCounter > 200 && this.CummulatedLevelValues < 50) {
          this.MicError = 1
          // clearInterval(this.id);
          vm.stopmeasurement()
        } else if (Object.isNaN(this.RecentLevelValue)) {
          this.MicError = 1
          // clearInterval(this.id);
          vm.stopmeasurement()
        } else if (this.RecentLevelValue > 0.7) {
          this.MicError = 2
          // clearInterval(this.id);
          vm.stopmeasurement()
        } else {
          ++this.ArrayCounter
          this.AnimationID = requestAnimationFrame(vm.RecentLevel)
        }
      },

      savePDF () {
        // eslint-disable-next-line new-cap
        const doc = new jspdf.jsPDF()
        let Perzentil = '0'
        if (this.PercentileValue > 3) {
          Perzentil = ((this.PercentileValue - 3).toFixed(2)).toString()
        };

        const img1 = new Image()
        img1.src = 'img/ibp.925e79d4.png'
        doc.addImage(img1, 'png', 20, 10, 50, 15)

        doc.setFontSize(24)
        doc.setTextColor('#1f82c0')
        doc.textWithLink('Büro-Akustik Check', 20, 45, { url: 'https://www.youtube.com/watch?v=yAY1Gr5tcpw' })

        doc.setFontSize(16)
        doc.setTextColor('gray')
        doc.text('Auswertung der Messung am ' + this.date + ' um ' + this.time + ' Uhr:', 20, 60)

        const img2 = new Image()
        img2.src = 'img/Result_' + this.ResultABC + '.png'
        doc.addImage(img2, 'png', 20, 70, 170, 80)

        doc.setLineWidth(0.5)
        doc.setDrawColor('gray')
        doc.line(20, 170, 190, 170)

        doc.setFontSize(11)
        doc.text('Gemessene akustische Qualität (kontaktieren Sie uns für weitere Informationen über diesen Wert):', 20, 180)
        doc.text('Messung durchgeführt von:', 20, 195)
        doc.text('Mailadresse:', 20, 210)
        doc.text('Firma:', 20, 225)
        doc.text('Raumbezeichnung:', 20, 240)
        doc.text('Zusatzinfos:', 20, 255)

        doc.setTextColor('black')
        doc.text(Perzentil, 20, 185)
        doc.text(this.Anrede + this.Vorname + ' ' + this.Nachname, 20, 200)
        doc.text(this.Mail, 20, 215)
        doc.text(this.Firma, 20, 230)
        doc.text(this.Raum, 20, 245)

        if (this.Zusatzinfos === '') {
          doc.text('-', 20, 260)
        } else { doc.text(this.Zusatzinfos, 20, 260) };

        doc.text('Sie sind unzufrieden mit der Akustik an Ihrem Arbeitsplatz? Wir optimieren Ihr Büro menschzentriert.', 20, 275)
        doc.setTextColor('#1f82c0')
        doc.textWithLink('Kontaktieren Sie uns unter kognitive-ergonomie@ibp.fraunhofer.de', 20, 280, { url: 'mailto:kognitive-ergonomie@ibp.fraunhofer.de' })

        // Speicherung lokal für User
        doc.save('Auswertung_Bueroumgebung.pdf')

        // PDF an Server
        const blob = doc.output('blob')
        const formData = new FormData()
        formData.append('pdf', blob)
        $.ajax('/upload.php',
          {
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) { console.log(data) },
            error: function (data) { console.log(data) }
          })

        //

        // location.reload();
      },

      audioSettings () {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          this.audiodevices = new Set()
          devices.forEach((device) => {
            // console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            if (device.kind === 'audioinput') {
              this.audiodevices.add(device)
            };
          })

          // this.audiodevices.forEach((value) => {
          // console.log(value);
          // })
        // console.log('Verfügbare Audiodevices: ', this.audiodevices)
        })

        this.settings = 1
      },

      StartButtonPressed () {
        function getMedia () {
          let stream = null

          try {
            stream = this.microphone.microphoneStream
            // console.log('Audiostream started.')
            audiotracks = stream.getTracks()

            // this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            this.audioCtx = this.getContext()
            // this.stream = navigator.mediaDevices.getUserMedia(constraints);
            this.Gain = this.audioCtx.createGain()
            this.Gain.gain.setValueAtTime(2.0, this.audioCtx.currentTime)

            this.HPF = this.audioCtx.createBiquadFilter()
            this.HPF.type = 'highpass'
            this.HPF.frequency.value = 450

            this.LPF = this.audioCtx.createBiquadFilter()
            this.LPF.type = 'lowpass'
            this.LPF.frequency.value = 10000

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

            this.source = this.audioCtx.createMediaStreamSource(stream)
            this.source.connect(this.Gain)
            this.Gain.connect(this.HPF)
            this.HPF.connect(this.LPF)
            this.LPF.connect(this.analyser)
            this.LPF.connect(this.LevelAnalyser)

            this.FirstStart = false

            setTimeout(vm.startmeasurement, 800) // short break to avoid zeros at beginning of measurement
          } catch (err) {
          // console.log('The following gUM error occured: ' + err)
          }
        }
        getMedia(constraints)
      }
    }
  }
}
</script>
~/stores/audio
