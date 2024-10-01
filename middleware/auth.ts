import { useUserStore } from '@/stores/user'
import { useLocalePath } from '#imports'
// @ts-ignore
export default defineNuxtRouteMiddleware(() => {
  const app = useNuxtApp()
  // @ts-ignore
  const user = useUserStore(app.$pinia)
  const localePath = useLocalePath()

  if (user.is_login) {
  // app.$toast.success('Sucessfully logged in!')
    // FIXME! https://github.com/MeForma/vue-toaster/issues/33
  } else {
    // app.$toast.error('Long time not see. Please login again.')
    // console.log('You tried to access ' + window.location + '-- This is not possile without login')
    return navigateTo(localePath('/auth/login'))
  }
})
