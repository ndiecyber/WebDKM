<template>
  <div class="space-y-6 pb-8">
    
    <!-- HEADER (Disamakan dengan gaya Keuangan) -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Tabungan Qurban</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Ringkasan performa finansial dan progres pendaftaran shohibul qurban tahun ini.</p>
      </div>
      <!-- Badge Periode di Kanan (Sebagai pengganti dropdown bulan di Keuangan) -->
      <div class="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 px-4 py-2.5 rounded-xl shadow-sm">
        <Calendar class="w-4 h-4 text-gray-500" />
        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">Periode {{ store.periode.tahun }}</span>
        <span class="text-[10px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-md font-bold flex items-center">
          <Clock class="w-3 h-3 mr-1" /> Sisa {{ store.periode.sisaHari }} Hari
        </span>
      </div>
    </div>

    <!-- QUICK STATS GRID (Disamakan dengan grid 4 kolom Keuangan) -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      
      <!-- Kartu Hijau Solid (Sama seperti "Total Saldo Tersedia") -->
      <div class="bg-emerald-600 dark:bg-emerald-700 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
        <div class="absolute right-[-10%] top-[-10%] opacity-20 pointer-events-none">
          <Wallet class="w-24 h-24" />
        </div>
        <div class="relative z-10">
          <p class="text-sm font-medium text-emerald-100 mb-1">Total Dana Qurban</p>
          <h3 class="text-2xl lg:text-3xl font-bold tracking-tight">{{ formatRupiah(store.totalCollected) }}</h3>
        </div>
        <div class="relative z-10 flex items-center gap-1.5 mt-4 text-xs font-medium text-emerald-100 bg-emerald-700/50 dark:bg-emerald-800/50 w-fit px-2.5 py-1 rounded-lg">
          <CheckCircle class="w-3.5 h-3.5" />
          Target: {{ formatRupiah(store.targetTotal) }}
        </div>
      </div>

      <!-- Kartu Putih Standar -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Shohibul</p>
          <div class="p-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
            <Users class="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ store.totalPeserta }}</h3>
          <p class="text-xs font-medium text-gray-500 mt-1 flex items-center gap-1">
            <PieChart class="w-3.5 h-3.5 text-gray-400" /> Pencapaian {{ store.averageProgress }}%
          </p>
        </div>
      </div>

      <!-- Kartu Putih Standar -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shohibul Lunas</p>
          <div class="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-lg">
            <CheckCircle class="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ store.totalLunas }}</h3>
          <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp class="w-3.5 h-3.5" /> {{ Math.round((store.totalLunas / store.totalPeserta) * 100) }}% dari total
          </p>
        </div>
      </div>

      <!-- Kartu Putih Standar -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum Lunas</p>
          <div class="p-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
            <AlertCircle class="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">{{ store.totalBelumLunas }}</h3>
          <p class="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
            <TrendingDown class="w-3.5 h-3.5" /> Butuh follow-up
          </p>
        </div>
      </div>

    </div>

    <!-- MAIN CONTENT SECTION (Split layout disamakan dengan Keuangan) -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- TRANSAKSI PENDING (Lebar 2 Kolom, seperti tabel Keuangan) -->
      <div class="xl:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
        <div class="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 class="text-base font-bold text-gray-900 dark:text-white">Daftar Transaksi Pending</h3>
            <p class="text-xs text-gray-500 mt-0.5">Setoran masuk yang menunggu verifikasi manual.</p>
          </div>
          <button class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">Lihat Semua</button>
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
              <tr v-for="tx in store.pendingTransactions" :key="tx.id" class="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
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
                  <button class="p-1.5 bg-gray-50 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Verifikasi">
                    <CheckCircle class="w-4 h-4" />
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

      <!-- TARGET HEWAN (Lebar 1 Kolom) -->
      <div class="xl:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm flex flex-col">
        <div class="p-5 border-b border-gray-100 dark:border-white/5">
          <h3 class="text-base font-bold text-gray-900 dark:text-white">Rekap Target Hewan</h3>
          <p class="text-xs text-gray-500 mt-0.5">Estimasi kebutuhan ketersediaan hewan.</p>
        </div>

        <div class="p-5 space-y-4">
          <!-- SAPI -->
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

          <!-- KAMBING -->
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
          
          <!-- Info Harga (Dipindah ke sini agar tidak butuh dark card besar) -->
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Wallet, CheckCircle, TrendingUp, TrendingDown, Users, PieChart, AlertCircle, Calendar, Clock } from 'lucide-vue-next'

// FORMATTER FUNCTIONS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
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