import NoficationService from 'src/services/NotificationService'
import LAYOUT from 'src/store/types/layout'
import links from './links'

export default {
  namespaced: true,
  state: () => ({
    header: null,
    links: links,
    notifications: [],
    fetchingNotication: false
  }),
  getters: {
    getHeader: state => state.header,
    getLinks: state => state.links,
    [LAYOUT.getters.GET_NOTIFICATIONS]: state => state.notifications,
    [LAYOUT.getters.UNREAD_COUNT_NOTIFICATION]: state => {
      if (state.notifications.length < 1) {
        return 0
      }
      return state.notifications.filter(n => !n.read_at).length
    },
    [LAYOUT.getters.FETCHING_NOTIFICATIONS]: state => state.fetchingNotication
  },
  actions: {
    [LAYOUT.actions.GET_NOTIFICATIONS]: ({ commit }, data) => {
      commit(LAYOUT.mutations.SET_FETCHING_NOTIFICATIONS, true)
      commit(LAYOUT.mutations.SET_NOTIFICATIONS, [])
      return new Promise((resolve, reject) => {
        NoficationService.fetchUserNotifications(data).then(({ data }) => {
          commit(LAYOUT.mutations.SET_NOTIFICATIONS, data)
          resolve(data)
        }).catch(errors => reject(errors.response.data.errors))
          .finally(() => commit(LAYOUT.mutations.SET_FETCHING_NOTIFICATIONS, false))
      })
    },
    [LAYOUT.actions.READ_NOTIFICATION]: ({ commit }, notiData) => {
      return new Promise((resolve, reject) => {
        NoficationService.readNotification(notiData).then(() => {
          commit(LAYOUT.mutations.READ_NOTIFICATION, notiData.id)
          resolve(true)
        }).catch(errors => reject(errors))
      })
    },
    [LAYOUT.actions.MARK_ALL_AS_READ_NOTIFICATIONS]: ({ commit }, userId) => {
      commit(LAYOUT.mutations.SET_FETCHING_NOTIFICATIONS, true)
      commit(LAYOUT.mutations.SET_NOTIFICATIONS, [])
      return new Promise((resolve, reject) => {
        NoficationService.markAllAsReadNotifications(userId).then(({ data }) => {
          commit(LAYOUT.mutations.SET_NOTIFICATIONS, data)
          resolve(data)
        }).catch(errors => reject(errors.response.data.errors))
          .finally(() => commit(LAYOUT.mutations.SET_FETCHING_NOTIFICATIONS, false))
      })
    }
  },
  mutations: {
    SET_HEADER (state, header) {
      state.header = header
    },
    [LAYOUT.mutations.SET_NOTIFICATIONS]: (state, notifications) => {
      state.notifications = notifications
    },
    [LAYOUT.mutations.SET_FETCHING_NOTIFICATIONS]: (state, isFetching) => {
      state.fetchingNotication = isFetching
    },
    [LAYOUT.mutations.ADD_NOTIFICATION]: (state, notification) => {
      state.notifications.unshift(notification)
    },
    [LAYOUT.mutations.READ_NOTIFICATION]: (state, notificationId) => {
      const notification = state.notifications.find(noti => noti.id === notificationId)
      if (notification) {
        notification.read_at = Date.now()
      }
    }
  }
}
