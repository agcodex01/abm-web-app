
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard.vue') },
      { path: 'units', name: 'units', component: () => import('src/pages/units/Units.vue') },
      { path: 'units/create-unit', name: 'createUnit', component: () => import('src/pages/units/CreateUnit.vue') },
      { path: 'units/update-unit/:id', name: 'updateUnit', component: () => import('src/pages/units/UpdateUnit.vue'), params: true }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
