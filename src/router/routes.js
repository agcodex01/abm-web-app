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
        path: 'units/create-unit',
        name: 'createUnit',
        component: () => import('src/pages/units/CreateUnit.vue')
      },
      {
        path: 'units/update-unit/:id',
        name: 'updateUnit',
        component: () => import('src/pages/units/UpdateUnit.vue'),
        params: true
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
