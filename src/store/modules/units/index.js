import UNIT from 'src/store/types/units'
import { api } from 'src/boot/axios'
import tableHeader from './unit_table_config'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    unitsForFilter: [],
    tableHeader: tableHeader
  }),
  getters: {
    [UNIT.getters.GET_UNITS]: state => state.units,
    [UNIT.getters.GET_UNITS_FOR_FILTER]: state => state.unitsForFilter,
    [UNIT.getters.GET_UNITS_TABLE_HEADER]: state => state.tableHeader
  },
  actions: {
    [UNIT.actions.GET_UNITS]: ({ commit }) => {
      api.get('/units').then(({ data }) => {
        const unitsForFilter = data.map(unit => Object.assign({}, {
          value: unit.name,
          label: unit.name
        }))
        commit(UNIT.mutations.SET_UNITS, data)
        commit(UNIT.mutations.SET_UNITS_FOR_FILTER, unitsForFilter)
      }).catch(errors => console.error(errors))
    },
    [UNIT.actions.CREATE_UNIT] ({ commit }, newUnit) {
      return new Promise((resolve, reject) => {
        api.post('/units', newUnit).then(response => {
          commit(UNIT.mutations.CREATE_UNIT, response.data)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    },
    [UNIT.actions.DELETE_UNIT] ({ commit }, unit) {
      return new Promise((resolve, reject) => {
        api.delete(`/units/${unit.id}`).then(response => {
          commit(UNIT.mutations.DELETE_UNIT, unit.id)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    }
  },
  mutations: {
    [UNIT.mutations.SET_UNITS]: (state, units) => {
      state.units = units
    },
    [UNIT.mutations.SET_UNITS_FOR_FILTER]: (state, units) => {
      state.unitsForFilter = units
    },
    [UNIT.mutations.CREATE_UNIT]: (state, unit) => {
      state.units.push(unit)
    },
    [UNIT.mutations.DELETE_UNIT]: (state, unit) => {
      const units = state.units.filter(t => t.id !== unit)
      state.units = units
    }
  }
}
