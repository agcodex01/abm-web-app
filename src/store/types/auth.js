const AuthTypes = {
  namespace: 'auth',
  state: {
    VALIDATION: 'VALIDATION'
  },
  getters: {
    GET_TOKEN: 'GET_TOKEN',
    GET_USER: 'GET_USER',
    GET_VALIDATION: 'GET_VALIDATION'
  },
  mutations: {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER: 'SET_USER'
  },
  actions: {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
  }
}

export default AuthTypes
