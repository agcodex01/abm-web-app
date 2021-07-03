import links from './links'

export default {
  namespaced: true,
  state: () => ({
    header: null,
    links: links
  }),
  getters: {
    getHeader: state => state.header,
    getLinks: state => state.links
  },
  actions: {},
  mutations: {
    SET_HEADER (state, header) {
      state.header = header
    }
  }
}
