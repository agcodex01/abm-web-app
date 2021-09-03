import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './modules/auth'
import billers from './modules/biller'
import dashboard from './modules/dashboard'
import general from './modules/general'
import layout from './modules/layout'
import units from './modules/units'
import transactions from './modules/transactions'
import units from './modules/units'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({

    // NOTE: Arranged this in alphabetical order for better readablity.
    modules: {
      auth,
      billers,
      dashboard,
      general,
      layout,
      transactions,
      units
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
