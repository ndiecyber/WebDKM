<template>
  <div class="min-h-screen bg-gray-950 flex text-gray-300 font-sans relative selection:bg-secondary/30 selection:text-secondary">
    <ToastContainer />
    <CommandPalette v-model="isCommandPaletteOpen" />
    
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-40 md:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="w-72 bg-gray-900 border-r border-white/5 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 md:relative transform transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-sm ring-1 ring-white/10">
            <LayoutDashboard class="w-4 h-4 text-gray-950" />
          </div>
          <span class="font-heading font-bold text-lg text-white tracking-tight">Admin Panel</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-6 px-4 overflow-y-auto hide-scrollbar space-y-8">
        
        <!-- Group: Utama -->
        <div>
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
              <span>Dashboard</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Manajemen Konten -->
        <div>
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

            <router-link 
              :to="{ name: 'admin-keuangan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-keuangan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Wallet class="w-5 h-5" />
              <span>Laporan Keuangan</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Sistem -->
        <div>
          <div class="px-3 mb-2">
            <p class="text-xs font-semibold text-gray-500 tracking-wider uppercase">Sistem</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-pengaturan' }"
              class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              active-class="bg-white/5 text-secondary"
              :class="$route.name === 'admin-pengaturan' ? 'bg-white/5 text-secondary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'"
            >
              <Settings class="w-5 h-5" />
              <span>Pengaturan Umum</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- User Profile Bottom -->
      <div class="p-4 border-t border-white/5 bg-gray-900 shrink-0">
        <div class="flex items-center justify-between">
          <router-link :to="{ name: 'admin-profil' }" class="flex items-center gap-3 truncate hover:opacity-80 transition-opacity">
            <div class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
              <User class="w-4 h-4 text-gray-400" />
            </div>
            <div class="truncate">
              <p class="text-sm font-medium text-white truncate">Admin Utama</p>
              <p class="text-xs text-gray-500 truncate">admin@masjidkassiti.com</p>
            </div>
          </router-link>
          <button @click="handleLogout" class="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0" title="Keluar">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-950">
      <!-- Topbar -->
      <header class="h-16 bg-gray-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sm:px-8 shrink-0 z-10 sticky top-0">
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = true"
            class="md:hidden p-2 -ml-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu class="w-5 h-5" />
          </button>
          
          <!-- Breadcrumbs -->
          <div class="hidden sm:flex items-center gap-2 text-sm">
            <router-link :to="{ name: 'admin-dashboard' }" class="text-gray-500 hover:text-gray-300 transition-colors">
              <Home class="w-4 h-4" />
            </router-link>
            <ChevronRight class="w-4 h-4 text-gray-600" />
            <span class="font-medium text-gray-200">{{ pageTitle }}</span>
          </div>
          <h2 class="sm:hidden font-heading font-semibold text-lg text-white">
            {{ pageTitle }}
          </h2>
        </div>
        
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Global Search -->
          <div 
            @click="isCommandPaletteOpen = true"
            class="hidden lg:flex items-center px-3 py-1.5 bg-gray-900 border border-white/10 rounded-lg text-gray-400 hover:border-white/20 transition-colors cursor-pointer w-64 group"
          >
            <Search class="w-4 h-4 mr-2 group-hover:text-secondary transition-colors" />
            <span class="text-sm">Global search</span>
            <span class="ml-auto text-xs font-mono bg-white/5 px-1.5 py-0.5 rounded text-gray-500">Ctrl+K</span>
          </div>

          <button 
            @click="isCommandPaletteOpen = true"
            class="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Search class="w-5 h-5" />
          </button>

          <router-link :to="{ name: 'home' }" target="_blank" class="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Lihat Website">
            <Globe class="w-5 h-5" />
          </router-link>
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
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import ToastContainer from '../components/ui/ToastContainer.vue'
import CommandPalette from '../components/admin/CommandPalette.vue'
import { 
  LayoutDashboard, Home, Calendar, LogOut, Menu, User, Globe, Image, Briefcase, Settings, Wallet, ChevronRight, Search 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const isCommandPaletteOpen = ref(false)
const isMobileMenuOpen = ref(false)

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

const pageTitle = computed(() => {
  if (route.name === 'admin-dashboard') return 'Dashboard'
  if (route.name === 'admin-kegiatan') return 'Kegiatan Masjid'
  if (route.name === 'admin-galeri') return 'Galeri Foto'
  if (route.name === 'admin-layanan') return 'Layanan & Fasilitas'
  if (route.name === 'admin-keuangan') return 'Laporan Keuangan'
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
