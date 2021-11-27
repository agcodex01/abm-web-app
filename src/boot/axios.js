import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'
// import router from 'src/router'

const API_BASE_URL = process.env.API_BASE_URL

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true
})

api.interceptors.request.use(function (config) {
  const token = LocalStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export default boot(({ app, router }) => {
  app.config.globalProperties.$api = api

  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      switch (error.response.status) {
        case 401:
          LocalStorage.clear()
          router.push({
            name: 'login'
          })
          break
        case 403:
          router.push({
            name: 'access_denied'
          })
          break
        case 404:
          router.push({
            name: 'not_found'
          })
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )
})

export { api, API_BASE_URL }
