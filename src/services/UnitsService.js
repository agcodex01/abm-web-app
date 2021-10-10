import { api } from '../boot/axios'

const UnitService = {
  getUnits: () => {
    return api.get('/units')
  },
  getUnit: async (id) => {
    return await api.get(`/units/${id}`)
  },
  createUnit: async (unitData) => {
    return await api.post('/units', unitData)
  },
  updateUnit: async (id, unitData) => {
    return await api.put(`/units/${id}`, unitData)
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
