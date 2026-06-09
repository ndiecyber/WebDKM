<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Keuangan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ringkasan performa finansial Masjid Jami Kassiti bulan ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2">
          <Calendar class="w-4 h-4" />
          <span>Oktober 2023</span>
          <ChevronDown class="w-4 h-4 ml-1" />
        </button>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Download class="w-4 h-4" />
          <span class="hidden sm:inline">Unduh Laporan</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat: Total Saldo -->
      <div class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white group">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Landmark class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-emerald-100">Total Saldo Tersedia</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold tracking-tight">Rp 51.250.000</h3>
            <p class="text-xs text-emerald-200 mt-2 flex items-center gap-1 font-medium bg-white/10 w-max px-2 py-1 rounded backdrop-blur-sm">
              <CheckCircle class="w-3 h-3" />
              Tervalidasi & Sinkron
            </p>
          </div>
        </div>
      </div>

      <!-- Stat: Pemasukan -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pemasukan</p>
          <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
            <TrendingUp class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 15.400.000</h3>
          <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight class="w-4 h-4" />
            +12% dari bulan lalu
          </p>
        </div>
      </div>

      <!-- Stat: Pengeluaran -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
          <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
            <TrendingDown class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 4.250.000</h3>
          <p class="text-sm text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowDownRight class="w-4 h-4" />
            -5% dari bulan lalu
          </p>
        </div>
      </div>

      <!-- Stat: Selisih -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Surplus Bulan Ini</p>
          <div class="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
            <Scale class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 11.150.000</h3>
          <p class="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1 font-medium">
            Surplus Positif
          </p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Arus Kas Bulanan</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pemasukan & Pengeluaran 6 bulan terakhir</p>
          </div>
          <button class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="p-6 flex-1">
          <!-- Mockup Chart Area -->
          <div class="h-[280px] w-full flex items-end gap-2 sm:gap-6 pt-10">
            <!-- Bars (Mockup) -->
            <div v-for="month in ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt']" :key="month" class="flex-1 flex flex-col justify-end items-center gap-2 group cursor-pointer">
              <div class="w-full flex justify-center gap-1.5 items-end h-[200px] relative">
                <!-- Tooltip (hidden normally) -->
                <div class="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                  {{ month }}<br>Masuk: 15Jt<br>Keluar: 4Jt
                </div>
                <!-- Pemasukan Bar -->
                <div class="w-1/2 bg-emerald-400 dark:bg-emerald-500 rounded-t-sm transition-all duration-500 group-hover:brightness-110" :style="{ height: Math.floor(Math.random() * 60 + 40) + '%' }"></div>
                <!-- Pengeluaran Bar -->
                <div class="w-1/2 bg-rose-400 dark:bg-rose-500 rounded-t-sm transition-all duration-500 group-hover:brightness-110" :style="{ height: Math.floor(Math.random() * 30 + 10) + '%' }"></div>
              </div>
              <span class="text-xs font-medium text-gray-500">{{ month }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Widget -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h2>
          <button class="text-xs font-medium text-secondary hover:text-yellow-600 transition-colors">Lihat Semua</button>
        </div>
        <div class="p-2 flex-1">
          <ul class="divide-y divide-gray-100 dark:divide-white/5">
            <li v-for="tx in recentTransactions" :key="tx.id" class="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-xl transition-colors flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 ring-1',
                  tx.type === 'in' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20'
                ]">
                  <ArrowDownLeft v-if="tx.type === 'in'" class="w-5 h-5" />
                  <ArrowUpRight v-else class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ tx.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ tx.date }} • {{ tx.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p :class="[
                  'text-sm font-bold',
                  tx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                ]">
                  {{ tx.type === 'in' ? '+' : '-' }}Rp {{ tx.amount }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { 
  Calendar, Wallet, TrendingUp, TrendingDown, Scale, 
  MoreHorizontal, Download, ChevronDown, Landmark, CheckCircle,
  ArrowUpRight, ArrowDownRight, ArrowDownLeft
} from 'lucide-vue-next'

const recentTransactions = [
  { id: 1, title: 'Infaq Jumat', category: 'Kotak Amal', date: '10 Okt', amount: '3.250.000', type: 'in' },
  { id: 2, title: 'Donasi Hamba Allah', category: 'Transfer BSI', date: '08 Okt', amount: '1.000.000', type: 'in' },
  { id: 3, title: 'Bayar Listrik & Air', category: 'Operasional', date: '05 Okt', amount: '850.000', type: 'out' },
  { id: 4, title: 'Honor Penceramah', category: 'Dakwah', date: '04 Okt', amount: '500.000', type: 'out' },
  { id: 5, title: 'Infaq Jumat', category: 'Kotak Amal', date: '03 Okt', amount: '2.800.000', type: 'in' },
]
</script>
