import { api } from '../boot/axios'
import { buildParams } from './Http'

const UnitService = {
  getUnits: () => {
    return api.get('/units')
  },
  getUnit: async (id) => {
    return await api.get(`/units/${id}`)
  },
  createUnit: async (unitData) => {
    return await api.post('/units', buildParams(unitData))
  },
  updateUnit: async (id, unitData) => {
    return await api.put(`/units/${id}`, buildParams(unitData))
  },
  deleteUnit: async (id) => {
    return await api.delete(`/units/${id}`)
  },
  getConfig: async (id) => {
    return await api.get(`/units/${id}/config`)
  },
  createConfig: async (id) => {
    return await api.post(`/units/${id}/config`)
  },
  deleteConfig: async (id) => {
    return await api.delete(`/units/${id}/config`)
  }
}

export default UnitService
