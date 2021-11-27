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
        meta: {
          roles: ['Admin', 'Manager', 'Collector']
        },
        component: () => import('src/pages/Dashboard.vue')
      },
      {
        path: 'units',
        name: 'units',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/units/Units.vue')
      },
      {
        path: 'units/create',
        name: 'create_unit',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/units/CreateUnit.vue')
      },
      {
        path: 'units/:id/update',
        name: 'update_unit',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/units/UpdateUnit.vue')
      },
      {
        path: '/transactions',
        name: 'transactions',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/transactions/Transactions.vue')
      },
      {
        path: '/remits',
        name: 'remits',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/remits/Remits.vue')
      },
      {
        path: '/remits/:id',
        name: 'view_remit',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/remits/ViewRemit.vue')
      },
      {
        path: '/billers',
        name: 'billers',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/billers/Billers.vue')
      },
      {
        path: '/billers/create',
        name: 'create_biller',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/billers/CreateBiller.vue')
      },
      {
        path: '/billers/:id/update',
        name: 'update_biller',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/billers/UpdateBiller.vue')
      },
      {
        path: 'collections',
        name: 'collections',
        meta: {
          roles: ['Admin', 'Manager', 'Collector']
        },
        component: () => import('src/pages/collections/Collections.vue')
      },
      {
        path: 'collections/create',
        name: 'create_collection',
        meta: {
          roles: ['Admin', 'Manager', 'Collector']
        },
        component: () => import('src/pages/collections/CreateCollection.vue')
      },
      {
        path: 'collections/:id/update',
        name: 'update_collection',
        meta: {
          roles: ['Admin', 'Manager', 'Collection']
        },
        component: () => import('src/pages/collections/UpdateCollection.vue')
      },
      {
        path: 'profile/:id/view',
        name: 'update_profile',
        meta: {
          roles: ['Admin', 'Manager', 'Collection']
        },
        component: () => import('src/pages/Profile.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          roles: ['Admin']
        },
        component: () => import('src/pages/users/Users.vue')
      },
      {
        path: 'users/create',
        name: 'create_user',
        meta: {
          roles: ['Admin']
        },
        component: () => import('src/pages/users/CreateUser.vue')
      },
      {
        path: 'users/:id/update',
        name: 'update_user',
        meta: {
          roles: ['Admin']
        },
        component: () => import('src/pages/users/UpdateUser.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/Settings.vue')
      },
      {
        path: '/feedbacks',
        name: 'feedbacks',
        meta: {
          roles: ['Admin', 'Manager']
        },
        component: () => import('src/pages/Feedbacks.vue')
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
  {
    path: '/errors/access_denied',
    name: 'access_denied',
    component: () => import('pages/errors/AccessDenied.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not_found',
    component: () => import('pages/errors/Error404.vue')
  }
]

export default routes
