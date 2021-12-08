import UNIT from 'src/store/types/units'
import UnitService from 'src/services/UnitsService'
import tableHeader from './unit_table_config'

export default {
  namespaced: true,
  state: () => ({
    units: [],
    unit: null,
    tableHeader: tableHeader,
    loading: false,
    config: null,
    configLoading: false
  }),
  getters: {
    [UNIT.getters.GET_UNITS]: state => state.units,
    [UNIT.getters.GET_UNITS_TABLE_HEADER]: state => state.tableHeader,
    [UNIT.getters.GET_UNIT]: state => state.unit,
    [UNIT.getters.GET_LOADING]: state => state.loading,
    [UNIT.getters.GET_CONFIG]: state => state.config,
    [UNIT.getters.LOADING_CONFIG]: state => state.configLoading
  },
  actions: {
    [UNIT.actions.GET_UNITS]: ({ commit }, filter) => {
      commit(UNIT.mutations.SET_LOADING, true)
      commit(UNIT.mutations.SET_UNITS, [])
      return new Promise((resolve, reject) => {
        UnitService.getUnits(filter).then(({ data }) => {
          commit(UNIT.mutations.SET_UNITS, data)
          resolve(data)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        }).finally(() => commit(UNIT.mutations.SET_LOADING, false))
      })
    },
    [UNIT.actions.GET_UNIT]: async ({ commit }, id) => {
      commit(UNIT.mutations.SET_LOADING, true)
      await UnitService.getUnit(id)
        .then(({ data }) => {
          commit(UNIT.mutations.SET_UNIT, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(UNIT.mutations.SET_LOADING, false))
    },
    [UNIT.actions.CREATE_UNIT] ({ commit }, newUnit) {
      commit(UNIT.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        UnitService.createUnit(newUnit).then(({ data }) => {
          commit(UNIT.mutations.CREATE_UNIT, data)
          resolve(data)
        }).catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(UNIT.mutations.SET_LOADING, false))
      })
    },
    [UNIT.actions.DELETE_UNIT] ({ commit }, id) {
      commit(UNIT.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        UnitService.deleteUnit(id).then(response => {
          commit(UNIT.mutations.DELETE_UNIT, id)
          resolve(response)
        }).catch((errors) => {
          reject(errors)
          console.log(errors)
        }).finally(() => commit(UNIT.mutations.SET_LOADING, false))
      })
    },
    [UNIT.actions.UPDATE_UNIT]: async ({ commit }, { id, unit }) => {
      commit(UNIT.mutations.SET_LOADING, true)
      return await new Promise((resolve, reject) => {
        UnitService.updateUnit(id, unit)
          .then(({ data }) => {
            commit(UNIT.mutations.SET_UNIT, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(UNIT.mutations.SET_LOADING, false))
      })
    },
    [UNIT.actions.GET_CONFIG]: async ({ commit }, id) => {
      commit(UNIT.mutations.SET_CONFIG, null)
      commit(UNIT.mutations.SET_LOADING_CONFIG, true)
      return await new Promise((resolve, reject) => {
        UnitService.getConfig(id).then(({ data }) => {
          commit(UNIT.mutations.SET_CONFIG, data)
          resolve(data)
        }).catch(errors => reject(errors))
          .finally(() => commit(UNIT.mutations.SET_LOADING_CONFIG, false))
      })
    },
    [UNIT.actions.CREATE_CONFIG]: async ({ commit }, id) => {
      commit(UNIT.mutations.SET_LOADING_CONFIG, true)
      return await new Promise((resolve, reject) => {
        UnitService.createConfig(id).then(({ data }) => {
          commit(UNIT.mutations.SET_CONFIG, data)
          resolve(data)
        }).catch(errors => reject(errors))
          .finally(() => commit(UNIT.mutations.SET_LOADING_CONFIG, false))
      })
    },
    [UNIT.actions.DELETE_CONFIG]: async ({ commit }, id) => {
      commit(UNIT.mutations.SET_LOADING_CONFIG, true)
      return await new Promise((resolve, reject) => {
        UnitService.deleteConfig(id).then(({ data }) => {
          if (data) {
            commit(UNIT.mutations.SET_CONFIG, null)
          }
          resolve(data)
        }).then(errors => reject(errors))
          .finally(() => commit(UNIT.mutations.SET_LOADING_CONFIG, false))
      })
    },
    [UNIT.actions.DISABLE_UNIT]: async ({ commit }, disableDto) => {
      return await new Promise((resolve, reject) => {
        UnitService.disabled(disableDto.id, disableDto.status).then(({ data }) => {
          resolve(data)
        }).catch(errors => reject(errors))
      })
    }
  },
  mutations: {
    [UNIT.mutations.SET_UNITS]: (state, units) => {
      state.units = units
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
    },
    [UNIT.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [UNIT.mutations.SET_CONFIG]: (state, config) => {
      state.config = config
    },
    [UNIT.mutations.SET_LOADING_CONFIG]: (state, isLoading) => {
      state.configLoading = isLoading
    }
  }
}
