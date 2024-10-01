<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-0 mx-0">
          <video-background
            src="/video/Tropics.mp4"
            preload="auto"
            poster="/images/posters/poster2.png"
            style=" height: 100vh;"
          >
            <home-bar :title="title" />
            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="adaptive pb-3">
                  <NoiseMusicGainTropics />
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
                        {{ t('Adaptive soundscape') }}: <span class="" style="color: #e9c046">{{ t('On') }}</span>
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
          </video-background>
          <!--            <video  muted id="myVideo" autoplay loop>-->
          <!--              <source src="~/assets/video/bg-video.mp4" type="video/mp4">-->
          <!--              <source src="~/assets/video/bg-video.ogg" type="video/ogg">-->
          <!--              Your browser does not support HTML5 video.-->
          <!--            </video>-->
        </div>
      </div>
    </div>

    <div id="adaptive-modal" class="modal fade " tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            <div class=" bg-white " style="border-radius: 15px">
              <div class="row px-3">
                <div class="col-2">
                  <span><i class="fa-solid fs-3 fa-arrow-left-long" style="cursor: pointer" data-bs-dismiss="modal" /></span>
                </div>
                <div class="col-8">
                  <h4 class="text-center fw-bolder">
                    {{ t('Adaptive soundscape') }}
                  </h4>
                </div>
                <div class="col-2">
                  <div class="form-check form-switch  float-end">
                    <input id="flexSwitchCheckDefault" class="form-check-input" type="checkbox" role="switch">
                  </div>
                </div>
              </div>
              <div class="row px-2 pt-4">
                <div class="col-12 ps-3 fs-5" style="line-height: 25px">
                  <p class="p-0 m-0">
                    {{ t("The Mindboost sounscape responds to the acousitcs in your room.") }}
                  </p>
                  <p class="p-0 m-0" />
                  <p class="">
                    {{ t("Currently, your room has a:") }}
                  </p>
                </div>
              </div>
              <div class="row  pt-4 ps-3">
                <div class="col-auto">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="54" viewBox="0 0 60 54" fill="none">
                      <path d="M28.9879 0.600098C28.6223 0.600098 28.2613 0.675098 27.9004 0.787598C27.1738 1.01728 26.4801 1.44853 25.8754 2.0626L11.7754 16.1626H3.60039C1.59883 16.1626 -0.0371094 17.7985 -0.0371094 19.8001V34.2001C-0.0371094 36.2017 1.59883 37.8376 3.60039 37.8376H11.7754L25.8379 51.8251C27.1785 53.1704 28.8988 53.761 30.3004 53.1001C31.7113 52.4345 32.4004 50.8313 32.4004 48.9751V4.5751C32.4004 2.7751 31.4816 1.27978 30.0754 0.787598C29.7238 0.665723 29.3535 0.600098 28.9879 0.600098ZM29.0254 3.0001C29.1473 3.0001 29.241 3.00947 29.3254 3.0376C29.6676 3.15478 30.0004 3.45947 30.0004 4.5751V48.9751C30.0004 50.2548 29.5785 50.8267 29.2879 50.9626C28.9973 51.0985 28.4113 51.1126 27.4879 50.1751L12.3754 35.0626C12.352 35.0485 12.3238 35.0345 12.3004 35.0251C12.3895 35.1048 12.0004 34.3454 12.0004 33.9001V20.1001C12.0004 19.6548 12.4035 18.886 12.3004 18.9751C12.3285 18.9517 12.352 18.9282 12.3754 18.9001L27.5629 3.7501C28.1254 3.18291 28.6551 3.00479 29.0254 3.0001ZM45.9379 5.1751C45.4129 5.26416 45.0098 5.69072 44.9488 6.22041C44.8926 6.7501 45.1832 7.25635 45.6754 7.4626C52.8144 11.0626 57.6754 18.4454 57.6754 27.0001C57.6754 35.5548 52.8144 42.9376 45.6754 46.5376C45.2348 46.6876 44.9254 47.0813 44.8738 47.5407C44.8223 48.0048 45.0426 48.4548 45.441 48.6985C45.8348 48.9376 46.3363 48.9282 46.7254 48.6751C54.6473 44.6767 60.0754 36.4735 60.0754 27.0001C60.0754 17.5267 54.6473 9.32353 46.7254 5.3251C46.5191 5.20791 46.2848 5.15635 46.0504 5.1751C46.0129 5.1751 45.9754 5.1751 45.9379 5.1751ZM41.6629 11.5501C41.1285 11.6157 40.702 12.0329 40.6269 12.5673C40.5473 13.097 40.8332 13.6173 41.3254 13.8376C46.0082 16.3642 49.2004 21.2954 49.2004 27.0001C49.2004 32.686 46.0223 37.6313 41.3629 40.1626C40.7816 40.4813 40.5707 41.2126 40.8941 41.7938C41.2129 42.3751 41.9441 42.586 42.5254 42.2626C47.9348 39.3235 51.6004 33.5813 51.6004 27.0001C51.6004 20.4001 47.9254 14.6345 42.4879 11.7001C42.2723 11.5782 42.0238 11.5267 41.7754 11.5501C41.7379 11.5501 41.7004 11.5501 41.6629 11.5501ZM3.60039 18.6376H9.82539C9.6707 19.097 9.60039 19.5985 9.60039 20.1001V33.9001C9.60039 34.4017 9.67539 34.8985 9.82539 35.3626H3.60039C2.95352 35.3626 2.43789 34.847 2.43789 34.2001V19.8001C2.43789 19.1532 2.95352 18.6376 3.60039 18.6376ZM36.6379 19.0876C36.0566 19.1579 35.616 19.636 35.5879 20.222C35.5598 20.8032 35.9535 21.3235 36.5254 21.4501C38.9816 22.0923 40.8004 24.3329 40.8004 27.0001C40.8004 29.6673 38.9816 31.9079 36.5254 32.5501C35.8832 32.7142 35.4988 33.3704 35.6629 34.0126C35.827 34.6548 36.4832 35.0392 37.1254 34.8751C40.6176 33.961 43.2004 30.7642 43.2004 27.0001C43.2004 23.236 40.6176 20.0392 37.1254 19.1251C36.966 19.0782 36.802 19.0688 36.6379 19.0876Z" fill="#E9C046" />
                    </svg>
                  </span>
                </div>
                <div class="col-11 col-md-10 ps-3">
                  <h5>{{ t("Noisy Environment") }}</h5>
                  <p>
                    {{ t("The background noise at your workplace is disturbing. Your concentration is severely impaired. Mindboost protects you from the disturbing background noise.") }}
                  </p>
                </div>
              </div>

              <div class="row pt-3 ps-3 opacity-75">
                <div class="col-auto">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="54" viewBox="0 0 52 54" fill="none">
                      <path d="M28.9879 0.600098C28.6223 0.600098 28.2613 0.675098 27.9004 0.787598C27.1738 1.01728 26.4801 1.44853 25.8754 2.0626L11.7754 16.1626H3.60039C1.59883 16.1626 -0.0371094 17.7985 -0.0371094 19.8001V34.2001C-0.0371094 36.2017 1.59883 37.8376 3.60039 37.8376H11.7754L25.8379 51.8251C27.1785 53.1704 28.8988 53.761 30.3004 53.1001C31.7113 52.4345 32.4004 50.8313 32.4004 48.9751V4.5751C32.4004 2.7751 31.4816 1.27978 30.0754 0.787598C29.7238 0.665723 29.3535 0.600098 28.9879 0.600098ZM29.0254 3.0001C29.1473 3.0001 29.241 3.00947 29.3254 3.0376C29.6676 3.15478 30.0004 3.45947 30.0004 4.5751V48.9751C30.0004 50.2548 29.5785 50.8267 29.2879 50.9626C28.9973 51.0985 28.4113 51.1126 27.4879 50.1751L12.3754 35.0626C12.352 35.0485 12.3238 35.0345 12.3004 35.0251C12.3895 35.1048 12.0004 34.3454 12.0004 33.9001V20.1001C12.0004 19.6548 12.4035 18.886 12.3004 18.9751C12.3285 18.9517 12.352 18.9282 12.3754 18.9001L27.5629 3.7501C28.1254 3.18291 28.6551 3.00479 29.0254 3.0001ZM41.6629 11.5501C41.1285 11.6157 40.702 12.0329 40.627 12.5673C40.5473 13.097 40.8332 13.6173 41.3254 13.8376C46.0082 16.3642 49.2004 21.2954 49.2004 27.0001C49.2004 32.686 46.0223 37.6313 41.3629 40.1626C40.7816 40.4813 40.5707 41.2126 40.8941 41.7938C41.2129 42.3751 41.9441 42.586 42.5254 42.2626C47.9348 39.3235 51.6004 33.5813 51.6004 27.0001C51.6004 20.4001 47.9254 14.6345 42.4879 11.7001C42.2723 11.5782 42.0238 11.5267 41.7754 11.5501C41.7379 11.5501 41.7004 11.5501 41.6629 11.5501ZM3.60039 18.6376H9.82539C9.6707 19.097 9.60039 19.5985 9.60039 20.1001V33.9001C9.60039 34.4017 9.67539 34.8985 9.82539 35.3626H3.60039C2.95352 35.3626 2.43789 34.847 2.43789 34.2001V19.8001C2.43789 19.1532 2.95352 18.6376 3.60039 18.6376ZM36.6379 19.0876C36.0566 19.1579 35.616 19.636 35.5879 20.222C35.5598 20.8032 35.9535 21.3235 36.5254 21.4501C38.9816 22.0923 40.8004 24.3329 40.8004 27.0001C40.8004 29.6673 38.9816 31.9079 36.5254 32.5501C35.8832 32.7142 35.4988 33.3704 35.6629 34.0126C35.827 34.6548 36.4832 35.0392 37.1254 34.8751C40.6176 33.961 43.2004 30.7642 43.2004 27.0001C43.2004 23.236 40.6176 20.0392 37.1254 19.1251C36.966 19.0782 36.802 19.0688 36.6379 19.0876Z" fill="#E9C046" />
                    </svg>
                  </span>
                </div>
                <div class="col-11 col-md-10 ps-3">
                  <h5>{{ t("Medium-noise Environment") }}</h5>
                  <p>{{ t("The background noise at your workplace should be optimized. In the long term, it could disturb and have a negative impact on your health. Protect yourself with mindboost.") }}</p>
                </div>
              </div>

              <div class="row pt-3 ps-3 opacity-50">
                <div class="col-auto">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
                      <path d="M28.9879 0.600098C28.6223 0.600098 28.2613 0.675098 27.9004 0.787598C27.1738 1.01728 26.4801 1.44853 25.8754 2.0626L11.7754 16.1626H3.60039C1.59883 16.1626 -0.0371094 17.7985 -0.0371094 19.8001V34.2001C-0.0371094 36.2017 1.59883 37.8376 3.60039 37.8376H11.7754L25.8379 51.8251C27.1785 53.1704 28.8988 53.761 30.3004 53.1001C31.7113 52.4345 32.4004 50.8313 32.4004 48.9751V4.5751C32.4004 2.7751 31.4816 1.27978 30.0754 0.787598C29.7238 0.665723 29.3535 0.600098 28.9879 0.600098ZM29.0254 3.0001C29.1473 3.0001 29.241 3.00947 29.3254 3.0376C29.6676 3.15478 30.0004 3.45947 30.0004 4.5751V48.9751C30.0004 50.2548 29.5785 50.8267 29.2879 50.9626C28.9973 51.0985 28.4113 51.1126 27.4879 50.1751L12.3754 35.0626C12.352 35.0485 12.3238 35.0345 12.3004 35.0251C12.3895 35.1048 12.0004 34.3454 12.0004 33.9001V20.1001C12.0004 19.6548 12.4035 18.886 12.3004 18.9751C12.3285 18.9517 12.352 18.9282 12.3754 18.9001L27.5629 3.7501C28.1254 3.18291 28.6551 3.00479 29.0254 3.0001ZM3.60039 18.6376H9.82539C9.6707 19.097 9.60039 19.5985 9.60039 20.1001V33.9001C9.60039 34.4017 9.67539 34.8985 9.82539 35.3626H3.60039C2.95352 35.3626 2.43789 34.847 2.43789 34.2001V19.8001C2.43789 19.1532 2.95352 18.6376 3.60039 18.6376ZM36.6379 19.0876C36.0566 19.1579 35.616 19.636 35.5879 20.222C35.5598 20.8032 35.9535 21.3235 36.5254 21.4501C38.9816 22.0923 40.8004 24.3329 40.8004 27.0001C40.8004 29.6673 38.9816 31.9079 36.5254 32.5501C35.8832 32.7142 35.4988 33.3704 35.6629 34.0126C35.827 34.6548 36.4832 35.0392 37.1254 34.8751C40.6176 33.961 43.2004 30.7642 43.2004 27.0001C43.2004 23.236 40.6176 20.0392 37.1254 19.1251C36.966 19.0782 36.802 19.0688 36.6379 19.0876Z" fill="#E9C046" />
                    </svg>
                  </span>
                </div>
                <div class="col-11 col-md-10 ps-3">
                  <h5>{{ t("Good Environment") }}</h5>
                  <p>
                    {{ t("The background noise at your workplace provides a long’term healthy basis for concentrated work. With Mindboost you make sure that even sudden disturbances do not distract you.") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoiseMusicGainTropics from '../components/experiments/homepages/NoiseMusicGainTropics'
import HomeBar from '../components/homebar'

export default {
  components: { HomeBar, NoiseMusicGainTropics },
  setup () {
    definePageMeta({
      middleware: 'auth'
    })
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      t,
      localePath
    }
  },

  data () {
    return {
      bar_width: 0,
      analyser: null,
      dataArray: null,
      bar_val: 25
    }
  },
  computed: {
    // Berechnete Eigenschaft für die dynamische Übersetzung des Titels
    title () {
      return this.$t('Tropics')
    }
  },
  beforeUnmount () {
  },

  async mounted () {
    /* await useMicStore().getMicrophone().then((mic) => {
      const audioCtx = mic.microphoneNode.context
      this.analyser = audioCtx.createAnalyser()
      mic.microphoneNode.connect(this.analyser)
      this.analyser.fftSize = 2048
      const bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(bufferLength)
      this.updateMeter()
    }) */
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
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
