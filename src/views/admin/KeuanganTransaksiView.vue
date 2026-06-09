<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Data Transaksi</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola pencatatan semua uang masuk dan keluar.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2">
          <Download class="w-4 h-4" />
          <span>Ekspor CSV</span>
        </button>
        <button class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span>Catat Transaksi</span>
        </button>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
      <div class="relative w-full md:w-96">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Cari deskripsi atau nominal..." 
          class="w-full bg-gray-50 dark:bg-gray-950 border-0 ring-1 ring-gray-300 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
        />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar pb-1 md:pb-0">
        <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-white/5 whitespace-nowrap">
          Semua
        </button>
        <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Pemasukan
        </button>
        <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Pengeluaran
        </button>
        <div class="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden md:block"></div>
        <button class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 whitespace-nowrap flex items-center gap-2 border border-transparent dark:border-white/5">
          <Filter class="w-4 h-4" />
          Bulan Ini
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-300 dark:border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Deskripsi</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Kas/Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Nominal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                <div class="text-xs text-gray-500">{{ tx.time }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    tx.type === 'in' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  ]">
                    <ArrowDownLeft v-if="tx.type === 'in'" class="w-4 h-4" />
                    <ArrowUpRight v-else class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-gray-900 dark:text-gray-200 font-medium">{{ tx.description }}</p>
                    <p class="text-xs text-gray-500">{{ tx.category }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-white/10">
                  {{ tx.account }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <span :class="[
                  'font-semibold',
                  tx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                ]">
                  {{ tx.type === 'in' ? '+' : '-' }} Rp {{ tx.amount }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button class="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  <MoreHorizontal class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Dummy -->
      <div class="p-4 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-gray-50 dark:bg-gray-950/30">
        <span>Menampilkan 1-10 dari 45 transaksi</span>
        <div class="flex items-center gap-1">
          <button class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50" disabled>
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button class="w-6 h-6 rounded bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-medium flex items-center justify-center">1</button>
          <button class="w-6 h-6 rounded hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 flex items-center justify-center">2</button>
          <button class="w-6 h-6 rounded hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 flex items-center justify-center">3</button>
          <button class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Filter, Plus, ArrowDownLeft, ArrowUpRight, MoreHorizontal, ChevronLeft, ChevronRight, Download } from 'lucide-vue-next'

const transactions = [
  { id: 1, date: '12 Okt 2023', time: '13:45', description: 'Infaq Kotak Amal Jumat', category: 'Infaq Mingguan', account: 'Kotak Amal Utama', type: 'in', amount: '3.450.000' },
  { id: 2, date: '10 Okt 2023', time: '09:00', description: 'Pembayaran Listrik & Air PLN/PDAM', category: 'Operasional', account: 'BSI Masjid', type: 'out', amount: '1.250.000' },
  { id: 3, date: '08 Okt 2023', time: '16:30', description: 'Donasi Hamba Allah (Transfer)', category: 'Infaq Umum', account: 'BSI Masjid', type: 'in', amount: '5.000.000' },
  { id: 4, date: '05 Okt 2023', time: '10:00', description: 'Honor Penceramah Kajian', category: 'Dakwah & Kajian', account: 'Kas Tunai', type: 'out', amount: '500.000' },
  { id: 5, date: '01 Okt 2023', time: '08:15', description: 'Pembelian Alat Kebersihan', category: 'Pemeliharaan', account: 'Kas Tunai', type: 'out', amount: '350.000' },
]
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
