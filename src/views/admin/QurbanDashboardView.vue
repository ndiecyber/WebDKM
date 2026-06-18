<template>
  <div class="space-y-6 sm:space-y-8 pb-8">
    
    <div class="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-900 border border-emerald-500/20 text-white p-6 sm:p-8 shadow-xl flex flex-col group">
      <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-emerald-500/10 border border-emerald-500/20 pointer-events-none"></div>
      <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row gap-6 md:justify-between md:items-end">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Dashboard Admin</span>
          </div>
          
          <div>
            <p class="text-xs sm:text-sm text-gray-400 font-semibold tracking-wide uppercase mb-1">Total Dana Qurban Terkumpul</p>
            <h2 class="text-4xl sm:text-5xl font-black text-white drop-shadow-lg tracking-tight">
              {{ formatRupiah(store.totalCollected) }}
            </h2>
            <div class="flex items-center space-x-2 mt-2">
              <span class="text-xs text-gray-400 font-medium">dari target {{ formatRupiah(store.targetTotal) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm min-w-[280px]">
          <div class="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
            <h3 class="text-sm font-bold text-emerald-400 flex items-center">
              <Calendar class="w-4 h-4 mr-2" />
              Periode {{ store.periode.tahun }}
            </h3>
            <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-1 rounded-md font-bold flex items-center">
              <Clock class="w-3 h-3 mr-1" /> Sisa {{ store.periode.sisaHari }} Hari
            </span>
          </div>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between text-gray-300">
              <span>Sapi (1 Ekor)</span>
              <span class="font-bold text-white">{{ formatRupiah(store.periode.hargaSapi) }}</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Sapi (Per Slot)</span>
              <span class="font-bold text-white">{{ formatRupiah(store.periode.hargaSlotSapi) }}</span>
            </div>
            <div class="flex justify-between text-gray-300">
              <span>Kambing</span>
              <span class="font-bold text-white">{{ formatRupiah(store.periode.hargaKambing) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex justify-between items-start mb-2">
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Shohibul</p>
          <Users class="w-5 h-5 text-blue-500" />
        </div>
        <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.totalPeserta }}</p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex justify-between items-start mb-2">
          <p class="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Shohibul Lunas</p>
          <CheckCircle class="w-5 h-5 text-emerald-500" />
        </div>
        <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.totalLunas }}</p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-amber-400">
        <div class="flex justify-between items-start mb-2">
          <p class="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">Belum Lunas</p>
          <AlertCircle class="w-5 h-5 text-amber-500" />
        </div>
        <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.totalBelumLunas }}</p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex justify-between items-start mb-2">
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pencapaian</p>
          <PieChart class="w-5 h-5 text-purple-500" />
        </div>
        <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.averageProgress }}%</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <div class="xl:col-span-1 space-y-6">
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center border-b border-gray-100 dark:border-white/5 pb-4">
            <Target class="w-4 h-4 mr-2 text-emerald-500" />
            Rekap Target Hewan
          </h4>

          <div class="space-y-4 pt-2">
            <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-xl border border-gray-100 dark:border-white/5">🐄</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Target Sapi</span>
                  <span class="block text-[11px] text-gray-500 mt-0.5">
                    <strong class="text-emerald-600 dark:text-emerald-400">{{ Math.ceil(store.sapiShohibul / 7) }} ekor</strong> (dari {{ store.sapiShohibul }} shohibul ÷ 7)
                  </span>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-xl border border-gray-100 dark:border-white/5">🐐</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Target Kambing</span>
                  <span class="block text-[11px] text-gray-500 mt-0.5">
                    <strong class="text-blue-600 dark:text-blue-400">{{ store.kambingShohibul }} ekor</strong> (mandiri)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="xl:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center">
            <Clock class="w-4 h-4 mr-2 text-amber-500" />
            Daftar Transaksi Pending
          </h4>
          <span class="text-xs font-semibold text-gray-500">Butuh Perhatian</span>
        </div>
        
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                <th class="pb-3 font-semibold">ID Transaksi</th>
                <th class="pb-3 font-semibold">Shohibul</th>
                <th class="pb-3 font-semibold text-right">Nominal</th>
                <th class="pb-3 font-semibold text-center">Batas Waktu</th>
                <th class="pb-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-xs">
              <tr v-for="tx in store.pendingTransactions" :key="tx.id" class="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td class="py-3 font-mono text-gray-500">{{ tx.id }}</td>
                <td class="py-3">
                  <span class="font-bold text-gray-800 dark:text-white block">{{ tx.name }}</span>
                  <span class="text-[9px] text-gray-400">{{ tx.method }}</span>
                </td>
                <td class="py-3 font-bold text-gray-800 dark:text-white text-right">{{ formatRupiah(tx.amount) }}</td>
                <td class="py-3 text-center">
                  <span class="inline-block bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded font-semibold text-[10px]">
                    {{ tx.expiredAt }}
                  </span>
                </td>
                <td class="py-3 text-center">
                  <button class="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-200 transition-colors">
                    Cek
                  </button>
                </td>
              </tr>
              <tr v-if="store.pendingTransactions.length === 0">
                <td colspan="5" class="py-8 text-center text-gray-400">Tidak ada transaksi pending saat ini.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, TrendingUp, CheckCircle, PieChart, Target, Calendar, Clock, Users, AlertCircle } from 'lucide-vue-next'

// FORMATTER FUNCTIONS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

// MOCK DATA TERBARU (Disesuaikan dengan kebutuhan Admin Fase 7)
const store = ref({
  totalCollected: 42500000,
  targetTotal: 85000000,
  totalPeserta: 45,
  totalLunas: 12,
  totalBelumLunas: 33, // Data baru
  averageProgress: 50,
  
  sapiShohibul: 21,    // Shohibul yang daftar sapi
  kambingShohibul: 24, // Shohibul yang daftar kambing

  periode: {
    tahun: "1447 H / 2026 M",
    hargaSapi: 28000000,
    hargaSlotSapi: 4000000,
    hargaKambing: 3500000,
    sisaHari: 45
  },

  pendingTransactions: [
    { id: 'TX-QUR-091', name: 'Bapak Ahmad', amount: 500000, method: 'QRIS', expiredAt: '16 Jun 2026 10:00' },
    { id: 'TX-QUR-092', name: 'Ibu Fatimah', amount: 4000000, method: 'BSI Virtual Account', expiredAt: '15 Jun 2026 14:00' },
    { id: 'TX-QUR-093', name: 'Deni Setiawan', amount: 150000, method: 'QRIS', expiredAt: '15 Jun 2026 09:00' }
  ]
})
</script>