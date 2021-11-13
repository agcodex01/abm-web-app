import { api } from 'src/boot/axios'

const NoficationService = {
  fetchUserNotifications: async (data) => {
    return api.get(`/users/${data.userId}/notifications`, {
      params: {
        unRead: data.unRead
      }
    })
  },
  readNotification: async (data) => {
    return api.post(`/users/${data.userId}/notifications/${data.id}/read`)
  },
  markAllAsReadNotifications: (userId) => {
    return api.post(`/users/${userId}/notifications/mark-all-as-read`)
  }
}

export default NoficationService
