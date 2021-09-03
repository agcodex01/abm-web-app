import GeneralTypes from 'src/store/types/general'

export default {
  namespaced: true,
  state: () => ({
    loading: false
  }),
  getters: {
    [GeneralTypes.getters.GET_LOADING]: state => state.loading
  },
  mutations: {
    [GeneralTypes.mutations.MUTATION_SET_LOADING]: (state, value) => {
      state.loading = value
    }
  }
}
