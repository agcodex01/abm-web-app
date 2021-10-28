import AuthService from 'services/AuthService'
import { LocalStorage } from 'quasar'
import _ from 'src/util/validation'
import AuthTypes from 'src/store/types/auth'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
    loading: false
  }),
  getters: {
    [AuthTypes.getters.GET_USER]: (state) => {
      const { ...userFromLocalStorage } = LocalStorage.getItem('user')
      if (!_.isEmpty(userFromLocalStorage)) return Object.assign({}, userFromLocalStorage)
      return state.user
    },
    [AuthTypes.getters.GET_TOKEN]: (state) => {
      const token = LocalStorage.getItem('token')
      if (token) return token
      return state.token
    },
    [AuthTypes.getters.GET_LOADING]: state => state.loading
  },
  mutations: {
    [AuthTypes.mutations.SET_USER]: (state, user) => {
      state.user = user
    },
    [AuthTypes.mutations.SET_TOKEN]: (state, token) => {
      state.token = token
    },
    [AuthTypes.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    }
  },
  actions: {
    async [AuthTypes.actions.LOGIN] ({ commit }, credential) {
      return await new Promise((resolve, reject) => {
        commit(AuthTypes.mutations.SET_LOADING, true)
        AuthService.login(credential)
          .then(({ data }) => {
            LocalStorage.set('user', data.user)
            LocalStorage.set('token', data.token)
            commit(AuthTypes.mutations.SET_USER, data.user)
            commit(AuthTypes.mutations.SET_TOKEN, data.token)
            resolve(data)
          })
          .catch((errors) => {
            reject(errors.response.data.errors)
          }).finally(() => commit(AuthTypes.mutations.SET_LOADING, false))
      })
    },
    async [AuthTypes.actions.LOGOUT] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(AuthTypes.mutations.SET_LOADING, true)
        AuthService.logout(id)
          .then((response) => {
            LocalStorage.remove('user')
            LocalStorage.remove('token')
            resolve(response)
          })
          .catch((errors) => {
            reject(errors)
          })
          .finally(() => commit(AuthTypes.mutations.SET_LOADING, false))
      })
    }
  }
}
