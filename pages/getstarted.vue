<template>
  <div>
    <video-background
      src="video/bg-video.mp4"
      style=" height: 100vh;"
    >
      <top-logo-bar />
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-6 pt-2">
            <h3 class="text-center fs-2">
              Hey, We’re About to Get Started
            </h3>
            <p class="text-center text-muted fs-5 col-8 mx-auto">
              Please answer a few questions while we analyze the acoustics in your room.
            </p>
            <div class="text-center">
              <img src="~/assets/image/Delivery.png">
            </div>
            <form>
              <div class="row pt-4 justify-content-center">
                <div class="col-7 ">
                  <div class="form-check">
                    <input id="flexCheckIndeterminate" class="form-check-input" type="checkbox" value="">
                    <label class="form-check-label" for="flexCheckIndeterminate">
                      I give the app permission to use my microphone
                      {{ t('I give the app permission to use my microphone') }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col-12 text-center pt-3">
                  <button type="button" class="login-btn col-4">
                    {{ t('Next') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </video-background>
  </div>
</template>
<script>
// can be used both composition api and roller api
export default {
  components: { },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    }
  }
}
</script>
