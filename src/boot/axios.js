import { boot } from 'quasar/wrappers'
import axios from 'axios'

const API_BASE_URL = process.env.API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true
})

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api, API_BASE_URL }
