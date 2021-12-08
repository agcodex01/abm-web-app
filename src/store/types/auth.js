const AuthTypes = {
  namespace: 'auth',
  getters: {
    GET_TOKEN: 'GET_TOKEN',
    GET_USER: 'GET_USER',
    GET_LOADING: 'GET_LOADING',
    GET_USER_NAME: 'GET_USER_NAME'
  },
  mutations: {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    SET_USER_NAME: 'SET_USER_NAME'
  },
  actions: {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
  }
}

export default AuthTypes
