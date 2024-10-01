<template>
  <div>
    <div class="row justify-content-center mt-5">
      <!-- Invert user form -->
      <div class="col-12 my-4 col-sm-8">
        <div class="row g-3">
          <div class="col-md-9">
            <label for="inputPassword2" class="visually-hidden">Email address</label>
            <input v-model="email" type="text" class="form-control" name="email" placeholder="Enter email"
              aria-describedby="emailHelp">
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary" @click="inviteUser">
              Invite User
            </button>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="card col-12 col-sm-8 mt-4">
        <div class="card-header">
          <h6>Active Subscription</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive"> <!-- Added this wrapper -->
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subscription Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Subscription Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Invoice</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="subscriptions.length === 0">
              <tr>
                <td colspan="11" class="text-center">No Cancelled Subscriptions available</td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="(subscription, index) in subscriptions" :key="subscription.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ subscription.product_name }}</td>
                <td>
                  {{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}
                </td>
                <td>
                  <template v-if="subscription.payment_method === 'card'">Card</template>
                  <template v-else-if="subscription.payment_method === 'bank'">
                    <i class="fas fa-university"></i> Bank
                  </template>
                  <template v-else>{{ subscription.payment_method }}</template>
                </td>
                <td>{{ subscription.payment_type }}</td>
                <td>{{ subscription.product_quantity }}</td>
                <td>${{ subscription.product_price }}</td>
                <td>
                  <span :class="getStatusClass(subscription.status)">
                    {{ getStatusLabel(subscription.status) }}
                  </span>
                </td>
                <td>{{ formatDate(subscription.expiry_date) }}</td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="fetchAndDisplayInvoice(subscription.paddle_transaction_id)">
                    Invoice
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="CancelSubscription(subscription.subscription_id)">
                    Cancel
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
     <!-- Cancel subscription table -->
<div class="card col-12 col-sm-8 mt-4">
  <div class="card-header">
    <h6>Cancel Subscription</h6>
  </div>
  <div class="card-body">
    <div class="table-responsive"> <!-- Added this wrapper -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Subscription Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Payment Type</th>
            <th scope="col">Subscription Qty</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Invoice</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cancelSubscriptions.length === 0">
            <tr>
              <td colspan="11" class="text-center">No Cancelled Subscriptions available</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(subscription, index) in cancelSubscriptions" :key="subscription.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ subscription.product_name }}</td>
              <td>{{ subscription.product_billing_frequency }} {{ subscription.product_billing_interval }}</td>
              <td>
                <template v-if="subscription.payment_method === 'card'">Card</template>
                <template v-else-if="subscription.payment_method === 'bank'">
                  <i class="fas fa-university"></i> Bank
                </template>
                <template v-else>{{ subscription.payment_method }}</template>
              </td>
              <td>{{ subscription.payment_type }}</td>
              <td>{{ subscription.product_quantity }}</td>
              <td>${{ subscription.product_price }}</td>
              <td>
                <span :class="getStatusClass(subscription.status)">
                  {{ getStatusLabel(subscription.status) }}
                </span>
              </td>
              <td>{{ formatDate(subscription.expiry_date) }}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="fetchAndDisplayInvoice(subscription.paddle_transaction_id)">
                  Invoice
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  </div>
</template>

<script setup>
// Import necessary dependencies
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const subscriptions = ref([])
const cancelSubscriptions = ref([])

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl // Access public variable

/**
 * Fetch and display Active Subscriptions and invoice
 */
async function fetchSubscriptions() {
  try {
    const response = await axios.post(
      `${apiUrl}/user-active-subscriptions`,
      {
        email: userStore.user.email
      }
    )
    subscriptions.value = response.data.data
    console.log('Fetched subscriptions:', response)
  } catch (error) {
    // console.error('Error fetching subscriptions:', error)
    this.$toast.error('Oops, something went wrong!')
  }
}

/**
 * Fetch and display Canceled Subscriptions and invoice
 */
async function fetchCanceledSubscriptions() {
  try {
    const response = await axios.post(
      `${apiUrl}/user-cancel-subscriptions`,
      {
        email: userStore.user.email
      }
    )
    cancelSubscriptions.value = response.data.data // Update the reactive variable
  } catch (error) {
    this.$toast.error('Oops, something went wrong!')
  }
}

/**
 * Formats a date string into a human-readable format (YYYY-MM-DD)
 */
function formatDate (dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Returns a human-readable label for a given status code.
function getStatusLabel (status) {
  if (status === 1) {
    return 'Active'
  } else {
    return 'Cancelled'
  }
}

// Returns a human-readable budge for a given status code.
function getStatusClass (status) {
  return status === 0 ? 'badge bg-warning' : 'badge bg-success'
}

// Fetch subscriptions when the component is mounted
fetchCanceledSubscriptions()
fetchSubscriptions()

// ====================================== invite users ======================================
// Define a reactive variable for email
const email = ref('')

// Function to send invitation
async function inviteUser () {
  if (!email.value) {
    // console.error('Email is required')
    return
  }
  try {
    await axios.post(`${apiUrl}/invitations/send`, {
      email: email.value,
      inviter_id: userStore.user.id
    })
    // sweet alert message
    Swal.fire({
      title: 'Good job!',
      text: 'Inviateion email is sent successfully',
      icon: 'success'
    })

    // You can update subscriptions or handle response here
  } catch (error) {
    // console.error('Error sending invitation:', error)
    this.$toast.error('Oops, something went wrong!')
  }
}

/**
 * Fetches and displays an invoice by making an API call to retrieve the invoice URL.
 *
 * @param {number} invoiceId - The ID of the invoice to fetch and display.
 */
const fetchAndDisplayInvoice = async (invoiceId) => {
  try {
    // Make API call to get the invoice URL
    const response = await axios.post(`${apiUrl}/download-invoice`, {
      invoiceId
    })

    // Get the PDF URL from the response
    const invoiceUrl = response.data.data.url

    // return invoiceUrl;

    if (invoiceUrl) {
      // Open the PDF URL in a new tab
      window.open(invoiceUrl)
      // window.open(invoiceUrl, '_blank');
    } else {
      // console.error('No URL found in the response.')
      this.$toast.error('Oops, something went wrong!')
    }
  } catch (error) {
    // console.error('Error fetching the invoice:', error)
    this.$toast.error('Oops, something went wrong!')
  }
}

/**
 * CancelSubscription
 */
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
      text: 'Your Subscriptionis is Canceled.',
      icon: 'success'
    })
    // console.log('cancel subscriptions:', response.data.data);
  } catch (error) {
    // console.error('Error to cancel subscriptions:', error);
    this.$toast.error('Oops, something went wrong!')
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
</style>
