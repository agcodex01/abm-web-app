import Types from '../../types'

export default {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  getters: {
    [Types.GeneralTypes.getters.GET_LOADING]: state => state.loading
  },
  mutations: {
    [Types.GeneralTypes.mutations.MUTATION_SET_LOADING]: (state, value) => {
      state.loading = value
    }
  }
}
