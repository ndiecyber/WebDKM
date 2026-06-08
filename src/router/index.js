import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAdminStore } from '../stores/admin'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../views/admin/DashboardView.vue'),
      },
      {
        path: 'keuangan',
        name: 'admin-keuangan-dashboard',
        component: () => import('@/views/admin/KeuanganDashboardView.vue')
      },
      {
        path: 'keuangan-pengaturan',
        name: 'admin-keuangan-pengaturan',
        component: () => import('@/views/admin/KeuanganPengaturanView.vue')
      },
      {
        path: 'kegiatan',
        name: 'admin-kegiatan',
        component: () => import('../views/admin/KegiatanView.vue'),
      },
      {
        path: 'galeri',
        name: 'admin-galeri',
        component: () => import('../views/admin/GaleriView.vue'),
      },
      {
        path: 'layanan',
        name: 'admin-layanan',
        component: () => import('../views/admin/LayananView.vue'),
      },
      {
        path: 'pengaturan',
        name: 'admin-pengaturan',
        component: () => import('../views/admin/PengaturanView.vue'),
      },
      {
        path: 'keuangan',
        name: 'admin-keuangan',
        component: () => import('../views/admin/KeuanganView.vue'),
      },
      {
        path: 'profil',
        name: 'admin-profil',
        component: () => import('../views/admin/ProfilView.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore()
  
  if (to.meta.requiresAuth && !adminStore.isAuthenticated) {
    next({ name: 'admin-login' })
  } else if (to.meta.guestOnly && adminStore.isAuthenticated) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
