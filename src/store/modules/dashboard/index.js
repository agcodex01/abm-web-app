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
      const index = state.dsSummary.findIndex(ds => ds.id === object.id)
      state.dsSummary[index].value += object.value
    }
  }
}
