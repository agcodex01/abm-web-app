import { api } from './../boot/axios'

export default {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      api.post('login', credentials)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },
  logout: async (id) => {
    return await api.post(`/logout/${id}`)
  }
}
