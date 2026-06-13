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
        path: 'keuangan-transaksi',
        name: 'admin-keuangan-transaksi',
        component: () => import('@/views/admin/KeuanganTransaksiView.vue')
      },
      {
        path: 'keuangan-bank-kas',
        name: 'admin-keuangan-bank-kas',
        component: () => import('@/views/admin/KeuanganBankKasView.vue')
      },
      {
        path: 'keuangan-laporan',
        name: 'admin-keuangan-laporan',
        component: () => import('@/views/admin/KeuanganLaporanView.vue')
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
        meta: { requiresSystem: true }
      },

      {
        path: 'profil',
        name: 'admin-profil',
        component: () => import('../views/admin/ProfilView.vue'),
      },
      {
        path: 'pengguna',
        name: 'admin-pengguna',
        component: () => import('../views/admin/PenggunaView.vue'),
        meta: { requiresSystem: true }
      },
      {
        path: 'log-aktivitas',
        name: 'admin-log-aktivitas',
        component: () => import('../views/admin/LogAktivitasView.vue'),
        meta: { requiresSystem: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
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
  } else if (to.meta.requiresSystem && !adminStore.hasModuleAccess('sistem')) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
