import DashboardService from 'src/services/DashboardService'
import DASHBOARD from 'src/store/types/dashboard'

export default {
  namespaced: true,
  state: () => ({
    dsSummary: [],
    transactionPreview: []
  }),
  getters: {
    getDsSummary: state => state.dsSummary
  },
  actions: {
    [DASHBOARD.actions.GET_DS_SUMMARY]: async ({ commit }) => {
      DashboardService.getDsSummary()
        .then(({ data }) => {
          commit(DASHBOARD.mutations.SET_DS_SUMMARY, data)
        })
        .catch(errors => console.error(errors))
    },
    [DASHBOARD.actions.GET_TRANSACTIONS_PREVIEW]: async (context) => {
      return await DashboardService.getTransactionPreview()
    }
  },
  mutations: {
    INCREMENT_VALUE (state, object) {
      const index = state.dsSummary.findIndex(ds => ds.id === object.id)
      state.dsSummary[index].value += object.value
    },
    [DASHBOARD.mutations.SET_DS_SUMMARY]: (state, dsSummary) => {
      state.dsSummary = dsSummary
    }
  }
}
