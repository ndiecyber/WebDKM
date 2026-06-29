<template>
  <div class="relative space-y-6 sm:space-y-8 animate-fade-in pb-10">
    <!-- Premium Grid Pattern Background -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 32px 32px;"></div>
    
    <div class="relative z-10 space-y-6 sm:space-y-8">
    
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Web</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pantau aktivitas, layanan, dan perkembangan jamaah secara real-time.
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat 1 -->
      <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Berita</p>
            <div class="p-2.5 bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600 dark:text-emerald-400 rounded-xl ring-1 ring-emerald-200 dark:ring-emerald-800/50">
              <Calendar class="w-5 h-5" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 w-16 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
            <h3 v-else class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ totalKegiatan }}</h3>
            <p class="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Di seluruh kategori
            </p>
          </div>
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kunjungan Web</p>
            <div class="p-2.5 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 rounded-xl ring-1 ring-blue-200 dark:ring-blue-800/50">
              <Users class="w-5 h-5" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 w-24 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
            <h3 v-else class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">4,204</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp class="w-4 h-4" />
              +12% dari bulan lalu
            </p>
          </div>
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pengumuman Aktif</p>
            <div class="p-2.5 bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 text-amber-600 dark:text-amber-400 rounded-xl ring-1 ring-amber-200 dark:ring-amber-800/50">
              <MessageSquare class="w-5 h-5" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 w-12 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
            <h3 v-else class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">2</h3>
            <p class="text-sm text-amber-600 dark:text-amber-500 mt-2 flex items-center gap-1.5 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Ditampilkan di beranda
            </p>
          </div>
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Foto Galeri</p>
            <div class="p-2.5 bg-linear-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 text-purple-600 dark:text-purple-400 rounded-xl ring-1 ring-purple-200 dark:ring-purple-800/50">
              <Image class="w-5 h-5" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 w-16 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
            <h3 v-else class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">45</h3>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp class="w-4 h-4" />
              3 foto baru minggu ini
            </p>
          </div>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl shadow-md flex flex-col hover:shadow-xl transition-shadow duration-500">
        <div class="p-6 border-b border-gray-300 dark:border-white/20 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Tren Kunjungan Website</h2>
          <button class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 flex-1">
          <div v-if="isLoading" class="h-[300px] w-full bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse"></div>
          <div v-else class="h-[300px] w-full">
            <!-- Mockup line chart visually using SVG -->
            <svg class="w-full h-full text-orange-500 dark:text-orange-400" viewBox="0 0 400 150" preserveAspectRatio="none">
              <!-- Grid lines -->
              <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.3" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.3" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.3" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.3" />
              
              <!-- Sparkline path -->
              <path d="M0 120 C 20 115, 40 120, 60 110 C 80 100, 100 110, 120 105 C 140 100, 160 80, 180 75 C 200 65, 220 80, 240 70 C 260 55, 280 40, 300 45 C 320 30, 340 35, 360 20 C 380 15, 400 30, 400 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md" />
              
              <!-- Gradient fill under path -->
              <path d="M0 150 L 0 120 C 20 115, 40 120, 60 110 C 80 100, 100 110, 120 105 C 140 100, 160 80, 180 75 C 200 65, 220 80, 240 70 C 260 55, 280 40, 300 45 C 320 30, 340 35, 360 20 C 380 15, 400 30, 400 30 L 400 150 Z" fill="url(#gradient)" opacity="0.3" />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="currentColor" />
                  <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div class="flex justify-between text-xs text-gray-700 dark:text-gray-300 font-semibold mt-2 px-2">
              <span>1 Mei</span>
              <span>5 Mei</span>
              <span>10 Mei</span>
              <span>15 Mei</span>
              <span>20 Mei</span>
              <span>25 Mei</span>
              <span>30 Mei</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Activities Widget -->
      <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-2xl shadow-md flex flex-col hover:shadow-xl transition-shadow duration-500">
        <div class="p-6 border-b border-gray-300 dark:border-white/20 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Berita Terkait</h2>
          <router-link :to="{ name: 'admin-kegiatan' }" class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">
            Lihat Semua
          </router-link>
        </div>
        <div class="p-2 flex-1">
          <div v-if="isLoading" class="space-y-2 p-4">
            <div v-for="i in 3" :key="i" class="h-16 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
          </div>
          <ul v-else class="space-y-1">
            <li v-for="kegiatan in upcomingKegiatan" :key="kegiatan.id" class="p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 group cursor-pointer border border-transparent hover:border-emerald-100 dark:hover:border-emerald-800/30 hover:shadow-md">
              <div class="flex gap-4 items-center">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/50 group-hover:scale-105 transition-all duration-300 shadow-md">
                  <Calendar class="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{{ kegiatan.title }}</h4>
                  <p class="text-xs text-gray-700 dark:text-gray-300 mt-1 flex items-center gap-1.5 font-semibold"><Clock class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" /> {{ kegiatan.day }} {{ kegiatan.month }} • {{ kegiatan.time }}</p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight class="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/admin'
import { 
  Calendar, Users, MessageSquare, Image, 
  TrendingUp, TrendingDown, MoreHorizontal, Clock, ChevronRight
} from 'lucide-vue-next'

const adminStore = useAdminStore()
const isLoading = ref(true)

const totalKegiatan = computed(() => adminStore.kegiatan.length)
const upcomingKegiatan = computed(() => {
  return adminStore.kegiatan.slice(0, 3)
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})
</script>
