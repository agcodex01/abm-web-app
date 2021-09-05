import { api } from 'src/boot/axios'
import { buildParams } from './Http'

const BillerService = {
  getBillers: async (params) => {
    return await api.get('/billers', {
      params: buildParams(params)
    })
  },
  getBiller: async (id) => {
    return await api.get(`/billers/${id}`)
  },
  createBiller: async (billerData) => {
    return await api.post('/billers', billerData)
  },
  updateBiller: async (id, billerData) => {
    return await api.put(`/billers/${id}`, billerData)
  },
  deleteBiller: async (id) => {
    return await api.delete(`/billers/${id}`)
  },
  getBillersType: async () => {
    return await api.get('/billers/u/types')
  }
}

export default BillerService
