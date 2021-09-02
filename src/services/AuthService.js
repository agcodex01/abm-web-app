import { api, API_BASE_URL } from './../boot/axios'

export default {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      api
        .get(`${API_BASE_URL}/sanctum/csrf-cookie`)
        .then((response) => {
          api
            .post(`${API_BASE_URL}/login`, credentials)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        }).catch((error) => {
          reject(error)
        })
    })
  },
  logout: async (id) => {
    return await api.post(`/logout/${id}`)
  }
}
