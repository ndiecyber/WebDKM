<template>
  <div class="space-y-6 sm:space-y-8 pb-8">
    
    <div class="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-900 border border-emerald-500/20 text-white p-6 sm:p-8 shadow-xl flex flex-col min-h-55">
      <div class="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-emerald-500/10 border border-emerald-500/20 pointer-events-none"></div>
      <div class="absolute left-[-10%] bottom-[-30%] w-48 h-48 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col h-full justify-between space-y-6">
        <div class="flex justify-between items-start">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-sm">
            <span class="text-white/90 text-[10px] font-extrabold tracking-[0.2em] uppercase">Rekapitulasi DKM</span>
          </div>
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
            <FileText class="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        
        <div>
          <p class="text-xs sm:text-sm text-gray-400 font-semibold tracking-wide uppercase mb-1">Total Kas Qurban Terkumpul</p>
          <h2 class="text-4xl sm:text-5xl font-black text-white drop-shadow-lg tracking-tight">
            {{ formatRupiah(store.totalCollected) }}
          </h2>
          <div class="flex items-center space-x-2 mt-2.5">
            <span class="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold border border-emerald-500/20 backdrop-blur-sm shadow-sm flex items-center">
              <TrendingUp class="w-3 h-3 mr-1" />
              Periode 2026
            </span>
            <p class="text-[10px] sm:text-xs text-gray-400 font-medium ml-2">Diperbarui secara real-time</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Target Pendanaan</p>
          <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ formatRupiah(store.targetTotal) }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Wallet class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Peserta Lunas</p>
          <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.totalLunas }} / {{ store.totalPeserta }}</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <CheckCircle class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Progress Keseluruhan</p>
          <p class="text-2xl font-black text-gray-800 dark:text-white leading-none">{{ store.averageProgress }}%</p>
        </div>
        <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <PieChart class="w-6 h-6" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center border-b border-gray-100 dark:border-white/5 pb-4">
          <Trophy class="w-4 h-4 mr-2 text-emerald-500" />
          Top Tabungan Jamaah
        </h4>
        
        <div class="space-y-4 pt-2">
          <div v-for="(top, index) in store.topSavers" :key="top.name" class="group">
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm"
                   :class="index === 0 ? 'bg-linear-to-br from-yellow-300 to-yellow-600 text-white' : 
                           index === 1 ? 'bg-linear-to-br from-gray-300 to-gray-500 text-white' :
                           index === 2 ? 'bg-linear-to-br from-orange-300 to-orange-700 text-white' :
                           'bg-gray-100 dark:bg-gray-800 text-gray-500'">
                {{ index + 1 }}
              </div>
              <div class="flex-1 flex justify-between items-end">
                <span class="text-xs font-bold text-gray-700 dark:text-gray-200">{{ top.name }}</span>
                <span class="text-xs font-black text-gray-900 dark:text-white">{{ formatJuta(top.amount) }}</span>
              </div>
            </div>
            <div class="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner ml-9" style="width: calc(100% - 2.25rem)">
              <div class="h-full rounded-full transition-all duration-1000 ease-out bg-emerald-500" :style="{ width: (top.amount / 12000000) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
 
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center border-b border-gray-100 dark:border-white/5 pb-4">
          <Target class="w-4 h-4 mr-2 text-emerald-500" />
          Status Target Hewan
        </h4>

        <div class="space-y-4 pt-2">
          <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-xl border border-gray-100 dark:border-white/5">🐄</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Sapi Qurban</span>
                  <span class="block text-[10px] text-gray-500">Target: {{ store.sapiCount }} Ekor</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-sm font-black text-emerald-600 dark:text-emerald-400">{{ store.sapiLunasCount }} / {{ store.sapiCount }}</span>
                <span class="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Terdanai Lunas</span>
              </div>
            </div>
            <div class="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-emerald-500 transition-all duration-1000" :style="{ width: (store.sapiLunasCount / store.sapiCount) * 100 + '%' }"></div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-xl border border-gray-100 dark:border-white/5">🐐</div>
                <div>
                  <span class="block text-xs font-bold text-gray-800 dark:text-white">Kambing Qurban</span>
                  <span class="block text-[10px] text-gray-500">Target: {{ store.kambingCount }} Ekor</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-sm font-black text-blue-600 dark:text-blue-400">{{ store.kambingLunasCount }} / {{ store.kambingCount }}</span>
                <span class="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Terdanai Lunas</span>
              </div>
            </div>
            <div class="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-blue-500 transition-all duration-1000" :style="{ width: (store.kambingLunasCount / store.kambingCount) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
      <h4 class="text-sm font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-white/5 pb-4 mb-4">Aktivitas Setoran Terbaru</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tx in store.transactions" :key="tx.id" class="flex justify-between items-center p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">
              {{ getInitials(tx.name) }}
            </div>
            <div>
              <h5 class="text-xs font-bold text-gray-800 dark:text-white">{{ tx.name }}</h5>
              <p class="text-[10px] text-gray-500 mt-0.5">{{ tx.date }} • {{ tx.code }}</p>
            </div>
          </div>
          <div class="text-right">
            <span class="block text-sm font-black text-gray-800 dark:text-white">{{ formatRupiah(tx.amount) }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileText, TrendingUp, Wallet, CheckCircle, PieChart, Trophy, Target } from 'lucide-vue-next'

// FORMATTER FUNCTIONS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const formatJuta = (value) => {
  return `${(value / 1000000).toFixed(1)} Jt`
}

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) return (split[0][0] + split[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

// MOCK DATA (Data sementara agar halaman tidak error)
// Nanti kita akan menggantinya dengan pemanggilan API / Pinia Store sungguhan
const store = ref({
  totalCollected: 42500000,
  targetTotal: 85000000,
  totalLunas: 12,
  totalPeserta: 45,
  averageProgress: 50,
  
  sapiCount: 3,
  sapiLunasCount: 1,
  kambingCount: 15,
  kambingLunasCount: 8,

  topSavers: [
    { name: 'Bapak Ahmad', amount: 3500000 },
    { name: 'Ibu Fatimah', amount: 3000000 },
    { name: 'Keluarga Budi', amount: 2500000 },
    { name: 'Haji Suryana', amount: 2000000 },
    { name: 'Deni Setiawan', amount: 1500000 }
  ],

  transactions: [
    { id: 1, name: 'Bapak Ahmad', amount: 500000, date: '14 Jun 2026', code: 'SET-089' },
    { id: 2, name: 'Ibu Fatimah', amount: 300000, date: '13 Jun 2026', code: 'SET-088' },
    { id: 3, name: 'Keluarga Budi', amount: 1000000, date: '12 Jun 2026', code: 'SET-087' },
    { id: 4, name: 'Haji Suryana', amount: 2000000, date: '10 Jun 2026', code: 'SET-086' },
    { id: 5, name: 'Deni Setiawan', amount: 150000, date: '09 Jun 2026', code: 'SET-085' }
  ]
})
</script>