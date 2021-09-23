import auth from './middleware/auth'
import redirectIfAuthenticated from './middleware/guest'
const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth]
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/Dashboard.vue')
      },
      {
        path: 'units',
        name: 'units',
        component: () => import('src/pages/units/Units.vue')
      },
      {
        path: 'units/create',
        name: 'create_unit',
        component: () => import('src/pages/units/CreateUnit.vue')
      },
      {
        path: 'units/:id/update',
        name: 'update_unit',
        component: () => import('src/pages/units/UpdateUnit.vue')
      },
      {
        path: '/transactions',
        component: () => import('src/pages/transactions/Transactions.vue')
      },
      {
        path: '/remits',
        name: 'remits',
        component: () => import('src/pages/remits/Remits.vue')
      },
      {
        path: '/remits/:id',
        name: 'view_remit',
        component: () => import('src/pages/remits/ViewRemit.vue')
      },
      {
        path: '/billers',
        name: 'billers',
        component: () => import('src/pages/billers/Billers.vue')
      },
      {
        path: '/billers/create',
        name: 'create_biller',
        component: () => import('src/pages/billers/CreateBiller.vue')
      },
      {
        path: '/billers/:id/update',
        name: 'update_biller',
        component: () => import('src/pages/billers/UpdateBiller.vue')
      },
      {
        path: 'collections',
        name: 'collections',
        component: () => import('src/pages/collections/Collections.vue')
      },
      {
        path: 'collections/create',
        name: 'create_collection',
        component: () => import('src/pages/collections/CreateCollection.vue')
      },
      {
        path: 'collections/:id/update',
        name: 'update_collection',
        component: () => import('src/pages/collections/UpdateCollection.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/users/Users.vue')
      },
      {
        path: 'users/create',
        name: 'create_user',
        component: () => import('src/pages/users/CreateUser.vue')
      },
      {
        path: 'users/:id/update',
        name: 'update_user',
        component: () => import('src/pages/users/UpdateUser.vue')
      }
    ]
  },
  {
    path: '/auth/login',
    name: 'login',
    meta: {
      middleware: [redirectIfAuthenticated]
    },
    component: () => import('src/pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
