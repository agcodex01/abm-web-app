import { api } from '../boot/axios'

const UnitService = {
  getUnits () {
    return api.get('/units')
  },
  getUnit: async (id) => {
    return await api.get(`/units/${id}`)
  },
  updateUnit: async (id, unitData) => {
    return await api.put(`/units/${id}`, unitData)
  }
}

export default UnitService
