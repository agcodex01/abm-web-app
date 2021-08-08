import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import billers from './modules/biller'
import dashboard from './modules/dashboard'
import layout from './modules/layout'
import transactions from './modules/transactions'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      billers,
      dashboard,
      layout,
      transactions
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
