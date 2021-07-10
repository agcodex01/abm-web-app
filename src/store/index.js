import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import dashboard from './modules/dashboard'
import layout from './modules/layout'
import transactions from './modules/transactions'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      dashboard,
      layout,
      transactions
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
