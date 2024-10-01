<template>
  <div class="container-fluid">
    <h1>
      {{ t("PlansInfoHeading") }}
    </h1>
    <h2>
      {{ t("PlansInfoSubHeading") }}
    </h2>
    <div class="container my-5">
      <h2 class="mb-4">
        Abrechnung
      </h2>
      <p>Unsere App bietet verschiedene Abrechnungspläne an, die einfach und sicher über Stripe abgewickelt werden. Nutzer erstellen ein Konto, wählen einen passenden Abrechnungsplan und geben ihre Zahlungsinformationen ein. Die Abrechnung erfolgt automatisch basierend auf dem gewählten Intervall (monatlich, vierteljährlich, halbjährlich, jährlich). Änderungen während der Abrechnungsperiode werden anteilig berücksichtigt und die Nutzungsgebühr wird zu Beginn des jeweiligen Abrechnungszeitraums berechnet.</p>

      <h3 class="mt-5">
        Pakete für Privatpersonen
      </h3>
      <ul class="list-group mb-4">
        <li class="list-group-item">
          <strong>Seat (1 Sitz)</strong>: Ideal für Einzelpersonen, die die Basisfunktionen unserer App nutzen möchten.
          <a href="#">B2C Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Seat (2 Sitze)</strong>: Für Paare oder kleine Gruppen, die gemeinsam die App nutzen möchten.
          <a href="#">B2C Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Family Plan (3 Sitze)</strong>: Perfekt für Familien, die die App zusammen verwenden wollen.
          <a href="#">B2C Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Freunde Plan (4 Sitze)</strong>: Für Freundesgruppen, die gemeinsam auf die App zugreifen möchten.
          <a href="#">B2C Preise</a>
        </li>
      </ul>

      <h3 class="mt-5">
        Pakete für Unternehmen
      </h3>
      <ul class="list-group mb-4">
        <li class="list-group-item">
          <strong>Tester (1 Sitz)</strong>: Für Einzelpersonen in Unternehmen, die die App testen möchten.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Startup (5 Sitze)</strong>: Ideal für kleine Teams und Startups.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Klein (10 Sitze)</strong>: Für wachsende Unternehmen mit mehreren Nutzern.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Mittel (25 Sitze)</strong>: Geeignet für mittelgroße Unternehmen.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Groß (50 Sitze)</strong>: Für große Unternehmen.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Enterprise (100 Sitze)</strong>: Für sehr große Unternehmen mit umfassendem Bedarf.
          <a href="#">B2B Preise</a>
        </li>
        <li class="list-group-item">
          <strong>Micro Business (3 Sitze)</strong>: Für kleine Unternehmen oder Teams.
          <a href="#">B2B Preise</a>
        </li>
      </ul>
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
    }
  },
  methods: {

  }
}

</script>
