import tableHeader from './table_config'
import { getTransactions, getTransactionsByType } from './../../../services/TransactionService'

export default {
  namespaced: true,
  state: () => ({
    transactions: [],
    tableHeader: tableHeader
  }),
  getters: {
    getTransactions: state => state.transactions,
    getTableHeader: state => state.tableHeader
  },
  actions: {
    getTransactions: ({ commit }) => {
      getTransactions.then(response => {
        commit('SET_TRANSACTIONS', response.data)
      }).catch(error => console.error(error))
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
