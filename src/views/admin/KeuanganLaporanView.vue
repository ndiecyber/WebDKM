<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Laporan & Analitik</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Visualisasi data keuangan dan laporan terperinci.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-lg flex p-1">
          <button class="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all">Tahun Ini</button>
          <button class="px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all">Bulan Ini</button>
        </div>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Download class="w-4 h-4" />
          <span>Unduh PDF</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Chart (Arus Kas) -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-6 shadow-md">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Arus Kas (Cash Flow)</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pemasukan vs Pengeluaran per bulan</p>
          </div>
          <button class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="h-80 w-full mt-4">
          <VueApexCharts type="bar" height="100%" :options="cashFlowOptions" :series="cashFlowSeries" />
        </div>
      </div>

      <!-- Donut Chart (Distribusi Pengeluaran) -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-6 shadow-md flex flex-col">
        <div class="mb-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Distribusi Pengeluaran</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Berdasarkan kategori tahun ini</p>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center relative mt-4">
          <div class="w-full h-64">
            <VueApexCharts type="donut" height="100%" :options="distributionOptions" :series="distributionSeries" />
          </div>

          <!-- Legend -->
          <div class="w-full space-y-3 mt-auto pt-4">
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                <span class="text-gray-600 dark:text-gray-300">Operasional</span>
              </div>
              <span class="font-medium text-gray-900 dark:text-white">45%</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span class="text-gray-600 dark:text-gray-300">Pembangunan</span>
              </div>
              <span class="font-medium text-gray-900 dark:text-white">35%</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                <span class="text-gray-600 dark:text-gray-300">Dakwah & Sosial</span>
              </div>
              <span class="font-medium text-gray-900 dark:text-white">20%</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Summary Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-emerald-500/10 dark:bg-emerald-500/5 ring-1 ring-emerald-500/20 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium text-emerald-800 dark:text-emerald-400">Total Pemasukan</h3>
          <div class="p-2 bg-emerald-500/20 rounded-lg"><TrendingUp class="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
        </div>
        <p class="text-2xl font-bold text-emerald-900 dark:text-emerald-300">Rp 125.500.000</p>
        <p class="text-sm text-emerald-700 dark:text-emerald-500 mt-2 flex items-center gap-1">
          <ArrowUpRight class="w-3 h-3" />
          <span>+12.5% dari tahun lalu</span>
        </p>
      </div>

      <div class="bg-rose-500/10 dark:bg-rose-500/5 ring-1 ring-rose-500/20 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium text-rose-800 dark:text-rose-400">Total Pengeluaran</h3>
          <div class="p-2 bg-rose-500/20 rounded-lg"><TrendingDown class="w-4 h-4 text-rose-600 dark:text-rose-400" /></div>
        </div>
        <p class="text-2xl font-bold text-rose-900 dark:text-rose-300">Rp 24.350.000</p>
        <p class="text-sm text-rose-700 dark:text-rose-500 mt-2 flex items-center gap-1">
          <ArrowDownLeft class="w-3 h-3" />
          <span>-5.2% dari tahun lalu</span>
        </p>
      </div>

      <div class="bg-blue-500/10 dark:bg-blue-500/5 ring-1 ring-blue-500/20 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium text-blue-800 dark:text-blue-400">Surplus/Defisit</h3>
          <div class="p-2 bg-blue-500/20 rounded-lg"><Scale class="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
        </div>
        <p class="text-2xl font-bold text-blue-900 dark:text-blue-300">Rp 101.150.000</p>
        <p class="text-sm text-blue-700 dark:text-blue-500 mt-2">
          Saldo akhir tahun berjalan
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download, MoreHorizontal, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Scale } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'

// Cash Flow Chart Mockup Data
const cashFlowSeries = ref([
  { name: 'Pemasukan', data: [15, 20, 18, 25, 22, 30] },
  { name: 'Pengeluaran', data: [5, 4, 8, 5, 6, 4] }
])

const cashFlowOptions = ref({
  chart: { 
    type: 'bar', 
    toolbar: { show: false }, 
    background: 'transparent',
    fontFamily: 'inherit'
  },
  plotOptions: { 
    bar: { borderRadius: 4, columnWidth: '50%' } 
  },
  colors: ['#10b981', '#f43f5e'], // Emerald 500, Rose 500
  dataLabels: { enabled: false },
  stroke: { show: true, width: 4, colors: ['transparent'] },
  xaxis: {
    categories: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#9ca3af' } }
  },
  yaxis: {
    labels: { 
      style: { colors: '#9ca3af' }, 
      formatter: (value) => `Rp ${value}M` 
    }
  },
  grid: { 
    borderColor: 'rgba(156, 163, 175, 0.1)', 
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  legend: { show: false },
  tooltip: {
    theme: 'dark',
    y: { formatter: (val) => `Rp ${val}.000.000` }
  }
})

// Distribution Donut Chart Mockup Data
const distributionSeries = ref([45, 35, 20])

const distributionOptions = ref({
  chart: { 
    type: 'donut', 
    background: 'transparent',
    fontFamily: 'inherit'
  },
  labels: ['Operasional', 'Pembangunan', 'Dakwah & Sosial'],
  colors: ['#f43f5e', '#10b981', '#3b82f6'], // Rose 500, Emerald 500, Blue 500
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: { show: true, color: '#9ca3af', fontSize: '12px' },
          value: { show: true, color: '#9ca3af', fontSize: '24px', fontWeight: 700, formatter: (val) => `${val}%` },
          total: { 
            show: true, 
            showAlways: true, 
            label: 'Total Keluar', 
            color: '#9ca3af', 
            fontSize: '12px',
            formatter: () => 'Rp 24M' 
          }
        }
      }
    }
  },
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: { show: false },
  tooltip: { 
    theme: 'dark',
    y: { formatter: (val) => `${val}%` }
  }
})
</script>
