import db from 'app/db'
import { getBillerTypes, BILLER_TYPE } from 'src/store/types/billers'

export default {
  namespaced: true,
  state: () => ({
    billers: [],
    biller: null,
    selectedBillerType: BILLER_TYPE.ALL
  }),
  getters: {
    GET_BILLERS: state => state.billers,
    GET_SELECTED_BILLER_TYPE: state => state.selectedBillerType,
    GET_SELECTED_BILLER: state => state.biller?.name ?? '',
    GET_BILLER: state => state.biller,
    GET_BILLER_TYPES: state => getBillerTypes()
  },
  mutations: {
    SET_BILLERS: (state, billers) => {
      state.billers = billers
    },
    SET_BILLER: (state, biller) => {
      state.biller = biller
    },
    SET_SELECTED_BILLER_TYPE: (state, type) => {
      state.selectedBillerType = type
    }
  },
  actions: {
    GET_BILLERS: ({ commit }) => {
      commit('SET_BILLERS', db.billers())
    }
  }
}
