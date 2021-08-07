import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './modules/auth'
import dashboard from './modules/dashboard'
import general from './modules/general'
import layout from './modules/layout'
import transactions from './modules/transactions'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({

    // NOTE: Arranged this in alphabetical order for better readablity.
    modules: {
      auth,
      dashboard,
      general,
      layout,
      transactions
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
