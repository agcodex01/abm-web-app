import Types from '../../types'
import AuthService from './../../../services/AuthService'
import { LocalStorage } from 'quasar'
import _ from 'src/util/validation'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    [Types.AuthTypes.getters.GET_USER]: (state) => {
      const { ...userFromLocalStorage } = LocalStorage.getItem('user')
      if (!_.isEmpty(userFromLocalStorage)) return Object.assign({}, userFromLocalStorage)
      return state.user
    },
    [Types.AuthTypes.getters.GET_TOKEN]: (state) => state.token
  },
  mutations: {
    [Types.AuthTypes.mutations.SET_USER]: (state, user) => {
      state.user = user
    },
    [Types.AuthTypes.mutations.SET_TOKEN]: (state, token) => {
      state.token = token
    }
  },
  actions: {
    async [Types.AuthTypes.actions.LOGIN] ({ commit }, credential) {
      return new Promise((resolve, reject) => {
        commit(
          `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.mutations.MUTATION_SET_LOADING}`,
          true,
          { root: true }
        )
        AuthService.login(credential)
          .then(({ data }) => {
            LocalStorage.set('user', data.user)
            LocalStorage.set('token', data.token)
            commit(Types.AuthTypes.mutations.SET_USER, data.user)
            commit(Types.AuthTypes.mutations.SET_TOKEN, data.token)
            resolve(data)
          })
          .catch((errors) => {
            reject(errors.response.data.errors)
          }).finally(() => {
            commit(
              `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.mutations.MUTATION_SET_LOADING}`,
              false,
              { root: true }
            )
          })
      })
    },
    async [Types.AuthTypes.actions.LOGOUT] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit(
          `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.mutations.MUTATION_SET_LOADING}`,
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
              `${Types.GeneralTypes.namespace}/${Types.GeneralTypes.mutations.MUTATION_SET_LOADING}`,
              false,
              { root: true }
            )
          })
      })
    }
  }
}
