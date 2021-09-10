import UNIT from 'src/store/types/units'
import { api } from 'src/boot/axios'
import UnitService from 'src/services/UnitsService'
import tableHeader from './unit_table_config'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    unit: null,
    unitsForFilter: [],
    tableHeader: tableHeader
  }),
  getters: {
    [UNIT.getters.GET_UNITS]: state => state.units,
    [UNIT.getters.GET_UNITS_FOR_FILTER]: state => state.unitsForFilter,
    [UNIT.getters.GET_UNITS_TABLE_HEADER]: state => state.tableHeader,
    [UNIT.getters.GET_UNIT]: (state) => state.unit
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
    [UNIT.actions.GET_UNIT]: async ({ commit }, id) => {
      await UnitService.getUnit(id)
        .then(({ data }) => {
          commit(UNIT.mutations.SET_UNIT, data)
        })
        .catch((errors) => console.error(errors))
    },
    [UNIT.actions.CREATE_UNIT] ({ commit }, newUnit) {
      return new Promise((resolve, reject) => {
        UnitService.createUnit(newUnit).then(response => {
          commit(UNIT.mutations.CREATE_UNIT, response.data)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    },
    [UNIT.actions.DELETE_UNIT] ({ commit }, id) {
      return new Promise((resolve, reject) => {
        UnitService.deleteUnit(id).then(response => {
          commit(UNIT.mutations.DELETE_UNIT, id)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        })
      })
    },
    [UNIT.actions.UPDATE_UNIT]: async ({ commit }, { id, unit }) => {
      return await new Promise((resolve, reject) => {
        UnitService.updateUnit(id, unit)
          .then(({ data }) => {
            commit(UNIT.mutations.SET_UNIT, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
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
    [UNIT.mutations.DELETE_UNIT]: (state, id) => {
      const units = state.units.filter(t => t.id !== id)
      state.units = units
    },
    [UNIT.mutations.SET_UNIT]: (state, unit) => {
      state.unit = unit
    }
  }
}
