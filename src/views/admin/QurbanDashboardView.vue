<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Tabungan Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Ringkasan performa finansial dan progres pendaftaran shohibul qurban tahun ini.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer hover:border-emerald-500 transition-colors group">
          <Calendar class="w-4 h-4 text-emerald-500" />
          <select v-model="selectedPeriode" class="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-300 outline-none cursor-pointer appearance-none pr-6">
            <option value="1447">Periode 1447 H / 2026 M</option>
            <option value="1446">Periode 1446 H / 2025 M (Arsip)</option>
            <option value="1445">Periode 1445 H / 2024 M (Arsip)</option>
          </select>
          <ChevronDown class="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none group-hover:text-emerald-500 transition-colors" />
        </div>
        <span class="text-[10px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-md font-bold flex items-center whitespace-nowrap border border-red-100 dark:border-red-900/30">
          <Clock class="w-3 h-3 mr-1" /> Sisa {{ store.periode.sisaHari }} Hari
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-fr">
      
      <div class="bg-emerald-600 dark:bg-emerald-700 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
        <div class="absolute right-[-10%] top-[-10%] opacity-20 pointer-events-none">
          <Wallet class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex-1 flex flex-col justify-center">
          <p class="text-sm font-medium text-emerald-100 mb-1">Total Dana Qurban</p>
          <h3 class="text-2xl font-bold tracking-tight">{{ formatRupiah(store.totalCollected) }}</h3>
        </div>
        <div class="relative z-10 flex items-center gap-1.5 mt-2 text-[10px] font-bold text-emerald-100 bg-emerald-700/50 dark:bg-emerald-800/50 w-max px-2 py-1 rounded-lg border border-emerald-500/30">
          <CheckCircle class="w-3 h-3" />
          Target: {{ formatRupiah(store.targetTotal) }}
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Shohibul</p>
          <div class="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
            <Users class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-4 flex-1 flex flex-col justify-end">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ store.totalPeserta }}</h3>
          <p class="text-xs font-medium text-gray-500 mt-1 flex items-center gap-1">
            <PieChart class="w-3.5 h-3.5 text-gray-400" /> Pencapaian {{ store.averageProgress }}%
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shohibul Lunas</p>
          <div class="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-lg">
            <CheckCircle class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-4 flex-1 flex flex-col justify-end">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ store.totalLunas }}</h3>
          <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp class="w-3.5 h-3.5" /> {{ Math.round((store.totalLunas / store.totalPeserta) * 100) }}% dari total
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum Lunas</p>
          <div class="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
            <AlertCircle class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-4 flex-1 flex flex-col justify-end">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ store.totalBelumLunas }}</h3>
          <p class="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
            <TrendingDown class="w-3.5 h-3.5" /> Butuh follow-up
          </p>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <div class="xl:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
        <div class="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white">Daftar Transaksi Pending</h3>
            <p class="text-[11px] text-gray-500 mt-0.5">Setoran masuk yang menunggu verifikasi manual.</p>
          </div>
          <button class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 transition-colors px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">Lihat Semua</button>
        </div>
        
        <div class="flex-1 overflow-x-auto p-5 pt-0 mt-3">
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
            <tbody class="text-sm">
              <tr v-for="tx in store.pendingTransactions" :key="tx.id" class="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td class="py-3.5 font-mono text-gray-500 text-xs">{{ tx.id }}</td>
                <td class="py-3.5">
                  <span class="font-bold text-gray-900 dark:text-white block">{{ tx.name }}</span>
                  <span class="text-[10px] text-gray-500">{{ tx.method }}</span>
                </td>
                <td class="py-3.5 font-bold text-gray-900 dark:text-white text-right">{{ formatRupiah(tx.amount) }}</td>
                <td class="py-3.5 text-center">
                  <span class="inline-block bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded font-semibold text-[10px]">
                    {{ tx.expiredAt }}
                  </span>
                </td>
                <td class="py-3.5 text-center">
                  <button @click="verifyClick(tx.id)" class="p-1.5 bg-gray-50 dark:bg-white/5 hover:bg-emerald-500 hover:text-white text-gray-400 rounded-lg transition-all border border-gray-200 dark:border-white/10 active:scale-90" title="Verifikasi">
                    <CheckCircle class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="xl:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
        <div class="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white">Rekap Target Hewan</h3>
            <p class="text-[11px] text-gray-500 mt-0.5">Estimasi kebutuhan hewan.</p>
          </div>
          <button @click="isSimulasiOpen = true" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1">
            <Plus class="w-3 h-3" /> Buat Grup
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg">🐄</div>
              <div>
                <span class="block text-sm font-bold text-gray-900 dark:text-white">Target Sapi</span>
                <span class="block text-[10px] text-gray-500 mt-0.5">Dari {{ store.sapiShohibul }} shohibul (÷ 7)</span>
              </div>
            </div>
            <div class="text-right">
              <span class="block text-lg font-black text-gray-900 dark:text-white">{{ Math.ceil(store.sapiShohibul / 7) }} Ekor</span>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg">🐐</div>
              <div>
                <span class="block text-sm font-bold text-gray-900 dark:text-white">Target Kambing</span>
                <span class="block text-[10px] text-gray-500 mt-0.5">Shohibul Mandiri</span>
              </div>
            </div>
            <div class="text-right">
              <span class="block text-lg font-black text-gray-900 dark:text-white">{{ store.kambingShohibul }} Ekor</span>
            </div>
          </div>
          
          <div class="pt-4 mt-2 border-t border-gray-100 dark:border-white/5">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Referensi Harga Periode Ini</p>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Sapi (Utuh)</span>
                <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.periode.hargaSapi) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Sapi (Per Slot)</span>
                <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.periode.hargaSlotSapi) }}</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">Kambing</span>
                <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.periode.hargaKambing) }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div v-if="isSimulasiOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        <div class="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users class="w-5 h-5 text-emerald-500" /> Simulasi Manajemen Puluhan Grup Sapi
            </h3>
            <p class="text-xs text-gray-500 mt-1">Mockup tampilan jika terdapat banyak kelompok sapi yang terbuat.</p>
          </div>
          <button @click="isSimulasiOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors"><X class="w-5 h-5" /></button>
        </div>

        <div class="p-6 bg-gray-100/50 dark:bg-black/20 h-[400px] overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div v-for="n in 14" :key="n" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:border-emerald-500 transition-colors cursor-pointer group">
              <div class="flex justify-between items-start mb-2">
                <span class="text-2xl group-hover:scale-110 transition-transform origin-left">🐄</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded" :class="n % 3 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'">
                  {{ n % 3 === 0 ? '7/7 Penuh' : '2/7 Proses' }}
                </span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white">Kelompok Sapi {{ n }}</h4>
              <div class="mt-3 flex -space-x-2 overflow-hidden">
                <div v-for="i in (n % 3 === 0 ? 7 : 2)" :key="i" class="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                  {{ i }}
                </div>
              </div>
            </div>
            
            <button class="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-emerald-600 transition-all min-h-[120px]">
              <Plus class="w-8 h-8" />
              <span class="text-xs font-bold">Buat Sapi 15</span>
            </button>

          </div>
        </div>
        
        <div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-white/5 text-right">
          <button @click="isSimulasiOpen = false" class="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors">Tutup Simulasi</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Wallet, CheckCircle, TrendingUp, TrendingDown, Users, PieChart, AlertCircle, Calendar, Clock, ChevronDown, Plus, X } from 'lucide-vue-next'

const selectedPeriode = ref('1447')
const isSimulasiOpen = ref(false)

// FORMATTER FUNCTIONS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

// Simulasi Klik Verifikasi
const verifyClick = (id) => {
  alert(`Memverifikasi transaksi ${id}... (Navigasi ke halaman detail)`)
}

// MOCK DATA 
const store = ref({
  totalCollected: 42500000,
  targetTotal: 85000000,
  totalPeserta: 45,
  totalLunas: 12,
  totalBelumLunas: 33,
  averageProgress: 50,
  
  sapiShohibul: 21,
  kambingShohibul: 24,

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

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); }
</style>