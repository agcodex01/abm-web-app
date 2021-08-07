import { api } from './../boot/axios'

export default {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      api
        .get('http://localhost:8000/sanctum/csrf-cookie')
        .then((response) => {
          api
            .post('http://localhost:8000/login', credentials)
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
