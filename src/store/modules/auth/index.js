import AuthService from 'services/AuthService'
import { LocalStorage } from 'quasar'
import _ from 'src/util/validation'
import AuthTypes from 'src/store/types/auth'
import GeneralTypes from 'src/store/types/general'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    [AuthTypes.getters.GET_USER]: (state) => {
      const { ...userFromLocalStorage } = LocalStorage.getItem('user')
      if (!_.isEmpty(userFromLocalStorage)) return Object.assign({}, userFromLocalStorage)
      return state.user
    },
    [AuthTypes.getters.GET_TOKEN]: (state) => state.token
  },
  mutations: {
    [AuthTypes.mutations.SET_USER]: (state, user) => {
      state.user = user
    },
    [AuthTypes.mutations.SET_TOKEN]: (state, token) => {
      state.token = token
    }
  },
  actions: {
    async [AuthTypes.actions.LOGIN] ({ commit }, credential) {
      return new Promise((resolve, reject) => {
        commit(
          `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
          true,
          { root: true }
        )
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
          }).finally(() => {
            commit(
              `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
              false,
              { root: true }
            )
          })
      })
    },
    async [AuthTypes.actions.LOGOUT] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(
          `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
          true,
          { root: true }
        )
        AuthService.logout(id)
          .then((response) => {
            LocalStorage.remove('user')
            LocalStorage.remove('token')
            resolve(response)
          })
          .catch((errors) => {
            reject(errors)
          })
          .finally(() => {
            commit(
              `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
              false,
              { root: true }
            )
          })
      })
    }
  }
}
