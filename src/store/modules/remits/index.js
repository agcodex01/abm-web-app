import transactionPreviewHeader from 'src/store/modules/remits/transaction_preview'
import REMIT from 'src/store/types/remits'
import GeneralTypes from 'src/store/types/general'
import { STATUS_TYPE } from 'src/util/transaction'
import tableHeader from 'src/store/modules/remits/table_config'
import RemitService from 'src/services/RemitService'

export default {
  namespaced: true,
  state: () => ({
    remits: [],
    transactionPreviewHeader,
    selectedTransactions: [],
    showRemitDialog: false,
    tableHeader,
    remitTransactions: [],
    remit: null
  }),
  getters: {
    [REMIT.getters.GET_REMITS]: state => state.remits,
    [REMIT.getters.GET_SELECTED_TRANSACTIONS]: state => state.selectedTransactions,
    [REMIT.getters.GET_REMITS_TRANSACTION_PREVIEW_HEADER]: state => state.transactionPreviewHeader,
    [REMIT.getters.GET_TABLE_HEADER]: state => state.tableHeader,
    [REMIT.getters.GET_REMIT_DIALOG_STATUS]: state => state.showRemitDialog,
    [REMIT.getters.GET_TOTAL]: state => {
      let total = 0
      if (!state.selectedTransactions) {
        return total
      }

      state.selectedTransactions.forEach(item => {
        total += item.amount
      })

      return total
    },
    [REMIT.getters.GET_REMIT_TRANSACTIONS]: state => state.remitTransactions,
    [REMIT.getters.GET_REMIT]: state => state.remit
  },
  actions: {
    [REMIT.actions.GET_REMITS]: async ({ commit }, remitFilter) => {
      commit(
        `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
        true,
        { root: true }
      )
      await RemitService.getRemits(remitFilter)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMITS, data)
          commit(
            `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
            false,
            { root: true }
          )
        }).catch(errors => console.error(errors))
    },
    [REMIT.actions.CREATE_REMIT]: async ({ commit }, { remitter, selected, total }) => {
      const transactionIds = selected.map(item => {
        return item.id
      })
      const remit = {
        transaction_ids: transactionIds,
        total,
        remitted_by: remitter
      }
      commit(
        `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
        true,
        { root: true }
      )
      await RemitService.createRemit(remit)
        .then(({ data }) => {
          commit(REMIT.mutations.ADD_REMIT, data)
          commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, false)
          commit(REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS, [])
        })
        .catch(errors => console.error(errors))
        .finally(() => {
          commit(
            `${GeneralTypes.namespace}/${GeneralTypes.mutations.MUTATION_SET_LOADING}`,
            false,
            { root: true }
          )
        })
    },
    [REMIT.actions.GET_REMIT_TRANSACTIONS]: async ({ commit }, remitId) => {
      await RemitService.getRemitTransactions(remitId)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMIT_TRANSACTIONS, data)
        }).catch(errors => console.error(errors))
    },
    [REMIT.actions.UPDATE_SELECTED_TRANSACTIONS]: ({ commit }, selected) => {
      commit(REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS, selected)
    },
    [REMIT.actions.OPEN_REMIT_DIALOG]: ({ commit }) => {
      commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, true)
    },
    [REMIT.actions.CLOSE_REMIT_DIALOG]: ({ commit }) => {
      commit(REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS, false)
    },
    [REMIT.actions.GET_REMIT]: async ({ commit }, remitId) => {
      await RemitService.getRemit(remitId)
        .then(({ data }) => {
          commit(REMIT.mutations.SET_REMIT, data)
        }).catch(errors => console.error(errors))
    }
  },
  mutations: {
    [REMIT.mutations.SET_REMITS]: (state, remits) => {
      state.remits = remits
    },
    [REMIT.mutations.ADD_REMIT]: (state, remit) => {
      state.remits.unshift(remit)
    },
    [REMIT.mutations.UPDATE_SELECTED_TRANSACTIONS]: (state, transactions) => {
      state.selectedTransactions = transactions.filter(item => item.status === STATUS_TYPE.PENDING)
    },
    [REMIT.mutations.UPDATE_REMIT_DIALOG_STATUS]: (state, status) => {
      state.showRemitDialog = status
    },
    [REMIT.mutations.SET_REMIT_TRANSACTIONS]: (state, transactions) => {
      state.remitTransactions = transactions
    },
    [REMIT.mutations.SET_REMIT]: (state, remit) => {
      state.remit = remit
    }
  }
}
