import UserService from 'src/services/UserService'
import USER from 'src/store/types/users'
import usersTableConfig from './users_table_config'

export default {
  namespaced: true,
  state: () => ({
    users: [],
    user: null,
    usersTableConfig,
    roles: []
  }),
  getters: {
    [USER.getters.GET_USERS]: state => state.users,
    [USER.getters.GET_USERS_TABLE_CONFIG]: state => state.usersTableConfig,
    [USER.getters.GET_USER]: state => state.user,
    [USER.getters.GET_ROLES]: state => state.roles
  },
  actions: {
    [USER.actions.GET_USERS]: ({ commit }) => {
      UserService.getUsers().then(({ data }) => {
        commit(USER.mutations.SET_USERS, data)
      }).catch(errors => console.error(errors))
    },
    [USER.actions.GET_USER]: async ({ commit }, id) => {
      await UserService.getUser(id).then(({ data }) => {
        commit(USER.mutations.SET_USER, data)
      }).catch(errors => console.error(errors))
    },
    [USER.actions.CREATE_USER]: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        UserService.createUser(data).then(({ data }) => {
          commit(USER.mutations.SET_USER, data)
          resolve(data)
        }).catch(errors => reject(errors.response.data.errors))
      })
    },
    [USER.actions.UPDATE_USER]: (context, data) => {
      return UserService.updateUser(data.user, data.id)
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
    }
  }
}
