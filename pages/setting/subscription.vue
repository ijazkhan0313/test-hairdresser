<template>
  <div>
    <div class="row justify-content-center mt-5">
      <div class="col-12 col-sm-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">
                #
              </th>
              <th scope="col">
                Subscription Name
              </th>
              <th scope="col">
                Duration
              </th>
              <th scope="col">
                Payment Method
              </th>
              <th scope="col">
                Payment Type
              </th>
              <th scope="col">
                Subscription Qty
              </th>
              <th scope="col">
                Price
              </th>
              <th scope="col">
                Status
              </th>
              <th scope="col">
                Purchase Date
              </th>
              <th scope="col">
                Expiry Date
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subscription, index) in subscriptions" :key="subscription.id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>{{ subscription.product_name }}</td>
              <td>
                {{ subscription.product_billing_frequency }}
                {{ subscription.product_billing_interval }}
              </td>

              <template v-if="subscription.payment_method === 'card'">
                <i class="fas fa-credit-card" /> Card
              </template>
              <template v-else-if="subscription.payment_method === 'bank'">
                <i class="fas fa-university" /> Bank
              </template>
              <template v-else>
                {{ subscription.payment_method }}
              </template>

              <td>{{ subscription.payment_type }}</td>
              <td>{{ subscription.product_quantity }}</td>
              <td>${{ subscription.product_price }}</td>
              <td>
                <span :class="getStatusClass(subscription.status)">
                  {{ getStatusLabel(subscription.status) }}
                </span>
              </td>
              <td>{{ formatDate(subscription.purchasing_date) }}</td>
              <td>{{ formatDate(subscription.expiry_date) }}</td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="CancelSubscription(subscription.subscription_id)"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl // Access public variable

const subscriptions = ref([])
async function fetchSubscriptions () {
  try {
    const response = await axios.post(
      `${apiUrl}/user-active-subscriptions`,
      {
        email: userStore.user.email
      }
    )
    subscriptions.value = response.data.data
    // console.log('Fetched subscriptions:', response)
  } catch (error) {
    // console.error('Error fetching subscriptions:', error)
  }
}

function formatDate (dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
// Fetch subscriptions when the component is mounted
fetchSubscriptions()

// Define a ref for the subscription ID (you should replace this with your actual logic)
// const subscription = ref('sub_01j4yk5j02xwfwnsjqjgpk4npg') // Replace with your subscription ID
async function CancelSubscription (id) {
  try {
    const response = await axios.post(`${apiUrl}/cancel-subscriptions`, {
      email: userStore.user.email,
      subscription_id: id
    })
    subscriptions.value = response.data.data
    // sweet alert message
    Swal.fire({
      title: 'Subscription Cancel!',
      text: 'Your Subscriptions is Canceled.',
      icon: 'success'
    })
    // console.log('cancel subscriptions:', response.data.data);
  } catch (error) {
    // console.error('Error to cancel subscriptions:', error);
    this.$toast.error('Oops, something went wrong!')
  }
}

function getStatusLabel (status) {
  if (status === 1) {
    return 'Active'
  } else {
    return 'Cancelled'
  }
}

function getStatusClass (status) {
  return status === '0' ? 'badge bg-warning' : 'badge bg-success'
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
</style>
