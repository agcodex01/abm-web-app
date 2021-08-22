// import db from 'app/db'
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import { api } from 'src/boot/axios'

export default {
  namespaced: true,
  state: () => ({
    billers: [],
    biller: null,
    types: [],
    selectedBillerType: BILLER_TYPE.ALL,
    billersForFilter: []
  }),
  getters: {
    [BILLER.getters.GET_BILLERS]: state => state.billers,
    [BILLER.getters.GET_BILLER_TYPES]: state => state.types,
    [BILLER.getters.GET_BILLERS_FOR_FILTER]: state => state.billersForFilter
  },
  actions: {
    [BILLER.actions.GET_BILLERS]: ({ commit, dispatch }) => {
      api.get('/billers').then(({ data }) => {
        const billersForFilter = data.map(unit => Object.assign({}, {
          value: unit.name,
          label: unit.name
        }))
        commit(BILLER.mutations.SET_BILLERS, data)
        commit(BILLER.mutations.SET_BILLERS_FOR_FILTER, billersForFilter)
        dispatch(BILLER.actions.GET_BILLER_TYPES)
      })
    },
    [BILLER.actions.GET_BILLER_TYPES]: ({ commit }) => {
      api.get('billers/u/types').then(({ data }) => {
        data.unshift(BILLER_TYPE.ALL)
        commit(BILLER.mutations.SET_BILLER_TYPES, data)
      })
    }
  },
  mutations: {
    [BILLER.mutations.SET_BILLERS]: (state, billers) => {
      state.billers = billers
    },
    [BILLER.mutations.SET_BILLER_TYPES]: (state, types) => {
      state.types = types
    },
    [BILLER.mutations.SET_BILLERS_FOR_FILTER]: (state, billers) => {
      state.billersForFilter = billers
    }
  }
}
