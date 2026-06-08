<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Ringkasan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Selamat datang kembali. Berikut adalah ringkasan performa website Anda hari ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-200 dark:ring-white/10 shadow-sm text-sm flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>Bulan Ini</span>
        </button>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm">
          Unduh Laporan
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat 1 -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Kegiatan</p>
          <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Calendar class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-16 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{{ totalKegiatan }}</h3>
          <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Di seluruh kategori
          </p>
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Kunjungan Web</p>
          <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Users class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-24 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">4,204</h3>
          <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" />
            +12% dari bulan lalu
          </p>
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pengumuman Aktif</p>
          <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <MessageSquare class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-12 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">2</h3>
          <p class="text-sm text-secondary mt-2 flex items-center gap-1 font-medium">
            Ditampilkan di beranda
          </p>
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Foto Galeri</p>
          <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Image class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-16 bg-gray-100 dark:bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">45</h3>
          <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" />
            3 foto baru minggu ini
          </p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Tren Kunjungan Website</h2>
          <button class="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 flex-1">
          <div v-if="isLoading" class="h-[300px] w-full bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse"></div>
          <div v-else class="h-[300px] w-full">
            <!-- Mockup line chart visually using SVG -->
            <svg class="w-full h-full text-secondary" viewBox="0 0 400 150" preserveAspectRatio="none">
              <!-- Grid lines -->
              <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1" />
              
              <!-- Sparkline path -->
              <path d="M0 120 C 20 115, 40 120, 60 110 C 80 100, 100 110, 120 105 C 140 100, 160 80, 180 75 C 200 65, 220 80, 240 70 C 260 55, 280 40, 300 45 C 320 30, 340 35, 360 20 C 380 15, 400 30, 400 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-sm" />
              
              <!-- Gradient fill under path -->
              <path d="M0 150 L 0 120 C 20 115, 40 120, 60 110 C 80 100, 100 110, 120 105 C 140 100, 160 80, 180 75 C 200 65, 220 80, 240 70 C 260 55, 280 40, 300 45 C 320 30, 340 35, 360 20 C 380 15, 400 30, 400 30 L 400 150 Z" fill="url(#gradient)" opacity="0.1" />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="currentColor" />
                  <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div class="flex justify-between text-[10px] text-gray-500 mt-2 px-2">
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
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Kegiatan Mendatang</h2>
          <router-link :to="{ name: 'admin-kegiatan' }" class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">
            Lihat Semua
          </router-link>
        </div>
        <div class="p-2 flex-1">
          <div v-if="isLoading" class="space-y-2 p-4">
            <div v-for="i in 3" :key="i" class="h-16 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
          </div>
          <ul v-else class="divide-y divide-gray-100 dark:divide-white/5">
            <li v-for="kegiatan in upcomingKegiatan" :key="kegiatan.id" class="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-xl transition-colors">
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/5">
                  <Calendar class="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ kegiatan.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1">{{ kegiatan.date }}</p>
                </div>
              </div>
            </li>
          </ul>
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
  TrendingUp, TrendingDown, MoreHorizontal 
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
