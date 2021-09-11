// import db from 'app/db'
import BILLER, { BILLER_TYPE } from 'src/store/types/billers'
import tableConfig from './table_config'
import BillerService from 'src/services/BillerService'
import GeneralTypes from 'src/store/types/general'
import ACCOUNT from 'src/store/types/account'

export default {
  namespaced: true,
  state: () => ({
    billers: [],
    biller: null,
    types: [],
    selectedBillerType: BILLER_TYPE.ALL,
    billersForFilter: [],
    tableConfig
  }),
  getters: {
    [BILLER.getters.GET_BILLERS]: (state) => state.billers,
    [BILLER.getters.GET_BILLER_TYPES]: (state) => state.types,
    [BILLER.getters.GET_BILLERS_FOR_FILTER]: (state) => state.billersForFilter,
    [BILLER.getters.GET_BILLERS_TABLE_CONFIG]: (state) => state.tableConfig,
    [BILLER.getters.GET_BILLER]: (state) => state.biller
  },
  actions: {
    [BILLER.actions.GET_BILLERS]: async ({ commit, dispatch }, billerFilter) => {
      commit(
        `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
        true,
        { root: true }
      )
      await BillerService.getBillers(billerFilter)
        .then(({ data }) => {
          const billersForFilter = data.map((unit) =>
            Object.assign(
              {},
              {
                value: unit.name,
                label: unit.name
              }
            )
          )
          commit(BILLER.mutations.SET_BILLERS, data)
          commit(BILLER.mutations.SET_BILLERS_FOR_FILTER, billersForFilter)
          dispatch(BILLER.actions.GET_BILLER_TYPES)
        })
        .catch((errors) => console.error(errors))
        .finally(() => {
          commit(
            `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
            false,
            { root: true }
          )
        })
    },
    [BILLER.actions.GET_BILLER_TYPES]: async ({ commit }) => {
      await BillerService.getBillersType().then(({ data }) => {
        data.unshift(BILLER_TYPE.ALL)
        commit(BILLER.mutations.SET_BILLER_TYPES, data)
      })
    },
    [BILLER.actions.GET_BILLER]: async ({ commit, dispatch }, id) => {
      await BillerService.getBiller(id)
        .then(({ data }) => {
          commit(BILLER.mutations.SET_BILLER, data)
          dispatch(`${ACCOUNT.namespace}/${ACCOUNT.actions.GET_ACCOUNTS}`, id, { root: true })
        })
        .catch((errors) => console.error(errors))
    },
    [BILLER.actions.CREATE_BILLER]: async ({ commit }, billerData) => {
      return await new Promise((resolve, reject) => {
        BillerService.createBiller(billerData)
          .then(({ data }) => {
            resolve(data)
            commit(BILLER.mutations.SET_BILLER, data)
          })
          .catch((errors) => reject(errors.response.data.errors))
      })
    },
    [BILLER.actions.UPDATE_BILLER]: async ({ commit }, { id, biller }) => {
      return await new Promise((resolve, reject) => {
        BillerService.updateBiller(id, biller)
          .then(({ data }) => {
            commit(BILLER.mutations.SET_BILLER, data)
            resolve(data)
          })
          .catch((errors) => reject(errors.response.data.errors))
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
    },
    [BILLER.mutations.SET_BILLER]: (state, biller) => {
      state.biller = biller
    }
  }
}
