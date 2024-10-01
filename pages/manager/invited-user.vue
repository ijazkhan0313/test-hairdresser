<template>
  <div class="row justify-content-center mt-5">
    <div class="col-12 my-4 col-sm-8">
      <!-- form invite users -->
      <div class="row g-3">
        <div class="col-md-9">
          <label for="inputPassword2" class="visually-hidden">Email address</label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            name="email"
            placeholder="Enter email"
            aria-describedby="emailHelp"
          >
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary btn-sm" @click="inviteUser">
            Invite User
          </button>
        </div>
      </div>
    </div>
    <!-- team members -->
    <div class="card col-12 col-sm-8 mt-4">
      <div class="card-header">
        <h6>Team Members</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Invitation Date</th>
                <th scope="col">Invitation Date</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="teamMembers.length === 0">
                <tr>
                  <td colspan="11" class="text-center">
                    No Cancelled Subscriptions available
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(teamMember, index) in teamMembers" :key="teamMember.id">
                  <th scope="row">
                    {{ index + 1 }}
                  </th>
                  <td>{{ teamMember.email }}</td>
                  <td>
                    <span :class="badgeClass(teamMember.status)">
                      {{ badgeText(teamMember.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(teamMember.created_at) }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="cancelInvitation(teamMember.user_id)">
                      Cancel Invitation
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- invited users -->
    <div class="card col-12 col-sm-8 mt-4">
      <div class="card-header">
        <h6>Invited Users</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Invitation Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="pendingInvitations.length === 0">
                <tr>
                  <td colspan="5" class="text-center">
                    Pending invited users not found
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(pendingInvitation, index) in pendingInvitations" :key="pendingInvitation.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ pendingInvitation.email }}</td>
                  <td>
                    <span :class="badgeClass(pendingInvitation.status)">
                      {{ badgeText(pendingInvitation.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(pendingInvitation.created_at) }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="DeleteInvitation(pendingInvitation.user_id)">
                      Delete Invitation
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
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '~/stores/user'

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl // Access public variable

const userStore = useUserStore()
const data = useUserStore()

// Define a reactive variable for email
const email = ref('')
const pendingInvitations = ref([])
const teamMembers = ref([])

// Function to send invitation
async function inviteUser () {
  if (!email.value) {
    return
  }
  try {
    await axios.post(`${apiUrl}/invitations/send`, {
      email: email.value,
      inviter_id: data.user.id
    })
    // Sweet alert for successful invitation
    Swal.fire({
      title: 'Good job!',
      text: 'Invitation email is sent successfully',
      icon: 'success'
    })
    // fetch invited users
    setTimeout(() => location.reload(), 2000)
    // fetchInvitedUsers()
  } catch (error) {
    // Check if the error response indicates that the user is already invited
    if (error.response && error.response.status === 409) { // Assuming 409 is the status for already invited
      Swal.fire({
        title: 'Already Invited',
        text: 'This user has already been invited.',
        icon: 'warning'
      })
    } else {
      // Handle other types of errors
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue sending the invitation. Please try again.',
        icon: 'error'
      })
    }
  }
}

/**
 * get invited users from backend
 */
async function fetchInvitedUsers () {
  try {
    const response = await axios.post(
      `${apiUrl}/invited-users`,
      {
        inviter_id: userStore.user.id
      }
    )
    pendingInvitations.value = response.data.data || [] // Ensure it's an array
  } catch (error) { }
}

/**
 * fetchTeamMembers from backend
 */
async function fetchTeamMembers () {
  try {
    const response = await axios.post(
      `${apiUrl}/team-members`,
      {
        inviter_id: userStore.user.id
      }
    )
    teamMembers.value = response.data.data
  } catch (error) { console.log(error) }
}

// cancel Invitations
async function cancelInvitation (id) {
  try {
    const response = await axios.post(
      `${apiUrl}/cancel-invitation`,
      {
        inviter_id: userStore.user.id,
        user_id: id
      }
    )
    // sweet alert message
    Swal.fire({
      title: 'Good job!',
      text: 'Invitation canceled successfully.',
      icon: 'success'
    })
    // reload the window after 2 seconds
    setTimeout(() => location.reload(), 2000)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
  }
  getStatusClass() // added to avoid an unused error
}

// Delete Invitations
async function DeleteInvitation (id) {
  try {
    const response = await axios.post(
      `${apiUrl}/delete-invitation`,
      {
        inviter_id: userStore.user.id,
        user_id: id
      }
    )
    // sweet alert message
    Swal.fire({
      title: 'Good job!',
      text: 'Invitation deleted successfully.',
      icon: 'success'
    })

    // Remove the deleted invitation from pendingInvitations
    pendingInvitations.value = pendingInvitations.value.filter(
      invitation => invitation.user_id !== id // Ensure 'user_id' is correct
    )

    // reload the window after 2 seconds
    setTimeout(() => location.reload(), 2000)
  } catch (error) { }
}

// Fetch subscriptions when the component is mounted
fetchInvitedUsers()
fetchTeamMembers()

/**
 * table functions
 * return badgeClass
 */
function badgeClass (status) {
  return {
    badge: true,
    'bg-warning': status === 0, // Pending
    'bg-success': status === 1 // Active
  }
}
/**
 * Returns a human-readable text representation of a status code.
 */
function badgeText (status) {
  return status === 0 ? 'Pending' : 'Active'
}

/**
 * Formats a date string into a localized date string in the format YYYY-MM-DD.
 */
function formatDate (dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style></style>
