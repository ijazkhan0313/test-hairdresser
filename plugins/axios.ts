import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default defineNuxtPlugin(() => {
  const defaultUrl = 'https://test-hairdressers.dowhf.com' // 8999 Port
  // const defaultUrl = 'https://b.mindboost.team' // 8999 Port

  // const defaultUrl = 'http://localhost:8000'
  // const defaultUrl = process.env.VUE_APP_BACKEND_HOST_ADDRESS || 'https://b.mindboost.team'

  // Access Pinia state
  // @ts-ignore
  const api: AxiosInstance = axios.create({
    // @ts-ignore
    baseURL: defaultUrl,
    headers: {
      common: {}
    }
  })
  // @ts-ignore
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    // @ts-ignore
    config.baseURL = defaultUrl
    const token = mapState(useUserStore, ['token']).token()
    // @ts-ignore
    config.headers.Authorization = 'Bearer ' + token
    return config
  })
  return {
    provide: {
      axios: api
    }
  }
})
