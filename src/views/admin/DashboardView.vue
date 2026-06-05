<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Welcome Header (Filament Style) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard Ringkasan</h1>
        <p class="text-sm text-gray-400 mt-1">
          Selamat datang kembali. Berikut adalah ringkasan performa website Anda hari ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-gray-900 hover:bg-gray-800 text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-white/10 shadow-sm text-sm flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>Bulan Ini</span>
        </button>
        <button class="bg-secondary hover:bg-yellow-500 text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm">
          Unduh Laporan
        </button>
      </div>
    </div>

    <!-- Stats Grid (Filament Widget Style) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat 1 -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Total Kegiatan</p>
          <Calendar class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-16 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">{{ totalKegiatan }}</h3>
          <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            Di seluruh kategori
          </p>
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Kunjungan Web</p>
          <Users class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-24 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">4,204</h3>
          <p class="text-sm text-green-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" />
            +12% dari bulan lalu
          </p>
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Pengumuman Aktif</p>
          <MessageSquare class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-12 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">2</h3>
          <p class="text-sm text-secondary mt-2 flex items-center gap-1 font-medium">
            Ditampilkan di beranda
          </p>
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Foto Galeri</p>
          <Image class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-16 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">45</h3>
          <p class="text-sm text-green-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" />
            3 foto baru minggu ini
          </p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-white">Tren Kunjungan Website</h2>
          <button class="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 flex-1">
          <div v-if="isLoading" class="h-[300px] w-full bg-white/5 rounded-lg animate-pulse"></div>
          <div v-else class="h-[300px] w-full">
            <apexchart type="area" height="100%" :options="chartOptions" :series="chartSeries"></apexchart>
          </div>
        </div>
      </div>

      <!-- List Widget -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-white">Kegiatan Mendatang</h2>
          <router-link :to="{ name: 'admin-kegiatan' }" class="text-sm text-secondary hover:text-yellow-400 font-medium transition-colors">
            Lihat Semua
          </router-link>
        </div>
        <div class="p-2 flex-1">
          <div v-if="isLoading" class="space-y-2 p-4">
            <div v-for="i in 3" :key="i" class="h-14 bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div v-else class="divide-y divide-white/5">
            <div v-for="kegiatan in recentKegiatan" :key="kegiatan.id" class="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors rounded-lg mx-2 my-1">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-lg bg-gray-800 ring-1 ring-white/10 flex items-center justify-center shrink-0">
                  <Calendar class="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h4 class="text-sm font-medium text-white line-clamp-1">{{ kegiatan.title }}</h4>
                  <p class="text-xs text-gray-500 mt-0.5">{{ kegiatan.date }}</p>
                </div>
              </div>
            </div>
            <div v-if="recentKegiatan.length === 0" class="p-8 text-center text-gray-500 text-sm">
              Belum ada kegiatan terdaftar.
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useAdminStore } from '../../stores/admin'
import { Calendar, Users, MessageSquare, Image, TrendingUp, MoreHorizontal } from 'lucide-vue-next'

const adminStore = useAdminStore()
const isLoading = ref(true)

// Simulate network request for skeleton loading effect
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})

const totalKegiatan = computed(() => adminStore.kegiatan.length)
const recentKegiatan = computed(() => adminStore.kegiatan.slice(0, 4))

// ApexCharts Configuration - Filament Style
const chartSeries = ref([{
  name: 'Kunjungan Harian',
  data: [120, 132, 115, 145, 160, 210, 290, 250, 310, 400, 380, 420, 480, 510, 460]
}])

const chartOptions = ref({
  chart: {
    type: 'area',
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: 'Inter, sans-serif',
    parentHeightOffset: 0,
  },
  colors: ['#D4AF37'], // Secondary color
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.2,
      opacityTo: 0.0,
      stops: [0, 100]
    }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: {
    categories: ['1 Mei', '3 Mei', '5 Mei', '7 Mei', '9 Mei', '11 Mei', '13 Mei', '15 Mei', '17 Mei', '19 Mei', '21 Mei', '23 Mei', '25 Mei', '27 Mei', '29 Mei'],
    labels: { style: { colors: '#9ca3af', fontSize: '11px', fontFamily: 'Inter' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false }
  },
  yaxis: {
    labels: { style: { colors: '#9ca3af', fontSize: '11px', fontFamily: 'Inter' } }
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    strokeDashArray: 3,
    yaxis: { lines: { show: true } },
    xaxis: { lines: { show: false } },
    padding: { top: 0, right: 0, bottom: 0, left: 10 }
  },
  theme: { mode: 'dark' },
  tooltip: {
    theme: 'dark',
    y: { formatter: (val) => `${val} pengunjung` },
    style: { fontSize: '12px', fontFamily: 'Inter' },
    marker: { show: false }
  }
})
</script>
