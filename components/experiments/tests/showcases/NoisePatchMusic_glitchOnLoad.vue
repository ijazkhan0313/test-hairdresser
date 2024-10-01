<template>
  <h1>Clitching in audio</h1>
  <h1>Test Version Mic NoisePatch Music: mit WebAudio, mit Noise-Patch & ohne Music-Patch, aber Musik</h1>
  <h2>Currently Artifacts caused by the import of the RNBO Patch </h2>
  <AudioElement
    ref="Noise"
    key="5"
    :src="noise_src"
    title="Noise"
    @update:volume="updateNoiseGain"
  >
    <template #default="{}">
      <div class="icon">
        <img style="width: 25px" src="~/assets/image/noiseicon.svg">
      </div>
    </template>
  </AudioElement>
  <AudioElement
    ref="Music"
    key="1"
    :src="forest_src"
    title="Forest"
    @update:volume="updateMusicGain"
    @update:playing="handlePlayingUpdate"
  >
    <template #default="{ }">
      <div class="icon">
        <!-- tropic icon -->
        <img style="width: 25px" src="~/assets/image/musicicon.svg">
      </div>
    </template>
    <!-- Slot content for AudioElement, if needed -->
  </AudioElement>
</template>
<script lang="ts">
import { createDevice } from '@rnbo/js'
import AudioElement from '../../AudioElement.vue'
import { useAudioStore } from '../../../../stores/audio'
import importedNoisePatcher from '@/assets/patch/test_patch.export.json'

export default {
  name: 'MicNoisePatchMusic',
  components: { AudioElement },
  data () {
    return {
      audioContext: useAudioStore().getContext(),
      playing: false,
      paused: false,
      createdNodes: {} as any,
      noiseDevice: null,
      noise_src: window.location.origin + useRuntimeConfig().public.noise_src,
      forest_src: window.location.origin + useRuntimeConfig().public.forest_src
    }
  },
  beforeMount () {
    const patcher = importedNoisePatcher as any
    return createDevice({
      context: useAudioStore().getContext(),
      patcher
    }).then((_device) => {
      // console.log('RNBO device created:', device)
    })
  },
  methods: {
    handlePlayingUpdate () {
      const noiseElement = this.$refs.Noise as typeof AudioElement
      const noiseAudioElement = noiseElement.$refs.audioElement as HTMLMediaElement
      const musicElement = this.$refs.Music as typeof AudioElement
      const musicAudioElement = musicElement.$refs.audioElement as HTMLMediaElement
      const audioContext = this.audioContext
      const destination = this.audioContext.destination

      this.createdNodes.musicGain ||= audioContext.createGain()
      this.createdNodes.noiseGain ||= audioContext.createGain()

      this.createdNodes.noiseSource = audioContext.createMediaElementSource(noiseAudioElement)
      this.createdNodes.musicSource = audioContext.createMediaElementSource(musicAudioElement)

      this.createdNodes.noiseSource.connect(this.createdNodes.noiseGain)
      this.createdNodes.musicSource.connect(this.createdNodes.musicGain)

      this.createdNodes.noiseGain.connect(destination)
      this.createdNodes.musicGain.connect(destination)
      musicAudioElement.muted = false
      noiseAudioElement.muted = false
    },

    updateNoiseGain (volume: number) {
      this.createdNodes.noiseGain.gain.linearRampToValueAtTime(volume, this.createdNodes.noiseGain.context.currentTime + 0.30)
    },
    updateMusicGain (volume: number) {
      this.createdNodes.musicGain.gain.linearRampToValueAtTime(volume, this.createdNodes.musicGain.context.currentTime + 0.30)
    }
  }
}

</script>
