<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-8">
        <div class="row">
          <div class="col-12">
            <h4 class="fw-bold text-center pt-5">
              {{ t('Account') }}
              <nuxt-link :to="localePath('/setting/editaccount')" class="float-end  pt-1 text-decoration-none" style="color: #e9c046">
                {{ t('Edit_') }}
              </nuxt-link>
            </h4>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-6 ">
            <h5 class="fw-bold text-start text-muted">
              {{ t('First Name') }}
            </h5>
          </div>
          <div class="col-6 ">
            <h5 class="fw-bold  text-end">
              {{ user.first_name }}
            </h5>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-6">
            <h5 class="fw-bold text-muted">
              {{ t('Last Name') }}
            </h5>
          </div>
          <div class="col-6 ">
            <h5 class="fw-bold  text-end">
              {{ user.surname }}
            </h5>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-2">
            <h5 class="fw-bold text-muted">
              Email
            </h5>
          </div>
          <div class="col-10">
            <h5 class="fw-bold  text-end">
              {{ user.email }}
            </h5>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-6">
            <h5 class="fw-bold text-muted">
              {{ t('Password') }}
            </h5>
          </div>
          <div class="col-6">
            <h5 class="fw-bold  text-end">
              •••••••••
            </h5>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-6">
            <h5 class="fw-bold text-muted">
              {{ t('Language') }}
            </h5>
          </div>
          <div class="col-6">
            <h5 v-if="user.language=='de'" class="fw-bold  text-end">
              German
            </h5>
            <h5 v-else class="fw-bold  text-end">
              English
            </h5>
          </div>
        </div>
        <div class="row pt-4">
          <div class="col-12 text-center">
            <button class="btn col-12 col-sm-12 col-md-3 fw-bold btn-outline-dark" @click="logoutNow">
              {{ t("Log Out") }}
            </button>
          </div>
        </div>

        <div class="row pt-5 pb-4 px-2">
          <div class="col-12  rounded text-center py-3 py-md-5" style="background-image: linear-gradient(40.53deg, #E9A446 6.68%, #E9C046 100%)">
            <h4 class="text-center text-white ">
              {{ t("Get another free 30 days") }}
            </h4>
            <h5 class="text-center px-2 px-md-5 text-white pt-2">
              {{ t("You can still use Mindboost for 7 days for free. Subscribe to increase your productivity with Mindboost afterwards.") }}
            </h5>
            <NuxtLink :to="localePath('/setting/subscription')" disabled type="button" class="btn px-4 py-2 mt-2 mt-md-3 fs-5" style="background-color: white;gap: 10px;">
              {{ t("Subscribe") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
  name: 'SettingPage',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      t,
      localePath
    }
  },

  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    logoutNow () {
      this.logout()
      this.$axios.post('/api/logout').then(() => {
        this.$router.push(this.localePath('/auth/login'))
      }).catch(() => {
        this.$router.push(this.localePath('/auth/login'))
      })
    }
  }

}
</script>

<style>

</style>
