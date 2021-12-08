import UserService from 'src/services/UserService'
import USER from 'src/store/types/users'
import usersTableConfig from './users_table_config'

export default {
  namespaced: true,
  state: () => ({
    users: [],
    user: null,
    usersTableConfig,
    roles: [],
    loading: false
  }),
  getters: {
    [USER.getters.GET_USERS]: state => state.users,
    [USER.getters.GET_USERS_TABLE_CONFIG]: state => state.usersTableConfig,
    [USER.getters.GET_USER]: state => state.user,
    [USER.getters.GET_ROLES]: state => state.roles,
    [USER.getters.GET_LOADING]: state => state.loading
  },
  actions: {
    [USER.actions.GET_USERS]: async ({ commit }, userFilter) => {
      commit(USER.mutations.SET_LOADING, true)
      commit(USER.mutations.SET_USERS, [])
      await UserService.getUsers(userFilter).then(({ data }) => {
        commit(USER.mutations.SET_USERS, data)
      }).catch(errors => console.error(errors))
        .finally(() => commit(USER.mutations.SET_LOADING, false))
    },
    [USER.actions.GET_USER]: async ({ commit }, id) => {
      commit(USER.mutations.SET_LOADING, true)
      return await new Promise((resolve, reject) => {
        UserService.getUser(id).then(({ data }) => {
          commit(USER.mutations.SET_USER, data)
          resolve(data)
        }).catch(errors => reject(errors))
          .finally(() => commit(USER.mutations.SET_LOADING, false))
      })
    },
    [USER.actions.CREATE_USER]: ({ commit }, data) => {
      commit(USER.mutations.SET_LOADING, true)
      commit(USER.mutations.SET_USER, [])
      return new Promise((resolve, reject) => {
        UserService.createUser(data).then(({ data }) => {
          commit(USER.mutations.SET_USER, data)
          resolve(data)
        }).catch(errors => reject(errors.response.data.errors))
          .finally(() => commit(USER.mutations.SET_LOADING, false))
      })
    },
    [USER.actions.UPDATE_USER]: ({ commit }, data) => {
      commit(USER.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        UserService.updateUser(data.user, data.id)
          .then(data => resolve(data))
          .catch(errors => reject(errors.response.data.errors))
          .finally(() => commit(USER.mutations.SET_LOADING, false))
      })
    },
    [USER.actions.GET_ROLES]: async ({ commit }) => {
      await UserService.getRoles().then(({ data }) => {
        data = data.map(role => {
          return {
            label: role,
            value: role
          }
        })
        commit(USER.mutations.SET_ROLES, data)
      })
    },
    [USER.actions.GET_USERS_COLLECTOR]: async ({ commit }) => {
      commit(USER.mutations.SET_LOADING, true)
      commit(USER.mutations.SET_USERS, [])
      await UserService.collectors().then(({ data }) => {
        commit(USER.mutations.SET_USERS, data)
      }).catch(errors => console.error(errors))
        .finally(() => commit(USER.mutations.SET_LOADING, false))
    },
    [USER.actions.DISABLE_ACCOUNT]: async ({ commit }, disableDto) => {
      return await new Promise((resolve, reject) => {
        UserService.disabled(disableDto.id, disableDto.status)
          .then(({ data }) => {
            resolve(data)
            commit(USER.mutations.SET_DISABLE_ACCOUNT, data)
          }).catch(errors => reject(errors))
      })
    },
    [USER.actions.RESET_PASSWORD]: async ({ commit }, id) => {
      return await new Promise((resolve, reject) => {
        UserService.resetPassword(id)
          .then(({ data }) => {
            resolve(data)
          }).catch(errors => reject(errors))
      })
    }
  },
  mutations: {
    [USER.mutations.SET_USERS]: (state, data) => {
      state.users = data
    },
    [USER.mutations.SET_USER]: (state, data) => {
      state.user = data
    },
    [USER.mutations.SET_ROLES]: (state, data) => {
      state.roles = data
    },
    [USER.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [USER.mutations.SET_DISABLE_ACCOUNT]: (state, disabled) => {
      state.user.disabled = disabled
    }
  }
}
