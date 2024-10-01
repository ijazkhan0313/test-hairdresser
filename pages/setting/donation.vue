<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8">
        <h2 class="fw-bold text-center me-5 pt-5">
          <span class="float-start" style="cursor: pointer" @click="$router.go(-1)">
            <i class="fa-solid fa-arrow-left-long" /></span>
          {{ t("Donation") }}
        </h2>
        <div class="row">
          <div class="col-12">
            <h4 class="fw-light text-center pt-3">
              {{ t("DonationHeading") }}
            </h4>
          </div>
        </div>
        <div class="row">
          <section class="pricing py-5">
            <div class="row">
              <!-- Basic Tier -->
              <div class="col-md-4">
                <div id="basic-plan" class="card mb-5 mb-lg-0" data-plan="starter">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">
                      Basic
                    </h5>
                    <h6 class="card-price text-center">
                      <span class="price" data-price-type="starter">8.00</span><span class="period">/month</span>
                    </h6>
                    <div v-if="currentSubscription() == 1" class="d-flex justify-content-center my-2">
                      <span class="badge bg-warning">Active</span>
                    </div>
                    <hr />
                    <ul class="fa-ul">
                      <li>

                        <span class="fa-li"><i class="fas fa-check"></i></span>Good for students, employees
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Full access to app

                        
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check" /></span>3
                        Professional soundscapes
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check" /></span>mindboost@technology
                      </li>
                      <li>

                        <span class="fa-li"><i class="fas fa-check"></i></span>14 Days Trial

                      </li>
                      <li>
                        <div class="pricing-toggle my-2 d-flex align-items-center">
                          <div class="me-3">
                            <input id="starter-month" type="radio" class="me-1" name="cycle-starter" value="month"
                              checked />
                            <label for="starter-month" class="form-check-label">Monthly</label>
                          </div>
                          <div>
                            <input id="starter-year" type="radio" class="me-1" name="cycle-starter" value="year" />
                            <label class="form-check-label" for="starter-year">
                              Yearly <sup>save 20%</sup></label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="d-grid">
                      <span v-if="isInvited">
                        <div class="row">
                          <button class="btn btn-warning text-uppercase buy-now" @click="showManagerPlan()">
                            Buy Now
                          </button>
                        </div>
                      </span>
                      <span v-else>
                        <div class="row">
                          <button class="btn btn-warning text-uppercase buy-now">
                            Buy Now
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Team Tier -->
              <div class="col-md-4">
                <div id="team-plan" class="card mb-5 mb-lg-0" data-plan="pro">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">
                      Team
                    </h5>
                    <h6 class="card-price text-center">
                      <span class="price" data-price-type="pro">5</span><span class="period">/month</span>
                    </h6>
                    <div v-if="currentSubscription() == 2" class="d-flex justify-content-center my-2">
                      <span class="badge bg-warning">Active</span>
                    </div>
                    <hr />
                    <ul class="fa-ul">
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Good for colleagues, groups, teams,
                        departments
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Full access to app

                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check" /></span>3
                        Professional soundscapes
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check" /></span>mindboost@technology
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus" /></span>Individual
                        User Management
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus" /></span>Flexible
                        Trial Version
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus" /></span>Coherent
                        invoicing
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus" /></span> + Basic Per
                        User
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus" /></span>30 Days
                        Trial

                      </li>
                      <li>
                        <div class="pricing-toggle my-2 d-flex align-items-center">
                          <div class="me-3">
                            <input id="pro-month" type="radio" class="me-1" name="cycle-pro" value="month" checked />
                            <label for="pro-month" class="form-check-label">Monthly</label>
                          </div>
                          <div>
                            <input id="pro-year" type="radio" class="me-1" name="cycle-pro" value="year" />
                            <label for="pro-year" class="form-check-label">
                              Yearly <sup>save 20%</sup></label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="d-grid">
                      <span v-if="isInvited">
                        <div class="row">
                          <button class="btn btn-warning text-uppercase team-plan" @click="showManagerPlan()">
                            Buy Now
                          </button>
                        </div>
                      </span>
                      <span v-else>
                        <div class="row">
                          <button class="btn btn-warning text-uppercase team-plan">
                            Buy Now
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Enterprise Tier -->
              <div class="col-md-4">
                <div id="enterprise-plan" class="card" data-plan="enterprise">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">
                      Enterprise
                    </h5>
                    <h6 class="card-price text-center"><span>Depends</span></h6>
                    <div v-if="currentSubscription() == 3" class="d-flex justify-content-center my-2">
                      <span class="badge bg-warning">Active</span>
                    </div>
                    <hr>
                    <ul class="fa-ul">
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Good For Enterprise > 200
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Full access to app
                      </li>
                      <li>
                        <span class="fa-li"> <i class="fas fa-check"></i> </span>3 Professional soundscapes
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check" /></span>mindboost@technology
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Individual User Management
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Flexible Trial Version
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>Coherent invoicing
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus"></i></span>Dedicated Partnership
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus"></i></span>In-person Onboarding
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus"></i></span>Individual Pricing
                      </li>
                      <li>
                        <span class="fa-li"><i class="fas fa-plus"></i></span>30
                        Days Trial

                      </li>
                      <li>
                        <div class="pricing-toggle my-2 d-flex align-items-center">
                          <div class="me-3">
                            <input id="enterprise-month" type="radio" class="me-1" name="cycle-enterprise" value="month"
                              checked />
                            <label class="form-check-label" for="enterprise-month">
                              Monthly
                            </label>
                          </div>
                          <div>
                            <input id="enterprise-year" type="radio" class="me-1" name="cycle-enterprise"
                              value="year" />
                            <label for="enterprise-year" class="form-check-label">Yearly <sup>save 20%</sup></label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div class="d-grid">
                      <span v-if="isInvited">
                        <div class="row">
                          <button type="button" class="btn btn-warning text-uppercase" @click="showManagerPlan()">
                            contact us
                          </button>
                        </div>
                      </span>
                      <span v-else>
                        <div class="row">
                          <button type="button" class="btn btn-warning text-uppercase" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            contact us
                          </button>
                        </div>
                      </span>

                      <!-- Modal for enterprise contact us form -->
                      <div id="exampleModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 id="exampleModalLabel" class="modal-title fs-5">
                                Contact Us
                              </h1>
                              <button
                                class="btn-close"
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <form @submit.prevent="submitForm">
                              <div class="modal-body">
                                <div class="mb-3">
                                  <label for="name" class="form-label">Name</label>
                                  <input id="name" v-model="contact_form.name" class="form-control" type="text"
                                    required />
                                </div>
                                <div class="mb-3">
                                  <label for="companyName" class="form-label">Company Name
                                  </label>
                                  <input id="companyName" v-model="contact_form.company_name" type="text"
                                    class="form-control" required />
                                </div>
                                <div class="mb-3">
                                  <label for="message" class="form-label">Message</label>

                                  <textarea
                                    id="message"
                                    v-model="contact_form.message"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="submit" class="btn btn-warning text-uppercase">
                                  Send Message
                                </button>
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
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from 'pinia'
import { useUserStore } from '~/stores/user'

