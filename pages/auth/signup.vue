<template>
  <div>
    <video-background
      src="/video/bg-video.mp4"
      poster="/images/poster.png"
      style=" height: 100vh;"
    >
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-12 col-lg-4 bg-img d-none d-lg-block"
            style="background-image: url('/images/login.svg');background-size: cover;height: 100vh;"
          />
          <div class="col-12  col-lg-8 pt-4 px-3 px-sm-5 px-md-5 pb-5">
            <div class="row">
              <div class="col-12 py-3 text-center">
                <svg
                  width="225"
                  height="32"
                  viewBox="0 0 225 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="225" height="32" fill="url(#pattern0)" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_129_1673" transform="matrix(0.000429185 0 0 0.0030177 0 -0.000938841)" />
                    </pattern>
                  </defs>
                </svg>
              </div>
            </div>
            <div class="row" style="height: 90vh">
              <div class="col-12 my-auto">
                <div class="col-md-12 align-self-center ">
                  <div class="row pt-3 pb-5">
                    <div class="row" style="margin-bottom: 24px;">
                      <div class="text-center pt-1 ">
                        <h2 class="fw-bolder display-6 text-center">
                          {{ t('Hello,') }} {{ t('Sign Up Header') }}
                        </h2>

                        <p class="text-muted  pt-2 text-center fs-5 singn-up-text  pb-0 mb-0" />
                      </div>
                    </div>
                    <div class="col-12">
                      <form method="POST" @submit.prevent="submitRegister">
                        <!-- Hidden input for the token -->
                        <input type="hidden" name="token" :value="token">
                        <div class="row  px-0 px-md-4 pb-2">
                          <div class="col-12 pt-2 col-md-6 col-lg-6 ">
                            <label class="form-label">{{ t("First Name") }}</label>
                            <input v-model="form.first_name" type="text" placeholder="First Name" class="form-control">
                            <div v-if="errors.first_name" class="invalid-feedback d-block">
                              {{ errors.first_name[0] }}
                            </div>
                          </div>
                          <div class="col-12 pt-2 col-md-6 col-lg-6 ">
                            <label class="form-label">{{ t("Surname") }}</label>
                            <input v-model="form.surname" type="text" placeholder="Surname" class="form-control">
                            <div v-if="errors.surname" class="invalid-feedback d-block">
                              {{ errors.surname[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row  px-0 px-md-4  pb-2">
                          <div class="col-12 col-md-6 pt-2 col-lg-6 ">
                            <label class="form-label">{{ t("Email") }}</label>
                            <input v-model="form.email" type="email" placeholder="Email" class="form-control">
                            <div v-if="errors.email" class="invalid-feedback d-block">
                              {{ errors.email[0] }}
                            </div>
                          </div>
                          <div class="col-12 pt-2 col-md-6 col-lg-6 ">
                            <label class="form-label">{{ t("Password") }}</label>
                            <input v-model="form.password" type="password" placeholder="Password" class="form-control">
                            <div v-if="errors.password" class="invalid-feedback d-block">
                              {{ errors.password[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row px-md-4 pt-3 pb-2">
                          <div class="col-12 col-md-10">
                            <div class="form-check">
                              <input id="flexCheckIndeterminate" class="form-check-input" type="checkbox" value="">
                              <label class="form-check-label" for="flexCheckIndeterminate">
                                <NuxtLink class="signup-link" :to="localePath('/setting/termsandcondition')">
                                  {{ t("Terms & Conditions") }}
                                </NuxtLink>
                                {{ t("I agree to Mindboost's") }}  {{ t("Terms & Conditions") }}
                                {{ t("You can read about how we use and protect your information in our") }}
                                <NuxtLink class="signup-link" :to="localePath('/setting/dataprotection')">
                                  {{ t("Privacy Policy") }}.
                                </NuxtLink>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="row px-4 pt-3">
                          <div class="col-12">
                            <button :disabled="loading" type="submit" style="min-width:fit-content" class="login-btn fw-bold col-4">
                              {{ t("Signup") }}
                              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">{{ t("Loading...") }}</span>
                              </div>
                            </button>
                            <p class="pt-3">
                              {{ t("Already have an Account?") }} <NuxtLink class="signup-link" :to="localePath('/auth/login')">
                                {{ t("Log In") }}
                              </NuxtLink>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </video-background>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { ref, watch } from 'vue'
import backgroundImagePath from '~/assets/image/login4.png'
import { useUserStore } from '@/stores/user'

export default {
  name: 'LoGin',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()

    const route = useRoute() // Get the current route
    const token = ref(route.query.token) // Extract the token from the query parameters

    // Update form token whenever route.query.token changes
    watch(() => route.query.token, (newToken) => {
      token.value = newToken
    })

    return {
      t,
      localePath,
      token
    }
  },
  data () {
    return {
      backgroundImagePath,
      loading: false,
      errors: [],
      form: {
        first_name: '',
        surname: '',
        email: '',
        password: '',
        token: '' // Ensure this is part of the form
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'logout']),

    submitRegister () {
      this.loading = true

      // Update form with the token from setup
      this.form.token = this.token

      this.$axios.post('/api/register', this.form)
        .then(({ data }) => {
          // console.log(data)

          this.loading = false
          this.$toast.success('Signup successfully....')
          this.login(data.user, data.authorisation.token)
          this.$router.push(this.localePath('/onboarding'))
        })
        .catch((error) => {
          this.loading = false
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
            this.$toast.error(error.response.data.message)
          }
        })
    }
  }
} </script>

<style scoped>
@media only screen and (max-width: 587px) {
  p{
    font-size: 16px !important;
  }
}
</style>
