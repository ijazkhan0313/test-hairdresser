<template>
  <div class="container-fluid">
    <p class="muted">
      Technical description: This page lists all orders placed from a specific account.
      This page is used to edit your orders (cancel subscription, change plan, change number of seats) and downloading bill
    </p>
    <h1>
      {{ t("OrdersHeading") }}
    </h1>
    <h2>
      s
      {{ t("OrdersSubHeading") }}
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
