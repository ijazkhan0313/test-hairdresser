<template>
  <div class="container-fluid">
    <h1>
      {{ t("PlansInfoHeading") }}
    </h1>
    <h2>
      {{ t("PlansInfoSubHeading") }}
    </h2>
    <div class="row pt-4">
      <div class="col-12">
        <h6 class=" fw-bold">
          PLATZHALTER (Text nicht überarbeitet)
          Abrechnung über Stripe und unsere Pakete
        </h6>
        <p class="text-muted ">
          Unsere App bietet verschiedene Abrechnungspläne an, die einfach und sicher über Stripe abgewickelt werden. Nutzer erstellen ein Konto, wählen einen passenden Abrechnungsplan und geben ihre Zahlungsinformationen ein. Die Abrechnung erfolgt automatisch basierend auf dem gewählten Intervall (monatlich, vierteljährlich, halbjährlich, jährlich). Änderungen während der Abrechnungsperiode werden anteilig berücksichtigt und die Nutzungsgebühr wird zu Beginn des jeweiligen Abrechnungszeitraums berechnet.
        </p>
        <h6 class=" fw-bold">
          Unsere Pakete
        </h6>
        <p class="text-muted">
          Tester (1 Sitz): Für Einzelpersonen in Unternehmen, die die App testen möchten.
          Startup (5 Sitze): Ideal für kleine Teams und Startups.
          Klein (10 Sitze): Für kleinere Abteilungen mit mehreren Nutzern.
          Mittel (25 Sitze): Geeignet für mittelgroße Unternehmen.
          Groß (50 Sitze): Für große Unternehmen.
          Enterprise (100 Sitze): Für sehr große Unternehmen mit umfassendem Bedarf.
          Micro Business (3 Sitze): Für kleine Unternehmen oder Teams.
        </p>
        <p class="text-muted">
          Unsere verschiedenen Pakete bieten flexible Abrechnungsintervalle und sind auf verschiedene Größen zugeschnittten. Nicht das richtige dabei? Dann <a href="mailto:kontakt@mindboost.team">kontaktiere</a> uns. Die Abrechnung erfolgt sicher und automatisch über Stripe, unsere Pläne werden automatisch verlängert.
        </p>
      </div>
    </div>
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
