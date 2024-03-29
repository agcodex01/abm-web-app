const LAYOUT = {
  namespace: 'layout',
  getters: {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    UNREAD_COUNT_NOTIFICATION: 'UNREAD_COUNT_NOTIFICATION',
    FETCHING_NOTIFICATIONS: 'FETCHING_NOTIFICATIONS'
  },
  actions: {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    READ_NOTIFICATION: 'READ_NOTIFICATION',
    MARK_ALL_AS_READ_NOTIFICATIONS: 'MARK_ALL_AS_READ_NOTIFICATIONS'
  },
  mutations: {
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_FETCHING_NOTIFICATIONS: 'SET_FETCHING_NOTIFICATIONS',
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    READ_NOTIFICATION: 'READ_NOTIFICATION'
  }
}

export default LAYOUT
