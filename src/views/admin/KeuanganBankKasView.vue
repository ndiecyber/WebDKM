<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Bank & Kas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pantau saldo seluruh rekening bank dan kotak fisik kas masjid.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-200 dark:ring-white/10 shadow-sm text-sm flex items-center gap-2">
          <ArrowLeftRight class="w-4 h-4" />
          <span>Mutasi Kas</span>
        </button>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span>Tambah Rekening</span>
        </button>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Card: BSI -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-6 shadow-lg shadow-emerald-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Landmark class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-emerald-100">BSI Masjid Jami Kassiti</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-emerald-900/50 rounded-md backdrop-blur-sm border border-emerald-500/30">Bank</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 45.250.000</p>
            <p class="text-emerald-200 text-sm mt-1 font-mono tracking-wider">7123 4567 8900</p>
          </div>
        </div>
      </div>

      <!-- Card: Kotak Amal -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6 shadow-lg shadow-blue-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Wallet class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-blue-100">Kotak Amal Utama</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-blue-900/50 rounded-md backdrop-blur-sm border border-blue-500/30">Kas Tunai</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 5.150.000</p>
            <p class="text-blue-200 text-sm mt-1">Dihitung setiap Jumat</p>
          </div>
        </div>
      </div>

      <!-- Card: Kas Operasional -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white p-6 shadow-lg shadow-gray-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Briefcase class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-gray-300">Kas Kecil Operasional</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-gray-800/80 rounded-md backdrop-blur-sm border border-gray-600/30">Petty Cash</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 850.000</p>
            <p class="text-gray-400 text-sm mt-1">Dipegang oleh Bendahara</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Riwayat Mutasi Antar Kas -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl overflow-hidden shadow-sm">
      <div class="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Mutasi Antar Kas</h3>
        <button class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">Lihat Semua</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-200 dark:border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Dari Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Ke Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nominal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Keterangan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="mutasi in mutasiData" :key="mutasi.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{{ mutasi.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-400"></span>
                  {{ mutasi.from }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {{ mutasi.to }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-white">Rp {{ mutasi.amount }}</td>
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400">{{ mutasi.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, ArrowLeftRight, Landmark, Wallet, Briefcase } from 'lucide-vue-next'

const mutasiData = [
  { id: 1, date: '10 Okt 2023', from: 'Kotak Amal Utama', to: 'BSI Masjid Jami Kassiti', amount: '3.000.000', desc: 'Setor tunai hasil Jumat' },
  { id: 2, date: '05 Okt 2023', from: 'BSI Masjid Jami Kassiti', to: 'Kas Kecil Operasional', amount: '1.000.000', desc: 'Tarik tunai untuk operasional' },
  { id: 3, date: '28 Sep 2023', from: 'Kotak Amal Utama', to: 'BSI Masjid Jami Kassiti', amount: '2.800.000', desc: 'Setor tunai hasil Jumat' },
]
</script>
