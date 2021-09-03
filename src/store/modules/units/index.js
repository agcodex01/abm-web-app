import tableHeader from './unitTable_config'
import { getUnits } from '../../../services/UnitsService'
import { api } from 'src/boot/axios'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    selectedUnit: null,
    tableHeader: tableHeader
  }),
  getters: {
    getUnits: state => state.units,
    getSelectedUnit: state => state.selectedUnit,
    getTableHeader: state => state.tableHeader
  },
  actions: {
    getUnits: ({ commit }) => {
      getUnits().then(response => {
        commit('SET_UNITS', response.data)
      }).catch(error => console.error(error))
    },
    async deleteUnit ({ commit }, unit) {
      const response = await api.delete(`/units/${unit.row.id}`)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_UNIT', unit.row.id)
      } else {
        console.error(response.statusText)
      }
    },
    async createUnit ({ commit }, newUnit) {
      const response = await api.post('/units', newUnit)
      if (response.status === 200 || response.status === 204) {
        commit('CREATE_UNIT', newUnit)
      } else {
        console.error(response.statusText)
      }
    },
    async getSelectedUnit ({ commit }, unit) {
      commit('SET_SELECTED_UNIT', unit)
      this.$router.push({ name: 'updateUnit', params: { id: unit.row.id } })
    },
    async editUnit ({ commit }, unit) {
      const response = await api.put(`/units/${unit.id}`, unit)
      if (response.status === 200 || response.status === 204) {
        const newUnit = JSON.parse(response.config.data)
        commit('EDIT_UNIT', newUnit)
        return newUnit
      } else {
        console.error(response.statusText)
      }
    }
  },
  mutations: {
    SET_UNITS (state, data) {
      state.units = data
    },
    DELETE_UNIT (state, data) {
      const units = state.units.filter(t => t.id !== data)
      state.units = units
    },
    CREATE_UNIT (state, data) {
      state.units = state.units + data
    },
    EDIT_UNIT (state, data) {
      state.units.forEach(unit => {
        if (unit.id === data.id) {
          unit = data
        }
      })
    },
    SET_SELECTED_UNIT (state, data) {
      state.selectedUnit = data
      console.log(data)
    }
  }
}
