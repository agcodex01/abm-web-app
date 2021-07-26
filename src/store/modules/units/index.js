import tableHeader from './unitTable_config'
import { getUnits } from '../../../services/UnitsService'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    tableHeader: tableHeader
  }),
  getters: {
    getUnits: state => state.units,
    getTableHeader: state => state.tableHeader
  },
  actions: {
    getUnits: ({ commit }) => {
      getUnits.then(response => {
        commit('SET_UNITS', response.data)
      }).catch(error => console.error(error))
    }
  },
  mutations: {
    SET_UNITS (state, data) {
      state.units = data
    }
  }
}
