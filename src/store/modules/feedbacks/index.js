// import db from 'app/db'
import tableConfig from './table_config'
import FeedbackService from 'src/services/FeedbackService'
import FEEDBACKS from 'src/store/types/feedbacks'

export default {
  namespaced: true,
  state: () => ({
    feedbacks: [],
    tableConfig,
    loading: false
  }),
  getters: {
    [FEEDBACKS.getters.GET_FEEDBACKS]: (state) => state.feedbacks,
    [FEEDBACKS.getters.GET_FEEDBACKS_TABLE_CONFIG]: (state) => state.tableConfig,
    [FEEDBACKS.getters.GET_LOADING]: state => state.loading
  },
  actions: {
    [FEEDBACKS.actions.GET_FEEDBACKS]: async ({ commit }) => {
      commit(FEEDBACKS.mutations.SET_LOADING, true)
      commit(FEEDBACKS.mutations.SET_FEEDBACKS, [])
      await FeedbackService.getFeedbacks()
        .then(({ data }) => {
          commit(FEEDBACKS.mutations.SET_FEEDBACKS, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(FEEDBACKS.mutations.SET_LOADING, false))
    }
  },
  mutations: {
    [FEEDBACKS.mutations.SET_FEEDBACKS]: (state, feedbacks) => {
      state.feedbacks = feedbacks
    },
    [FEEDBACKS.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    }
  }
}
