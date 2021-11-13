import { boot } from 'quasar/wrappers'

import Echo from 'laravel-echo'
import { api } from './axios'

window.Pusher = require('pusher-js')

const echo = new Echo({
  authorizer: (channel, options) => ({
    authorize: async (socketId, callback) => {
      await api.post('broadcasting/auth', {
        socket_id: socketId,
        channel_name: channel.name
      }).then(response => {
        // eslint-disable-next-line node/no-callback-literal
        callback(false, response.data)
      }).catch(error => {
        // eslint-disable-next-line node/no-callback-literal
        callback(true, error)
      })
    }
  }),
  broadcaster: 'pusher',
  wsHost: process.env.PUSHER_APP_HOST,
  key: process.env.PUSHER_APP_KEY,
  cluster: process.env.PUSHER_APP_CLUSTER,
  wsPort: 443,
  forceTLS: true
})

export default boot(async ({ app }) => {
  app.config.globalProperties.$echo = echo
})
