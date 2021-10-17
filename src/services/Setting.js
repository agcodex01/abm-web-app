import { api } from 'src/boot/axios'

const SettingService = {
  get: () => {
    return api.get('/settings')
  },
  update: (data) => {
    return api.put('/settings', data)
  }
}

export default SettingService
