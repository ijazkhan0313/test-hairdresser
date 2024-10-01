<template>
  <div>
    <!-- <StateBar /> -->
    <div class="">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAudioStore } from '@/stores/audio'
import StateBar from '~/components/experiments/statemanagement/StateBar.vue'
export default {
  components: [StateBar],
  data () {
    return {
      showPlayer: false,
      readyPlayer: false
    }
  },

  computed: {
    ...mapState(useAudioStore, ['playing', 'scene'])
  },
  watch: {
    // Watch the route query for changes
    '$route.query' () {
      // Implement logic based on query parameters to update showPlayer
      this.updateVisibilityBasedOnRoute()
    }
  },
  beforeMount () {
    useAudioStore() // used for the action mutation of playing state
  },
  mounted () {
    this.updateVisibilityBasedOnRoute()
  },
  methods: {
    ...mapActions(useAudioStore, ['isPlaying', 'setPlaying']),
    updateVisibilityBasedOnRoute () {
      // Define your condition based on the current route
      const path = this.$route.path
      this.showPlayer = !(path.includes('/experiments') ||
                          path.includes('/auth') ||
                          path.includes('/onboarding') ||
                          path.includes('/setting'))
    }

  }
}
</script>
<script setup>

useHead({
  title: 'mindboost',
  meta: {
    name: 'theme-color',
    content: '#E9C046'
  },
  link: [
    // {
    //   href:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
    //   rel:'stylesheet',
    // },
    {
      href: '/favicon.svg',
      rel: 'icon',
      type: 'image/x-icon'
    },
    {
      href: '/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180'
    },
    {
      href: '/android-icon.png',
      rel: 'shortcut icon',
      sizes: '250x250'
    },
    {
      href: '/apple-touch-icon.png',
      rel: 'apple-touch-icon'
    },
    {
      href: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      href: '/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png'
    }, {
      href: '/site.webmanifest',
      rel: 'manifest'
    }
    // { rel: 'stylesheet', href: '../assets/css/style.css' },
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'

    }, {
      src: 'https://cdn.paddle.com/paddle/v2/paddle.js'
    }
  ]
})

</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
.form-switch .form-check-input {
  padding: 10px 16px;
  background-color: #e9c046 !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%343a40'/%3e%3c/svg%3e") !important;
}
.form-check-input:focus {
  border-color: #e9c046 !important;
  outline: 0;
   box-shadow: 0 0 0 0 rgba(13,110,253,.25) !important;
}
.form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%343a40'/%3e%3c/svg%3e") !important;
}
.accordion-button:not(.collapsed){
  background-color: #ffffff2e !important;
}
.accordion-button:focus{
  border: none !important;
 box-shadow: none !important;
}

.dropdown-item:focus, .dropdown-item:hover {
  background-color: #e9c046 !important;
}
.form-check-input:checked {
  border-color: #e9c046 !important;
}
.accordion-button:not(.collapsed)::after {
  /* background-image: var(--bs-accordion-btn-active-icon); */
  background-image: var(--bs-accordion-btn-icon) !important;
}

</style>
