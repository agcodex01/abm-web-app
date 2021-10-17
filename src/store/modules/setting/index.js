import { Notify } from 'quasar'
import SettingService from 'src/services/Setting'
import SETTING from 'src/store/types/setting'

export default {
  namespaced: true,
  state: () => ({
    setting: null,
    loading: false
  }),
  getters: {
    [SETTING.getters.GET_SETTING]: state => state.setting,
    [SETTING.getters.GET_LOADING]: state => state.loading
  },
  actions: {
    [SETTING.actions.GET_SETTING]: async ({ commit }) => {
      commit(SETTING.mutations.SET_LOADING, true)
      await SettingService.get()
        .then(({ data }) => {
          commit(SETTING.mutations.SET_SETTING, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(SETTING.mutations.SET_LOADING, false))
    },
    [SETTING.actions.UPDATE_SETTING]: async ({ commit }, data) => {
      commit(SETTING.mutations.SET_LOADING, true)
      await SettingService.update(data)
        .then(({ data }) => {
          Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Successfully updated setting.'
          })
          commit(SETTING.mutations.SET_SETTING, data)
        })
        .catch((errors) => console.error(errors))
        .finally(() => commit(SETTING.mutations.SET_LOADING, false))
    }
  },
  mutations: {
    [SETTING.mutations.SET_SETTING]: (state, setting) => {
      state.setting = setting
    },
    [SETTING.mutations.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading
    }
  }
}
