import { api } from 'src/boot/axios'
import { buildParams } from './Http'

export default {
  getUsers: async (params) => {
    return api.get('/users', {
      params: buildParams(params)
    })
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
  },
  checkAccess: async (id, roles) => {
    return api.get(`/users/${id}/roles/hasAccess`, {
      params: {
        roles
      }
    })
  },
  collectors: () => {
    return api.get('users/roles/collectors')
  },
  resetPassword: (id) => {
    return api.put(`users/${id}/password-reset`)
  },
  disabled: (id, status) => {
    return api.put(`users/${id}/disabled/${status}`)
  }
}
