<template>
  <div class="container-fluid">
    <h1>
      {{ t("PlansInfoHeading") }}
    </h1>
    <h2>
      {{ t("PlansInfoSubHeading") }}
    </h2>
  </div>
</template>

<script lang="ts">
export default {
  components: { },
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  },
  data () {
    return {
      soundscapeSelected: 'Lagoon'
    }
  },
  methods: {

  }
}

</script>
