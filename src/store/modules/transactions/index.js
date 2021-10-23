import tableHeader from './table_config'
import {
  getTransactions
} from 'services/TransactionService'
import { BILLER_TYPE } from 'src/store/types/billers'
import TRANSACTION from 'src/store/types/transactions'
import { STATUS_TYPE, CREATED_AT } from 'util/transaction'
import TransactionUtil from 'src/util/transaction'

export default {
  namespaced: true,
  state: () => ({
    transactions: [],
    transactionsForFilter: {
      unitName: '',
      billerName: '',
      billerType: BILLER_TYPE.ALL.value,
      status: STATUS_TYPE.PENDING,
      createdAt: CREATED_AT.TODAY.value
    },
    tableHeader: tableHeader,
    loading: false
  }),
  getters: {
    [TRANSACTION.getters.GET_FILTER]: (state) => state.transactionsForFilter,
    [TRANSACTION.getters.GET_TRANSACTIONS]: (state) => state.transactions,
    [TRANSACTION.getters.GET_TRANSACTIONS_TABLE_HEADER]: state => state.tableHeader,
    [TRANSACTION.getters.GET_STATUS_COLOR]: state => status => TransactionUtil.getStatusColor(status),
    [TRANSACTION.getters.GET_TYPE_COLOR]: state => type => TransactionUtil.getTypeColor(type),
    [TRANSACTION.getters.REMITTABLE]: state => status => TransactionUtil.remittable(status),
    [TRANSACTION.getters.GET_LOADING]: state => state.loading
  },
  actions: {
    [TRANSACTION.actions.GET_TRANSACTIONS]: async ({ commit }, transactionsForFilter) => {
      commit(TRANSACTION.mutations.SET_LOADING, true)
      await getTransactions(transactionsForFilter)
        .then(({ data }) => {
          commit(TRANSACTION.mutations.SET_TRANSACTIONS, data)
        })
        .catch((error) => console.error(error))
        .finally(() => commit(TRANSACTION.mutations.SET_LOADING, false))
    }
  },
  mutations: {
    [TRANSACTION.mutations.SET_TRANSACTIONS]: (state, data) => {
      state.transactions = data
    },
    [TRANSACTION.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    }
  }
}
