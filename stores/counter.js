// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 20 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment (a) {
      this.count = a
    }
  },
  persist: true
})
