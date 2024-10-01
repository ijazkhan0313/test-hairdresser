<template>
  <div>
    <div class="row">
      <div class="col-12 pt-3">
        <h6 class="text-muted text-center">
          {{ t("We are analyzing your background noise...") }}
        </h6>
      </div>
      <div class="col-12">
        <h4 class="text-center fw-bold pt-5">
          {{ t("The microphone does not provide any level") }}
        </h4>
        <h6 class="text-center text-muted">
          {{ t("Please check the input level of the microphone in the audio") }}
        </h6>
        <h6 class="text-center text-muted">
          {{ t("system settings of your device and start again.") }}
        </h6>
      </div>
      <div class=" pt-5 text-center">
        <div class=" pt-3 ">
          <div class="checkmark pt-2 d-block d-sm-inline-block d-inline-block">
            <input id="success-outlined1" type="radio" class="btn-check" name="options-outlined" autocomplete="off">
            <label class="btn  px-4 checklabel" for="success-outlined1">
              <p class=" p-0 m-0 text-center">{{ t("Fix This Problem") }}</p>
            </label>
          </div>

          <nuxt-link to="" class="checkmark pt-2 d-inline-block">
            <input id="danger-outlined1" type="radio" class="btn-check checkmark" name="options-outlined" autocomplete="off">
            <label class="btn checklabel  px-5 ms-0 ms-sm-3 " for="danger-outlined1">
              <p class="p-0 m-0 text-center">{{ t("Try Again") }}</p>
            </label>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="row pt-5 mt-0 mt-sm-4 ">
      <div class="col-12 text-center pt-5 mt-3   pb-5 mb-2">
        <NuxtLink class="btn btn-warning px-2 " to="/onbording" @click.once="increment(25)" />
        <NuxtLink class="btn btn-warning px-2 mx-2" to="/onbording/onbording2" @click.once="increment(50)" />
        <NuxtLink class="btn btn-warning px-4 " to="/onbording/onbording3" @click.once="increment(75)" />
        <NuxtLink class="btn btn-warning px-2 mx-2" to="/onbording/onbording4" @click.once="increment(100)" />
        <h6 class="text-muted text-center pt-3">
          {{ t("You can customize your selection later") }}
        </h6>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  name: 'OnBording',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      t,
      localePath
    }
  },
  computed: { ...mapState(useCounterStore, ['count']) },
  mounted () {
    this.increment(75)
  },
  methods: {
    ...mapActions(useCounterStore, ['increment'])
  }
}
</script>

<style>
.checklabel:hover{
  border-color: #e9c046;
}
.checklabel {
  color: #e9c046 !important;
  border: 1px solid #e9c046;
}
.checkmark .checklabel  svg  path{
  /*background-color: white;*/
  fill: #e9c046;
}
.checkmark input:checked ~ .checklabel {
  background-color: #e9c046;
  border: 1px solid #e9c046;
  color: #f4f5f7 !important;
}
.checkmark input:checked ~ .checklabel svg path {
  fill: white;
}
.checkmark input:hover ~ .checklabel {
  background-color: #e9c046;
  border: 1px solid #e9c046;
  color: #f4f5f7 !important;
}
.checkmark input:hover ~ .checklabel svg path {
  fill: white;
}
</style>