// entery point
export default {
  setup() {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const dataStore = useUserStore() // Initialize store in setup()

    return {
      t,
      localePath,
      dataStore
    }
  },

  // dara store
  data() {
    return {
      oneMonth: false,
      twoMonth: false,
      threeMonth: false,
      loading: false,
      cancel_loading: false,
      subscription: '',
      form: {
        type: 'one'
      },
      contact_form: {
        name: '',
        company_name: '',
        email: 'dowhf@access.bro', // Removed direct reference to userStore
        message: ''
      },
      isInvited: 0,
      isManagerPlan: 0
    }
  },

  // computed
  computed: {
    ...mapStores(useUserStore)
  },

  // mounted
  mounted() {
    this.fetchSubscription()
    this.GetManagerDetails()

    if (window.Paddle) {
      // Initialize Paddle
      Paddle.Environment.set('sandbox')
      Paddle.Initialize({
        token: 'test_27bb608597d1a4d75fe1bce2be7',
        eventCallback: async function (data) {
          if (data.name === 'checkout.completed') {
            // console.log(data)
            try {
              const response = await axios.post(
                `${apiUrl}/paddle-webhook`,
                data
              )
              // console.log("this is subscription data data", response);
              // Access the Pinia store and update the user data
              const userStore = useUserStore()
              userStore.updateUser(response.data.user)
            } catch (error) {
              // console.log(error);
            }
          }
        }
      })

      // Product definitions for each plan
      const products = {
        starter: {
          productId: 'pro_01j508hk3rp5f5g68n7tqv1thd',
          monthPriceId: 'pri_01j508ssstj4n6xra9j8ymr3d1',
          yearPriceId: 'pri_01j508x0rwntqs581rj3xfx49n'
        },
        pro: {
          productId: 'pro_01j5090jy3jkf4w9vr0j279fm5',
          monthPriceId: 'pri_01j50947nd6t9ztgsrq5h6fsmx',
          yearPriceId: 'pri_01j5097bzyp9zrevw0nsagb477'
        },
        enterprise: {
          productId: 'pro_01j509nre47wbdtmqmd6x098s5',
          monthPriceId: 'pri_01j509qknvfx3hv0459kpkvvar',
          yearPriceId: 'pri_01j509ryg22rzs0ahwrb2vwzhq'
        }
      }

      // Functions to handle pricing updates
      const updateBasicPlan = () => {
        const plan = 'starter'
        const cycle = document.querySelector('input[name="cycle-starter"]:checked').value
        const priceId =
          cycle === 'month' ? products[plan].monthPriceId : products[plan].yearPriceId
        Paddle.PricePreview({ items: [{ quantity: 1, priceId }] })
          .then((result) => {
            document.querySelector('#basic-plan .price').textContent =
              result.data.details.lineItems[0].formattedTotals.subtotal
            document.querySelector('#basic-plan .period').textContent =
              cycle === 'month' ? '/month' : '/year'
          })
          .catch(error => console.error(error))
      }

      //  Update the basic plan pricing on page load
      const updateTeamPlan = () => {
        const plan = 'pro'
        const cycle = document.querySelector('input[name="cycle-pro"]:checked').value
        const priceId =
          cycle === 'month' ? products[plan].monthPriceId : products[plan].yearPriceId
        Paddle.PricePreview({ items: [{ quantity: 5, priceId }] })
          .then((result) => {
            document.querySelector('#team-plan .price').textContent =
              result.data.details.lineItems[0].formattedTotals.subtotal
            document.querySelector('#team-plan .period').textContent =
              cycle === 'month' ? '/month' : '/year'
          })
          .catch(error => console.error(error))
      }

      //  Update the enterprise plan pricing on page load
      const updateEnterprisePlan = () => {
        const plan = 'enterprise'
        const cycle = document.querySelector('input[name="cycle-enterprise"]:checked')
          .value
        const priceId =
          cycle === 'month' ? products[plan].monthPriceId : products[plan].yearPriceId
        Paddle.PricePreview({ items: [{ quantity: 1, priceId }] })
          .then((result) => {
            document.querySelector('#enterprise-plan .price').textContent =
              result.data.details.lineItems[0].formattedTotals.subtotal
            document.querySelector('#enterprise-plan .period').textContent =
              cycle === 'month' ? '/month' : '/year"'
          })
          .catch(error => console.error(error))
      }

      // Event handlers for plan and cycle changes
      const handlePlanChange = (event) => {
        const plan = event.target.closest('.card').getAttribute('data-plan')
        if (plan === 'starter') {
          updateBasicPlan()
        } else if (plan === 'pro') {
          updateTeamPlan()
        } else if (plan === 'enterprise') {
          updateEnterprisePlan()
        }
      }

      // Set event listeners for plan and cycle changes
      document.querySelectorAll('input[name^="cycle-"]').forEach((input) => {
        input.addEventListener('change', handlePlanChange)
      })

      // Event handlers for buy now buttons
      document.querySelectorAll('.buy-now').forEach((button) => {
        button.addEventListener('click', () => {
          const plan = button.closest('.card').getAttribute('data-plan')
          const cycle = document.querySelector(`input[name="cycle-${plan}"]:checked`)
            .value
          const priceId =
            cycle === 'month' ? products[plan].monthPriceId : products[plan].yearPriceId
          Paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
            customer: {
              email: this.dataStore.user.email,
              address: { countryCode: 'PK', postalCode: '59351' }
            },
            source: window.location.href
          })
        })
      })

      // Event handlers for team-plan class
      document.querySelectorAll('.team-plan').forEach((button) => {
        button.addEventListener('click', () => {
          const plan = button.closest('.card').getAttribute('data-plan')
          const cycle = document.querySelector(`input[name="cycle-${plan}"]:checked`)
            .value
          const priceId =
            cycle === 'month' ? products[plan].monthPriceId : products[plan].yearPriceId
          Paddle.Checkout.open({
            items: [{ priceId, quantity: 5 }],
            customer: {
              email: this.dataStore.user.email,
              address: { countryCode: 'PK', postalCode: '59351' }
            },
            source: window.location.href
          })
        })
      })

      // Initialize prices
      updateBasicPlan()
      updateTeamPlan()
      updateEnterprisePlan()
    }
  },

  // ======================= methods =======================
  methods: {
    // check user plan
    isDisabled() {
      const dataStore = useUserStore()
      const userasdf = dataStore
      // console.log('store', userasdf); // Debugging
      return (
        !(
          userasdf.user.team_subscription_plan === '1' ||
          userasdf.user.enterprise_subscription_plan === '1'
        ) && userasdf.user.basic_subscription_plan !== '0'
      )
    },
    // Get user current plan
    currentSubscription () {
      const dataStore = useUserStore()
      const userasdf = dataStore
      return userasdf.user.current_subscription_plan
    },
    /**
     * showManagerPlan in toster form
     */
    showManagerPlan () {
      let managerPlan = '' // Changed from const to let
      if (this.isManagerPlan === 1) {
        managerPlan = 'Basic'
        userasdf.active_subscription = 'Basic'
      } else if (this.isManagerPlan === 2) {
        managerPlan = 'Team'
        userasdf.active_subscription = 'Manager'
      } else if (this.isManagerPlan === 3) {
        managerPlan = 'Enterprise'
        userasdf.active_subscription = 'Enterprise'
      }

      this.$toast.success(`Manager already has the ${managerPlan} plan`) // Fixed typo
    },

    /**
     * Submits the contact form to the server
     */
    async submitForm () {
      try {
        await axios.post(
          `${VUE_APP_BACKEND_HOST_ADDRES}/api/enterprise-plan-contact`,
          this.contact_form
        )
        // console.log("Success:", response.data)
        Swal.fire({
          title: 'Good job!',
          text: 'Message sent successfully! Support team will contact you soon.',
          icon: 'success'
        })
      } catch (error) {
        // console.error('Error:', error.response);
        this.$toast.error('Oops, something went wrong!')
      }
    },

    ...mapActions(useUserStore, ['updateUser', 'logout']),

    updateUserNow() {
      this.$axios
        .post('/api/auth/me')
        .then(({ data }) => {
          this.updateUser(data.user)
        })
        .catch(() => {
          this.logout()
          this.$router.push(this.localePath('/auth/login'))
        })
    },

    paypal() {
      window.open('https://www.paypal.com/pools/c/93YzF9GqEP', '_blank')
    },

    fetchSubscription() {
      this.$axios.post('/api/fetch-subscription').then(({ data }) => {
        this.subscription = data.name
        this.oneMonth = data.name === 'monthly'
        this.twoMonth = data.name === 'sixmonth'
        this.threeMonth = data.name === 'yearly'
      })
    },
    async GetManagerDetails() {
      const userStore = useUserStore()
      if (userStore.user.inviter_id) {
        const response = await axios.post(
          `${apiUrl}/fetch-manger-detail`,
          { manager_id: userStore.user.inviter_id }
        )
        // console.log('manager_id', response.data.data)
        this.isInvited = 1
        // console.log('response.data.data.inviter_id', response.data.data.inviter_id)
        this.isManagerPlan = response.data.data.current_subscription_plan
      }
    }
  }
}
</script>

<style>
.active-sub {
  background: #e9c046;
  box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
  border-radius: 12px;
  color: white;
  background-color: #e9c046 !important;
}

.sub-card {
  background: #ffffff;
  box-shadow: 0px 0px 16px 1px rgba(108, 97, 97, 0.05);
  border-radius: 12px;
  color: black;
}

/* style for plan cards  */
.pricing .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.pricing hr {
  margin: 1.5rem 0;
}

.pricing .card-title {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
}

.pricing .card-price {
  font-size: 3rem;
  margin: 0;
}

.pricing .card-price .period {
  font-size: 0.8rem;
}

.pricing ul li {
  margin-bottom: 1rem;
}

.pricing .text-muted {
  opacity: 0.7;
}

.pricing .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  opacity: 0.7;
  transition: all 0.2s;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .pricing .card:hover {
    margin-top: -0.25rem;
    margin-bottom: 0.25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }

  .pricing .card:hover .btn {
    opacity: 1;
  }
}
</style>
