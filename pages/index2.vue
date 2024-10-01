<template>
  <div class="container-fluid">
    <HomeBar />
    <div v-if="soundscapeSelected === 'Forest'">
      Forest
      <MusicGainForest />
    </div>
    <div v-if="soundscapeSelected === 'Lagoon'">
      Laggon
      <MusicGainLagoon />
    </div>
    <div @click="changeSoundscape">
      Change
    </div>
  </div>
</template>

<script lang="ts">
import HomeBar from '@/components/homebar.vue'
import MusicGainForest from '~/components/experiments/homepages/MusicGainForest.vue'
import MusicGainLagoon from '~/components/experiments/homepages/MusicGainLagoon.vue'

export default {
  components: { HomeBar, MusicGainForest, MusicGainLagoon },
  data () {
    return {
      soundscapeSelected: 'Lagoon'
    }
  },
  methods: {
    changeSoundscape () {
      if (this.soundscapeSelected === 'Lagoon') {
        this.soundscapeSelected = 'Forest'
      } else {
        this.soundscapeSelected = 'Lagoon'
      }
    }
  }
}
</script>
