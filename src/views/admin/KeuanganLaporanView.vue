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
        <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-lg flex p-1">
          <button class="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-all">Tahun Ini</button>
          <button class="px-3 py-1.5 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all">Bulan Ini</button>
        </div>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2">
          <Download class="w-4 h-4" />
          <span>Unduh PDF</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Chart (Arus Kas) -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl p-6 shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Arus Kas (Cash Flow)</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pemasukan vs Pengeluaran per bulan</p>
          </div>
          <button class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
            <MoreHorizontal class="w-5 h-5" />
          </button>
        </div>
        <div class="h-80 w-full">
          <!-- Placeholder for ApexCharts. In a real app we'd use <apexchart /> here -->
          <div class="w-full h-full rounded-lg bg-gray-50 dark:bg-gray-950/50 border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-gray-500">
            <BarChart3 class="w-10 h-10 mb-3 opacity-50" />
            <p class="font-medium text-gray-600 dark:text-gray-400">Grafik Arus Kas</p>
            <p class="text-xs mt-1">Data akan divisualisasikan oleh ApexCharts</p>
          </div>
        </div>
      </div>

      <!-- Donut Chart (Distribusi Pengeluaran) -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl p-6 shadow-sm flex flex-col">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Distribusi Pengeluaran</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Berdasarkan kategori tahun ini</p>
        </div>
        <div class="flex-1 flex flex-col justify-center items-center relative">
          <!-- Donut Mockup -->
          <div class="relative w-48 h-48 rounded-full border-[16px] border-gray-100 dark:border-gray-800 flex items-center justify-center mb-6">
            <div class="absolute inset-0 rounded-full border-[16px] border-rose-500" style="clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0);"></div>
            <div class="absolute inset-0 rounded-full border-[16px] border-emerald-500" style="clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0); transform: rotate(120deg);"></div>
            <div class="absolute inset-0 rounded-full border-[16px] border-blue-500" style="clip-path: polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0); transform: rotate(260deg);"></div>
            
            <div class="text-center z-10 bg-white dark:bg-gray-900 w-full h-full rounded-full flex flex-col items-center justify-center">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">Rp 24M</span>
              <span class="text-xs text-gray-500">Total Keluar</span>
            </div>
          </div>

          <!-- Legend -->
          <div class="w-full space-y-3 mt-auto">
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
          Saldo bersih tahun berjalan
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Download, MoreHorizontal, BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Scale } from 'lucide-vue-next'
</script>
