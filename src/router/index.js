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
      
      // --- MODUL KEUANGAN ---
      {
        path: 'keuangan',
        name: 'admin-keuangan-dashboard',
        component: () => import('@/views/admin/KeuanganDashboardView.vue')
      },
      {
        path: 'keuangan-program',
        name: 'admin-keuangan-program',
        component: () => import('@/views/admin/KeuanganProgramView.vue')
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
        path: 'keuangan-pengaturan',
        name: 'admin-keuangan-pengaturan',
        component: () => import('@/views/admin/KeuanganPengaturanView.vue')
      },

      // --- MODUL QURBAN ---
      {
        path: 'qurban',
        name: 'admin-qurban-dashboard',
        component: () => import('@/views/admin/QurbanDashboardView.vue')
      },
      {
        path: 'qurban/target',
        name: 'admin-qurban-target',
        component: () => import('@/views/admin/QurbanTargetView.vue')
      },
      {
        path: 'qurban/peserta',
        name: 'admin-qurban-peserta',
        component: () => import('@/views/admin/QurbanPesertaView.vue')
      },
      {
        path: 'qurban/setoran',
        name: 'admin-qurban-setoran',
        component: () => import('@/views/admin/QurbanSetoranView.vue')
      },
      {
        path: 'qurban/periode',
        name: 'admin-qurban-periode',
        component: () => import('@/views/admin/QurbanPeriodeView.vue')
      },
      {
        path: 'qurban/pengaturan',
        name: 'admin-qurban-pengaturan',
        component: () => import('@/views/admin/QurbanPengaturanView.vue')
      },

      // --- MODUL WEB DKM & SISTEM ---
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
    return { top: 0 } // Dibuat instant agar perpindahan page terasa cepat
  },
})

// Simple progress bar
const startProgress = () => {
  if (document.getElementById('route-progress')) return
  const progress = document.createElement('div')
  progress.id = 'route-progress'
  progress.style.position = 'fixed'
  progress.style.top = '0'
  progress.style.left = '0'
  progress.style.height = '3px'
  progress.style.background = '#10b981' // emerald-500
  progress.style.zIndex = '99999'
  progress.style.transition = 'width 0.4s ease, opacity 0.3s ease'
  progress.style.width = '15%'
  progress.style.boxShadow = '0 0 10px #10b981, 0 0 5px #10b981'
  document.body.appendChild(progress)
  
  // Fake progress
  setTimeout(() => {
    const el = document.getElementById('route-progress')
    if (el) el.style.width = '70%'
  }, 50)
}

const stopProgress = () => {
  const el = document.getElementById('route-progress')
  if (el) {
    el.style.width = '100%'
    setTimeout(() => {
      el.style.opacity = '0'
      setTimeout(() => el.remove(), 300)
    }, 200)
  }
}

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    startProgress()
  }

  const adminStore = useAdminStore()
  
  if (to.meta.requiresAuth && !adminStore.isAuthenticated) {
    next({ name: 'admin-login' })
  } else if (to.meta.guestOnly && adminStore.isAuthenticated) {
    next({ name: adminStore.defaultRouteName })
  } else if (to.meta.requiresSystem && !adminStore.hasModuleAccess('sistem')) {
    next({ name: adminStore.defaultRouteName })
  } else {
    next()
  }
})

router.afterEach(() => {
  stopProgress()
})

export default router