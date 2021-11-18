import { api } from 'src/boot/axios'
import { buildParams } from './Http'

const RemitService = {
  getRemits: async (params) => {
    return await api.get('/remits', {
      params: buildParams(params)
    })
  },
  createRemit: async (remitData) => {
    return await api.post('/remits', remitData)
  },
  getRemit: async (id) => {
    return await api.get(`/remits/${id}`)
  },
  getRemitTransactions: async (id) => {
    return await api.get(`/remits/${id}/transactions`)
  },
  downloadRemitReport: async (id) => {
    return await api.get(`/remits/${id}/reports/download`, {
      responseType: 'blob'
    })
  }
}

export default RemitService
