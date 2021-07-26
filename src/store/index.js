import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import dashboard from './modules/dashboard'
import layout from './modules/layout'
import units from './modules/units'
import transactions from './modules/transactions'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      units,
      dashboard,
      layout,
      transactions
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
