<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-sm-8">
        <h4 class="fw-bold text-center pt-5 me-5">
          <span class="float-start " style="cursor: pointer" @click="$router.go(-1)"><i class="fa-solid fa-arrow-left-long" /></span>
          {{ t("Edit Account") }}
        </h4>
        <div class="row justify-content-center">
          <div class="col-11 col-md-8">
            <form @submit.prevent="saveUser">
              <div class="row pt-5">
                <div class="col-12">
                  <label class="text-muted ">{{ t("First Name") }} </label>
                  <input v-model="form.first_name" type="text" class="form-control" placeholder="First Name">
                  <div v-if="errors.first_name" class="invalid-feedback d-block">
                    {{ errors.first_name[0] }}
                  </div>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col-12">
                  <label class="text-muted ">{{ t("Surname") }} </label>
                  <input v-model="form.surname" type="text" class="form-control" placeholder="Surname">
                  <div v-if="errors.surname" class="invalid-feedback d-block">
                    {{ errors.surname[0] }}
                  </div>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col-12">
                  <label class="text-muted ">{{ t("Email") }} </label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="Email">
                  <div v-if="errors.email" class="invalid-feedback d-block">
                    {{ errors.email[0] }}
                  </div>
                </div>
              </div>

              <div class="row pt-3">
                <div class="col-12">
                  <label class="text-muted ">{{ t("Password") }} </label>
                  <input v-model="form.password" type="password" class="form-control" placeholder="Password">
                  <div v-if="errors.password" class="invalid-feedback d-block">
                    {{ errors.password[0] }}
                  </div>
                </div>
              </div>
              <div class="row pt-3">
                <div class="col-12">
                  <label class="text-muted ">{{ t("Language") }} </label>
                  <select v-model="form.language" class="form-select" @change="changeLanguage">
                    <option value="en">
                      English
                    </option>
                    <option value="de">
                      German
                    </option>
                  </select>
                  <div v-if="errors.language" class="invalid-feedback d-block">
                    {{ errors.language[0] }}
                  </div>
                </div>
              </div>

              <div class="row pt-5 ">
                <div class="col-12 text-center">
                  <button type="submit" class="btn text-white fs-5  col-12 fw-bold py-2 " style="background-color: #e9c046">
                    {{ t("Save Changes") }}  <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">{{ t("Loading...") }} </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
// import Index from '~/pages/index.vue'
import { useUserStore } from '~/stores/user'
export default {
  name: 'EditAccount',
  components: {
    // Index
  },

  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const switchLocalePath = useSwitchLocalePath()
    const changeLanguage = (locale) => {
      // console.log('switch', locale)
      useRouter().push(switchLocalePath(locale))

      // i18n.global.locale.value=
    }
    return { t, localePath, changeLanguage }
  },
  data () {
    return {
      loading: false,
      form: {
        first_name: '',
        surname: '',
        email: 'email',
        password: '',
        language: 'en'
      },
      errors: []
    }
  },

  computed: {
    ...mapState(useUserStore, ['user'])
  },
  mounted () {
    this.form.first_name = this.user.first_name
    this.form.email = this.user.email
    this.form.surname = this.user.surname
    this.form.language = this.user.language
  },
  methods: {

    ...mapActions(useUserStore, ['updateUser']),
    saveUser () {
      this.loading = true
      // console.log('LANGUNGAUNGUNGANG ' + this.form.language)

      this.$axios.post('/api/account/update', this.form).then(({ data }) => {
        this.changeLanguage(this.form.language)
        this.loading = false
        if (data.success) {
          this.$toast.success(data.message)
          this.updateUser(data.user)
        }
      }).catch((error) => {
        this.loading = false
        this.$toast.error('Something wrong while saving...')
        if (error.response.status === 422) {
          this.errors = error.response.data.errors
        }
      })
    }
  }
}
</script>

<style>

</style>
