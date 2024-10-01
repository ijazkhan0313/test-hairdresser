<template>
  <div>
    Do not load multiple test without unloading others.
    <div>
      NoisePatchMusic
      <NoisePatchMusic v-if="tests['noisepatch'].active" />
      <button
        @click="toggleState('noisepatch')"
      >
        Load
      </button>
      <button
        v-if="!tests['noisepatch'].active"
        @click="toggleState('noisepatch')"
      >
        Unload
      </button>
    </div>
    <div>
      AudioElementManager (all patches connected)
      <audioElementManager v-if="tests['complete'].active" />
      <button
        @click="toggleState('complete')"
      >
        Load
      </button>
      <button
        v-if="!tests['complete'].active"
        @click="toggleState('complete')"
      >
        Unload
      </button>
    </div>
    <div>
      RNBOplayer
      <RNBOPlayer v-if="tests['loadrnbo'].active" />
      <button
        @click="toggleState('loadrnbo')"
      >
        Load
      </button>
      <button
        v-if="!tests['loadrnbo'].active"
        @click="toggleState('loadrnbo')"
      >
        Unload
      </button>
    </div>
  </div>
</template>

<script setup>
// import Player from '~/components/Player.vue'
import NoisePatchMusic from '~/components/experiments/tests/showcases/NoisePatchMusic_glitchOnLoad.vue'
import audioElementManager from '~/pages/experiments/audioElementManager.vue'
import RNBOPlayer from '~/components/experiments/tests/showcases/RNBOPlayer.vue'
const tests = ref({
  noisepatch: { active: false },
  loadrnbo: { active: false },
  complete: { active: false }
})
const toggleState = (stateName) => {
  const test = tests.value
  test[stateName].active = !test[stateName].active
}
</script>
