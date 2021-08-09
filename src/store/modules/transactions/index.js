import tableHeader from './table_config'
import { getTransactionsByType } from 'services/TransactionService'
import db from 'app/db'
import _ from 'util/validation'
import { BILLER_TYPE } from 'src/store/types/billers'

export default {
  namespaced: true,
  state: () => ({
    transactions: [],
    tableHeader: tableHeader
  }),
  getters: {
    getTransactions: (state, getters, rootState, rootGetters) => {
      if (
        rootGetters['billers/GET_SELECTED_BILLER_TYPE'] === BILLER_TYPE.ALL &&
         _.isEmpty(rootGetters['billers/GET_SELECTED_BILLER'])
      ) return state.transactions

      if (
        rootGetters['billers/GET_SELECTED_BILLER_TYPE'] === BILLER_TYPE.ALL &&
        !_.isEmpty(rootGetters['billers/GET_SELECTED_BILLER'])
      ) {
        return state.transactions.filter((item) =>
          item.biller.includes(rootGetters['billers/GET_SELECTED_BILLER'])
        )
      }

      return state.transactions.filter(
        (item) =>
          item.type === rootGetters['billers/GET_SELECTED_BILLER_TYPE'] &&
          item.biller.includes(rootGetters['billers/GET_SELECTED_BILLER'])
      )
    },
    getTableHeader: (state) => state.tableHeader
  },
  actions: {
    getTransactions: ({ commit }) => {
      commit('SET_TRANSACTIONS', db.transactions())
      // getTransactions.then(response => {
      //   commit('SET_TRANSACTIONS', response.data)
      // }).catch(error => console.error(error))
    }
  },
  mutations: {
    SET_TRANSACTIONS (state, data) {
      state.transactions = data
    },
    remove (state, data) {
      state.transactions.splice(state.transactions.indexOf(data), 1)
    },
    filteredByType (state) {
      return getTransactionsByType(state.transactions, state.transactions.type)
    }
  }
}
