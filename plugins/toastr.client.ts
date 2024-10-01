// @ts-ignore
// eslint-disable-next-line import/no-named-as-default
import Toaster from '@meforma/vue-toaster'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toaster, {
    position: 'bottom-left',
    duration: 2000,
    queue: true,
    max: 1,
    pauseOnHover: false
  })
})
