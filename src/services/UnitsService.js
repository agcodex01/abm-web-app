import { api } from '../boot/axios'
import { buildParams } from './Http'

const UnitService = {
  getUnits: (filter) => {
    return api.get('/units', {
      params: buildParams(filter)
    })
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
  },
  disabled: async (id, status) => {
    return api.put(`units/${id}/disabled/${status}`)
  }
}

export default UnitService
