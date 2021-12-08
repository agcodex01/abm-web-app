// import db from 'app/db'
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import tableConfig from './table_config'
import BillerService from 'src/services/BillerService'
import ACCOUNT from 'src/store/types/account'

export default {
  namespaced: true,
  state: () => ({
    billers: [],
    biller: null,
    types: [],
    selectedBillerType: BILLER_TYPE.ALL,
    billersForFilter: [],
    tableConfig,
    loading: false,
    typesLoading: false
  }),
  getters: {
    [BILLER.getters.GET_BILLERS]: (state) => state.billers,
    [BILLER.getters.GET_BILLER_TYPES]: (state) => state.types,
    [BILLER.getters.GET_BILLERS_TABLE_CONFIG]: (state) => state.tableConfig,
    [BILLER.getters.GET_BILLER]: (state) => state.biller,
    [BILLER.getters.GET_LOADING]: state => state.loading,
    [BILLER.getters.GET_TYPE_LOADING]: state => state.typesLoading
  },
  actions: {
    [BILLER.actions.GET_BILLERS]: async ({ commit, dispatch }, filter) => {
      commit(BILLER.mutations.SET_LOADING, true)
      commit(BILLER.mutations.SET_BILLERS, [])
      dispatch(BILLER.actions.GET_BILLER_TYPES)
      await BillerService.getBillers(filter)
        .then(({ data }) => {
          commit(BILLER.mutations.SET_BILLERS, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(BILLER.mutations.SET_LOADING, false))
    },
    [BILLER.actions.GET_BILLER_TYPES]: async ({ commit }) => {
      commit(BILLER.mutations.SET_TYPE_LOADING, true)
      await BillerService.getBillersType().then(({ data }) => {
        data.unshift(BILLER_TYPE.ALL)
        commit(BILLER.mutations.SET_BILLER_TYPES, data)
      }).finally(() => commit(BILLER.mutations.SET_TYPE_LOADING, false))
    },
    [BILLER.actions.GET_BILLER]: async ({ commit, dispatch }, id) => {
      commit(BILLER.mutations.SET_LOADING, true)
      commit(`${ACCOUNT.namespace}/${ACCOUNT.mutations.SET_ACCOUNTS}`, [], { root: true })
      await BillerService.getBiller(id)
        .then(({ data }) => {
          commit(BILLER.mutations.SET_BILLER, data)
          dispatch(`${ACCOUNT.namespace}/${ACCOUNT.actions.GET_ACCOUNTS}`, id, { root: true })
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(BILLER.mutations.SET_LOADING, false))
    },
    [BILLER.actions.CREATE_BILLER]: async ({ commit }, billerData) => {
      commit(BILLER.mutations.SET_LOADING, true)
      return await new Promise((resolve, reject) => {
        BillerService.createBiller(billerData)
          .then(({ data }) => {
            resolve(data)
            commit(BILLER.mutations.SET_BILLER, data)
          })
          .catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(BILLER.mutations.SET_LOADING, false))
      })
    },
    [BILLER.actions.UPDATE_BILLER]: async ({ commit }, { id, biller }) => {
      commit(BILLER.mutations.SET_LOADING, true)
      return await new Promise((resolve, reject) => {
        BillerService.updateBiller(id, biller)
          .then(({ data }) => {
            commit(BILLER.mutations.SET_BILLER, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
          .finally(() => commit(BILLER.mutations.SET_LOADING, false))
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
    [BILLER.mutations.SET_BILLER]: (state, biller) => {
      state.biller = biller
    },
    [BILLER.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    },
    [BILLER.mutations.SET_TYPE_LOADING]: (state, isLoading) => {
      state.typesLoading = isLoading
    }
  }
}
