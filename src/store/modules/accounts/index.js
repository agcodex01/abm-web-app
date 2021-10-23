import AccountService from 'src/services/AccountService'
import ACCOUNT from 'src/store/types/account'
import billerAccounTableHeader from './biller_account_table_config'

export default {
  namespaced: true,
  state: () => ({
    accounts: [],
    billerAccounTableHeader
  }),
  getters: {
    [ACCOUNT.getters.GET_ACCOUNTS]: state => state.accounts,
    [ACCOUNT.getters.GET_BILLER_ACCOUNT_TABLE_HEADER]: state => state.billerAccounTableHeader
  },
  actions: {
    [ACCOUNT.actions.GET_ACCOUNTS]: async ({ commit }, billerId) => {
      commit(ACCOUNT.mutations.SET_ACCOUNTS, [])
      await AccountService.getAccountsByBillerId(billerId)
        .then(({ data }) => {
          commit(ACCOUNT.mutations.SET_ACCOUNTS, data)
        })
        .catch(errors => console.error(errors))
    }
  },
  mutations: {
    [ACCOUNT.mutations.SET_ACCOUNTS]: (state, accounts) => {
      state.accounts = accounts
    }
  }
}
