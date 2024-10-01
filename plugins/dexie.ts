import { db } from '@/lib/db'
// Assuming dexie-db.ts is correctly set up and exported `db`
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('db', db)
})
