import dsSummary from './ds_summary'

export default {
  namespaced: true,
  state: () => ({
    dsSummary: dsSummary
  }),
  getters: {
    getDsSummary: state => state.dsSummary
  },
  actions: {},
  mutations: {
    INCREMENT_VALUE (state, object) {
      state.dsSummary
        .find(summary => summary.id === object.id)
        .value += object.value
    }
  }
}
