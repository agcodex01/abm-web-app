import tableHeader from './table_config'
import { getTransactionsByType } from './../../../services/TransactionService'
import db from 'app/db'

export default {
  namespaced: true,
  state: () => ({
    transactions: [],
    tableHeader: tableHeader
  }),
  getters: {
    getTransactions: (state, getters, rootState, rootGetters) => {
      return state.transactions
        .filter(item => item.type === rootGetters['billers/GET_SELECTED_BILLER_TYPE'] && item.biller.includes(rootGetters['billers/GET_SELECTED_BILLER']))
    },
    getTableHeader: state => state.tableHeader
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
