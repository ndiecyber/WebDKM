<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex text-gray-600 dark:text-gray-300 font-sans relative selection:bg-secondary/30 selection:text-secondary transition-colors duration-300">
    <ToastContainer />
    
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-40 md:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-white/5 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 md:relative transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/5 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <LayoutDashboard class="w-4 h-4 text-white dark:text-gray-950" />
          </div>
          <span class="font-heading font-bold text-lg text-gray-900 dark:text-white tracking-tight">Admin Panel</span>
        </div>
      </div>

      <!-- Module Switcher -->
      <div class="px-4 py-4 border-b border-gray-200 dark:border-white/5 shrink-0">
        <div class="bg-gray-100 dark:bg-gray-950 p-1 rounded-lg flex items-center ring-1 ring-gray-200 dark:ring-white/10">
          <button 
            @click="switchModule('web')" 
            :class="activeModule === 'web' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'" 
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex justify-center items-center gap-1.5"
          >
            Web DKM
          </button>
          <button 
            @click="switchModule('keuangan')" 
            :class="activeModule === 'keuangan' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'" 
            class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex justify-center items-center gap-1.5"
          >
            Keuangan DKM
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-6 px-4 overflow-y-auto hide-scrollbar space-y-8">
        
        <!-- Group: Utama (Web DKM) -->
        <div v-show="activeModule === 'web'">
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Utama</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-dashboard' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-dashboard' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Home class="w-5 h-5" />
              <span>Dashboard Web</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Utama (Keuangan DKM) -->
        <div v-show="activeModule === 'keuangan'">
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Utama</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-keuangan-dashboard' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan-dashboard' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Wallet class="w-5 h-5" />
              <span>Dashboard Keuangan</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Manajemen Konten (Web DKM) -->
        <div v-show="activeModule === 'web'">
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Manajemen Konten</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-kegiatan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-kegiatan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Calendar class="w-5 h-5" />
              <span>Kegiatan Masjid</span>
            </router-link>

            <router-link 
              :to="{ name: 'admin-galeri' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-galeri' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Image class="w-5 h-5" />
              <span>Galeri Foto</span>
            </router-link>

            <router-link 
              :to="{ name: 'admin-layanan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-layanan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Briefcase class="w-5 h-5" />
              <span>Layanan & Fasilitas</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Transaksi (Keuangan DKM) -->
        <div v-show="activeModule === 'keuangan'">
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Keuangan</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-keuangan-transaksi' }"
              class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan-transaksi' ? 'bg-gray-100 dark:bg-white/5 text-secondary' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'"
            >
              <div class="flex items-center gap-3">
                <ArrowLeftRight class="w-5 h-5" />
                <span>Transaksi</span>
              </div>
            </router-link>
            <router-link 
              :to="{ name: 'admin-keuangan-bank-kas' }"
              class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan-bank-kas' ? 'bg-gray-100 dark:bg-white/5 text-secondary' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'"
            >
              <div class="flex items-center gap-3">
                <Landmark class="w-5 h-5" />
                <span>Bank & Kas</span>
              </div>
            </router-link>
            <router-link 
              :to="{ name: 'admin-keuangan-laporan' }"
              class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan-laporan' ? 'bg-gray-100 dark:bg-white/5 text-secondary' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'"
            >
              <div class="flex items-center gap-3">
                <FileBarChart class="w-5 h-5" />
                <span>Laporan</span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Group: Sistem -->
        <div>
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Sistem</p>
          </div>
          <div class="space-y-1">
            <!-- Pengaturan Umum Web DKM -->
            <router-link 
              v-show="activeModule === 'web'"
              :to="{ name: 'admin-pengaturan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-pengaturan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Settings class="w-5 h-5" />
              <span>Pengaturan Umum</span>
            </router-link>

            <!-- Pengaturan Umum Keuangan DKM -->
            <router-link 
              v-show="activeModule === 'keuangan'"
              :to="{ name: 'admin-keuangan-pengaturan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan-pengaturan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Settings class="w-5 h-5" />
              <span>Pengaturan Umum</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- User Profile Bottom -->
      <div class="p-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-900 shrink-0">
        <div class="flex items-center justify-between">
          <router-link :to="{ name: 'admin-profil' }" class="flex items-center gap-3 truncate hover:opacity-80 transition-opacity">
            <div class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ring-1 ring-gray-200 dark:ring-white/10 shrink-0">
              <User class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div class="truncate">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Admin Utama</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">admin@masjidkassiti.com</p>
            </div>
          </router-link>
          <button @click="handleLogout" class="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0" title="Keluar">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <!-- Topbar -->
      <header class="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300">
        <div class="flex items-center gap-4">
          <button @click="isMobileMenuOpen = true" class="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <Menu class="w-6 h-6" />
          </button>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ pageTitle }}</h2>
        </div>

        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Ubah Tema">
            <Sun v-if="isDarkMode" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <router-link :to="{ name: 'home' }" target="_blank" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors" title="Lihat Website">
            <Globe class="w-5 h-5" />
          </router-link>

          <div class="w-px h-6 bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-medium text-gray-900 dark:text-white">Admin Utama</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <div class="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center ring-1 ring-secondary/30">
              <User class="w-5 h-5 text-secondary" />
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        <div class="max-w-7xl mx-auto">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import ToastContainer from '../components/ui/ToastContainer.vue'
import { 
  LayoutDashboard, Home, Calendar, LogOut, Menu, User, Globe, Image, Briefcase, Settings, Wallet, ChevronRight, ArrowLeftRight, Landmark, FileBarChart, Sun, Moon
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const isMobileMenuOpen = ref(false)
const activeModule = ref('web')
const isDarkMode = ref(true)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true
    }
  }

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  if (route.name?.startsWith('admin-keuangan')) {
    activeModule.value = 'keuangan'
  }
})

const switchModule = (module) => {
  activeModule.value = module
  if (module === 'web') {
    router.push({ name: 'admin-dashboard' })
  } else if (module === 'keuangan') {
    router.push({ name: 'admin-keuangan-dashboard' })
  }
}

watch(() => route.name, (newName) => {
  isMobileMenuOpen.value = false
  if (newName?.startsWith('admin-keuangan')) {
    activeModule.value = 'keuangan'
  } else if (newName?.startsWith('admin-')) {
    activeModule.value = 'web'
  }
})

const pageTitle = computed(() => {
  if (route.name === 'admin-keuangan-dashboard') return 'Dashboard Keuangan'
  if (route.name === 'admin-keuangan-transaksi') return 'Transaksi Keuangan'
  if (route.name === 'admin-keuangan-bank-kas') return 'Bank & Kas'
  if (route.name === 'admin-keuangan-laporan') return 'Laporan Keuangan'
  if (route.name === 'admin-keuangan-pengaturan') return 'Pengaturan Keuangan'
  if (route.name === 'admin-dashboard') return 'Dashboard Web'
  if (route.name === 'admin-kegiatan') return 'Kegiatan Masjid'
  if (route.name === 'admin-galeri') return 'Galeri Foto'
  if (route.name === 'admin-layanan') return 'Layanan & Fasilitas'
  if (route.name === 'admin-pengaturan') return 'Pengaturan Umum'
  return 'Admin Panel'
})

function handleLogout() {
  adminStore.logout()
  router.push({ name: 'admin-login' })
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
