import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './modules/auth'
import billers from './modules/biller'
import dashboard from './modules/dashboard'
import general from './modules/general'
import layout from './modules/layout'
import units from './modules/units'
import remits from './modules/remits'
import transactions from './modules/transactions'
import collections from './modules/collection'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({

    // NOTE: Arranged this in alphabetical order for better readablity.
    modules: {
      auth,
      billers,
      dashboard,
      general,
      layout,
      remits,
      transactions,
      units,
      collections
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
