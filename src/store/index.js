import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import layout from './modules/layout'
import units from './modules/units'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      layout,
      units
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
