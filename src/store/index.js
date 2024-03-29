import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import accounts from './modules/accounts'
import auth from './modules/auth'
import billers from './modules/biller'
import dashboard from './modules/dashboard'
import feedbacks from './modules/feedbacks'
import general from './modules/general'
import layout from './modules/layout'
import units from './modules/units'
import remits from './modules/remits'
import settings from './modules/setting'
import transactions from './modules/transactions'
import collections from './modules/collection'
import users from './modules/users'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({

    // NOTE: Arranged this in alphabetical order for better readablity.
    modules: {
      accounts,
      auth,
      billers,
      collections,
      dashboard,
      feedbacks,
      general,
      layout,
      remits,
      settings,
      transactions,
      units,
      users
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
