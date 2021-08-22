import Unit from 'src/store/types/units'
import { api } from 'src/boot/axios'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    unitsForFilter: []
  }),
  getters: {
    [Unit.getters.GET_UNITS]: state => state.units,
    [Unit.getters.GET_UNITS_FOR_FILTER]: state => state.unitsForFilter
  },
  actions: {
    [Unit.actions.GET_UNITS]: ({ commit }) => {
      api.get('/units').then(({ data }) => {
        const unitsForFilter = data.map(unit => Object.assign({}, {
          value: unit.name,
          label: unit.name
        }))
        commit(Unit.mutations.SET_UNITS, data)
        commit(Unit.mutations.SET_UNITS_FOR_FILTER, unitsForFilter)
      }).catch(errors => console.error(errors))
    }
  },
  mutations: {
    [Unit.mutations.SET_UNITS]: (state, units) => {
      state.units = units
    },
    [Unit.mutations.SET_UNITS_FOR_FILTER]: (state, units) => {
      state.unitsForFilter = units
    }
  }
}
