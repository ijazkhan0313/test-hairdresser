// stores/counter.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {},
      is_login: false,
      token: '',
      active_subscription: '',
      audioInputDevice: {},
      audioOutputDevice: {},
      nextAuthRequired: Date.now(), // allow offline access for one day
      offlineMode: false // if user is offline then don't try to connect to the backend
    }
  },
  actions: {
    login (user, token) {
      this.user = user
      this.is_login = true
      this.token = token
      if (!this.offlineMode) { this.nextAuthRequired = Date.now() + 24 * 60 * 60 * 1000 }
    },
    logout () {
      this.user = {}
      this.is_login = false
    },
    updateUser (user) {
      this.user = user
    },
    saveInputdevice (device) {
      this.audioInputDevice = device
    },
    saveOutputDevice (device) {
      this.audioOutputDevice = device
    },
    changeOfflineMode (state) {
      this.offlineMode = state
    },
    updateHeadsetType (state) {
      if (this.user) {
        if (!this.user.settings) {
          this.user.settings = {}
        }
        this.user.settings.headphone_type = state
      }
    },
    updateANC (state) {
      if (this.user) {
        if (!this.user.settings) {
          this.user.settings = {}
        }
        // console.log('update Headset Type: ' + state)
        this.user.settings.anc_type = state
      }
    }
  },
  getters: {
    getUserScenery () {
      if (this.user.scenery) {
        return this.user.scenery
      } else {
        return 'meadow'
      }
    },
    isAuthenticated () {
      if (this.is_login === true) {
        this.changeOfflineMode(false)
        return true
      } else if (Date.now() < this.nextAuthRequired) {
        this.changeOfflineMode(true)
        return true
      }
      return false
    }

  },
  persist: true
})
