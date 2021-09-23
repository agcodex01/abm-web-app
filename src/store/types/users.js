const USER = {
  namespace: 'users',
  getters: {
    GET_USERS: 'GET_USERS',
    GET_USERS_TABLE_CONFIG: 'GET_USERS_TABLE_CONFIG',
    GET_USER: 'GET_USER',
    GET_ROLES: 'GET_ROLES'
  },
  actions: {
    GET_USERS: 'GET_USERS',
    GET_USER: 'GET_USER',
    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    GET_ROLES: 'GET_ROLES'
  },
  mutations: {
    SET_USERS: 'SET_USERS',
    SET_USER: 'SET_USER',
    SET_ROLES: 'SET_ROLES'
  }
}

export default USER
