import { api } from 'src/boot/axios'

export default {
  getUsers: async () => {
    return api.get('/users')
  },
  getUser: async id => {
    return api.get(`/users/${id}`)
  },
  createUser: async data => {
    return api.post('/users', data)
  },
  updateUser: async (data, id) => {
    return api.put(`/users/${id}`, data)
  },
  getRoles: async () => {
    return api.get('roles')
  }
}
