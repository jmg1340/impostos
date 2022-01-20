
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/facturacio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/facturacio.vue') }
    ]
  },
  {
    path: '/despesesIVA',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/despesesIVA.vue') }
    ]
  },

  {
    path: '/iva',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/iva.vue') }
    ]
  },

  {
    path: '/irpf',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/irpf.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
