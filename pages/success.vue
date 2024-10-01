<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-0 mx-0">
          <video-background
            src="video/bg-video.mp4"
            poster="images/posters/poster1.png"
            style=" height: 100vh;"
          >
            <home-bar :title="title" />

            <div class="container pt-4">
              <div class="row justify-content-center px-1 ">
                <div class="col-12 col-sm-11 col-md-10 p-3 py-4 col-lg-7 " style="border-radius: 15px;background-color: rgb(233, 192, 70);">
                  <div class="success-page">
                    <div class="success-icon">
                      <i class="fas fa-check-circle" />
                    </div>
                    <div class="success-message">
                      {{ t("Successfully subscribed") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BootomBar style="position: fixed;bottom: 10px;" />
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

import HomeBar from '../components/homebar'
export default {
  components: { HomeBar },
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
      title: 'Subscribed Successfully'
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
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
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

}

.success-icon {
  font-size: 64px;
  color: white;
  margin-bottom: 32px;
}

.success-message {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
}
</style>
