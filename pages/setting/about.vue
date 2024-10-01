<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12  col-md-8">
        <h4 class="fw-bold text-center pt-5">
          {{ t('About Mindboost') }}
        </h4>
        <div class="row pt-4">
          <div class="col-12">
            <h6 class=" fw-bold">
              {{ t('WHAT IS MINDBOOST?') }}
            </h6>
            <p class="text-muted ">
              {{ t('Mindboost creates soundscapes for your headphones that help you focus up to 35% better. Mindboost combines voice masking, binaural beats and alpha waves.') }}
            </p>
          </div>
          <div class="col-12 pt-3">
            <h6 class=" fw-bold">
              {{ t('HOW DOES MINDBOOST WORK?') }}
            </h6>
            <p class="text-muted ">
              {{ t('Our algorithm measures the acoustics of your cell phone or other device in the room in real time and generates a soundscape that optimally blocks out disruptive background noise such as colleagues on the phone.') }}
            </p>
          </div>
          <div class="col-12 pt-3">
            <h6 class=" fw-bold">
              {{ t('WHY DOES MINDBOOST WORK?') }}
            </h6>
            <p class="text-muted ">
              {{ t('All soundscapes in Mindboost have been tested and optimized in listening tests in cooperation with the Fraunhofer IBP. So you can be sure that Mindboost supports you optimally with your concentration.') }}
            </p>
          </div>
          <div class="col-12 pt-3">
            <h6 class=" fw-bold">
              {{ t('WHO WE ARE?') }}
            </h6>
            <p class="text-muted ">
              {{ t('We are a small team of audio developers. Inspiried by the power of sound, well known from music, we cannot stop exploring the digital audio world. We are happy that we can be part of a community that uses audio next to practical services mainly to generate fun.') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  }
}
</script>

<style>

</style>
