<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard Keuangan</h1>
        <p class="text-sm text-gray-400 mt-1">
          Selamat datang kembali. Berikut adalah ringkasan keuangan masjid Anda.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-gray-900 hover:bg-gray-800 text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-white/10 shadow-sm text-sm flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>Bulan Ini</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat: Total Saldo -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Total Saldo</p>
          <Wallet class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-28 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">Rp 0</h3>
          <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            Semua akun aktif
          </p>
        </div>
      </div>

      <!-- Stat: Pemasukan Bulan Ini -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Pemasukan</p>
          <TrendingUp class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-24 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">Rp 0</h3>
          <p class="text-sm text-green-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" />
            Bulan ini
          </p>
        </div>
      </div>

      <!-- Stat: Pengeluaran Bulan Ini -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Pengeluaran</p>
          <TrendingDown class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-24 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">Rp 0</h3>
          <p class="text-sm text-red-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingDown class="w-4 h-4" />
            Bulan ini
          </p>
        </div>
      </div>

      <!-- Stat: Selisih -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-400">Selisih</p>
          <Scale class="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <div v-if="isLoading" class="h-8 w-20 bg-white/5 rounded animate-pulse mb-1"></div>
          <h3 v-else class="text-3xl font-bold text-white tracking-tight">Rp 0</h3>
          <p class="text-sm text-secondary mt-2 flex items-center gap-1 font-medium">
            Pemasukan − Pengeluaran
          </p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-white">Tren Pemasukan vs Pengeluaran</h2>
          <button class="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 flex-1">
          <div v-if="isLoading" class="h-[300px] w-full bg-white/5 rounded-lg animate-pulse"></div>
          <div v-else class="h-[300px] w-full flex items-center justify-center">
            <div class="text-center">
              <BarChart3 class="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p class="text-gray-500 text-sm">Data chart akan ditampilkan setelah integrasi API</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Widget -->
      <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm flex flex-col">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-white">Transaksi Terbaru</h2>
        </div>
        <div class="p-2 flex-1">
          <div v-if="isLoading" class="space-y-2 p-4">
            <div v-for="i in 4" :key="i" class="h-14 bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div v-else class="py-14 text-center">
            <Receipt class="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p class="text-gray-500 text-sm">Belum ada transaksi</p>
            <p class="text-gray-600 text-xs mt-1">Data akan muncul setelah integrasi API</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  Calendar, Wallet, TrendingUp, TrendingDown, Scale, 
  MoreHorizontal, BarChart3, Receipt 
} from 'lucide-vue-next'

const isLoading = ref(true)

// Simulate loading state for skeleton effect
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>
