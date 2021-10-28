const AuthTypes = {
  namespace: 'auth',
  getters: {
    GET_TOKEN: 'GET_TOKEN',
    GET_USER: 'GET_USER',
    GET_LOADING: 'GET_LOADING'
  },
  mutations: {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING'
  },
  actions: {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
  }
}

export default AuthTypes
