import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true
})

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api }
