<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ringkasan performa finansial dan progres shohibul qurban tahun ini.
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <span class="hidden sm:flex text-xs bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg font-bold items-center ring-1 ring-red-500/20 shadow-sm">
          <Clock class="w-4 h-4 mr-1.5" /> Sisa {{ store.period.days_remaining }} Hari
        </span>

        <div class="relative">
          <button @click="showPeriodeDropdown = !showPeriodeDropdown" :disabled="isLoading" class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2 min-w-[180px] justify-between disabled:opacity-50">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-gray-400" />
              <span>{{ selectedPeriodeLabel }}</span>
            </div>
            <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
          </button>
          
          <div v-if="showPeriodeDropdown" class="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-fade-in-down max-h-60 overflow-y-auto custom-scrollbar">
            <button @click="changePeriode(periodes[0])" class="w-full text-left px-4 py-2 text-sm bg-secondary/10 text-secondary dark:bg-secondary/20 font-medium transition-colors">
              1447 H / 2026 M
            </button>
            <button @click="changePeriode(periodes[1])" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              1446 H / 2025 M (Arsip)
            </button>
          </div>
          <div v-if="showPeriodeDropdown" @click="showPeriodeDropdown = false" class="fixed inset-0 z-10"></div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Kartu Hijau (Total Dana) -->
      <RouterLink to="/admin/qurban/setoran" class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white group block hover:-translate-y-1 hover:shadow-emerald-900/30 transition-all duration-300">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
          <Wallet class="w-24 h-24" />
        </div>
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-emerald-100" />
        </div>
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-emerald-100">Total Dana Qurban</p>
          </div>
          <div>
            <div v-if="isLoading" class="h-9 bg-white/20 animate-pulse rounded w-3/4 mb-2"></div>
            <h3 v-else class="text-3xl font-bold tracking-tight">{{ formatRupiah(store.summary.total_collected) }}</h3>
            
            <div v-if="isLoading" class="h-5 bg-white/10 animate-pulse rounded w-1/2 mt-2"></div>
            <p v-else class="text-xs text-emerald-200 mt-2 flex items-center gap-1 font-medium bg-white/10 w-max px-2 py-1 rounded backdrop-blur-sm">
              <CheckCircle class="w-3 h-3" /> Target: {{ formatRupiah(store.summary.total_target) }}
            </p>
          </div>
        </div>
      </RouterLink>

      <!-- Kartu Putih 1 (Total Shohibul) -->
      <RouterLink to="/admin/qurban/peserta" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Shohibul</p>
          <div class="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
            <Users class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div class="relative z-10">
          <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
          <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.total_shohibul }}</h3>
          
          <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
          <p v-else class="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight class="w-4 h-4" /> Pencapaian {{ store.summary.percentage }}%
          </p>
        </div>
      </RouterLink>

      <!-- Kartu Putih 2 (Lunas) -->
      <RouterLink to="/admin/qurban/peserta" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shohibul Lunas</p>
          <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
            <CheckCircle class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div class="relative z-10">
          <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
          <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.count_lunas }}</h3>
          
          <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
          <p v-else class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingUp class="w-4 h-4" /> Dari total target
          </p>
        </div>
      </RouterLink>

      <!-- Kartu Putih 3 (Belum Lunas) -->
      <RouterLink to="/admin/qurban/peserta" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum Lunas</p>
          <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
            <AlertCircle class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <div class="relative z-10">
          <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
          <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.count_belum_lunas }}</h3>
          
          <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
          <p v-else class="text-sm text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1 font-medium">
            <TrendingDown class="w-4 h-4" /> Butuh follow-up
          </p>
        </div>
      </RouterLink>

    </div>

    <!-- Widgets Bawah -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- List Transaksi Terbaru (Redesigned like Keuangan) -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-base font-semibold text-gray-900 dark:text-white">Setoran Terbaru</h2>
              <span v-if="!isLoading && store.pending_transactions > 0" class="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] font-bold rounded ring-1 ring-amber-500/20">
                {{ store.pending_transactions }} Pending
              </span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Daftar setoran masuk terbaru dari jamaah.</p>
          </div>
          <RouterLink to="/admin/qurban/setoran" class="text-xs font-medium text-secondary hover:text-yellow-600 transition-colors">
            Lihat Semua
          </RouterLink>
        </div>
        
        <div class="p-2 flex-1">
          <div v-if="isLoading" class="p-4 space-y-4">
            <div v-for="i in 3" :key="i" class="flex justify-between items-center animate-pulse">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                  <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>

          <div v-else-if="store.recent_transactions.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500">
            <CheckCircle class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p class="text-sm font-medium">Belum ada transaksi.</p>
          </div>

          <ul v-else class="divide-y divide-gray-100 dark:divide-white/5">
            <li v-for="tx in store.recent_transactions" :key="tx.id" class="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-xl transition-colors flex items-center justify-between group">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 ring-1',
                  tx.shohibul?.target_type === 'sapi' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20' : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20'
                ]">
                  {{ tx.shohibul?.target_type === 'sapi' ? '🐄' : '🐐' }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ tx.shohibul?.name || 'Hamba Allah' }}</p>
                    <span v-if="tx.status === 'success'" class="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">Sukses</span>
                    <span v-else-if="tx.status === 'pending'" class="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">Pending</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ formatDate(tx.created_at) }} • {{ tx.method || 'Transfer' }}</p>
                </div>
              </div>
              <div class="text-right flex items-center gap-3">
                <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  + Rp {{ formatRupiahSimple(tx.amount) }}
                </p>
                <button @click="verifyClick(tx.id)" class="p-1.5 text-gray-400 hover:text-secondary dark:hover:text-yellow-500 rounded transition-colors opacity-0 group-hover:opacity-100" title="Verifikasi / Detail">
                  <Pencil class="w-4 h-4" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Widget Rekap Target Hewan -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Target Hewan</h2>
          <button @click="isSimulasiOpen = true" class="p-2 bg-secondary hover:bg-yellow-500 text-white rounded-lg transition-colors shadow-sm" title="Simulasi Grup Sapi">
            <Layers class="w-4 h-4" />
          </button>
        </div>

        <div class="p-6 space-y-4 flex-1 flex flex-col">
          <div v-if="isLoading" class="space-y-4">
            <div class="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
            <div class="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
          </div>

          <template v-else>
            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-white/10 flex items-center justify-center text-lg">🐄</div>
                <div>
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Sapi (Kolektif)</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ store.animals.sapi_groups }} Grup Penuh</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-lg font-black text-gray-900 dark:text-white">{{ store.animals.estimated_sapi }} <span class="text-xs font-normal text-gray-500">Ekor</span></span>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-white/10 flex items-center justify-center text-lg">🐐</div>
                <div>
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Kambing (Mandiri)</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ store.animals.kambing_shohibul }} Shohibul</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-lg font-black text-gray-900 dark:text-white">{{ store.animals.kambing_shohibul }} <span class="text-xs font-normal text-gray-500">Ekor</span></span>
              </div>
            </div>
            
            <div class="mt-auto pt-4 border-t border-gray-200 dark:border-white/10">
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Harga Periode Ini</p>
              <div class="space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Sapi (Utuh)</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">Rp {{ formatRupiahSimple(store.settings?.hargaSapi || 0) }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Sapi (Per Slot)</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">Rp {{ formatRupiahSimple(store.settings?.hargaSlotSapi || 0) }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500 dark:text-gray-400">Kambing</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">Rp {{ formatRupiahSimple(store.settings?.hargaKambing || 0) }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

    </div>
  </div>

  <!-- MODAL SIMULASI SAPI (Redesigned matching Keuangan modal standard) -->
  <Teleport to="body">
    <div v-if="isSimulasiOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="isSimulasiOpen = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Layers class="w-5 h-5 text-secondary" /> Simulasi Grup Sapi
          </h3>
          <button @click="isSimulasiOpen = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 bg-gray-50/50 dark:bg-gray-900/50 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div v-for="n in store.animals.sapi_groups || 3" :key="n" class="bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl p-4 shadow-sm hover:shadow-md hover:ring-secondary/50 dark:hover:ring-secondary/50 transition-all cursor-pointer group relative">
              <div class="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                Penuh
              </div>
              <div class="flex flex-col items-center justify-center text-center mt-2">
                <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">🐄</span>
                <h4 class="font-bold text-sm text-gray-900 dark:text-white">Grup Sapi {{ n }}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">7/7 Shohibul</p>
              </div>
            </div>
            
            <button class="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-secondary dark:hover:border-secondary hover:bg-yellow-50 dark:hover:bg-yellow-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-all min-h-[140px]">
              <Plus class="w-8 h-8" />
              <span class="text-sm font-bold">Buat Grup Baru</span>
            </button>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="isSimulasiOpen = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Tutup</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Wallet, CheckCircle, TrendingUp, TrendingDown, Users, PieChart, 
  AlertCircle, Calendar, Clock, ChevronDown, Plus, Pencil, ArrowUpRight, X, ArrowRight, Layers
} from 'lucide-vue-next'

const isLoading = ref(true)
const showPeriodeDropdown = ref(false)
const isSimulasiOpen = ref(false)

const periodes = [
  { id: '1447', label: 'Periode 1447 H / 2026 M' },
  { id: '1446', label: 'Periode 1446 H / 2025 M (Arsip)' },
  { id: '1445', label: 'Periode 1445 H / 2024 M (Arsip)' }
]
const selectedPeriode = ref(periodes[0])
const selectedPeriodeLabel = computed(() => selectedPeriode.value.label)

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const formatRupiahSimple = (val) => {
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0"
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

const changePeriode = (per) => {
  selectedPeriode.value = per
  showPeriodeDropdown.value = false
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 800)
}

const verifyClick = (id) => {
  alert(`Memverifikasi transaksi ${id}...`)
}

const store = ref({
  period: { id: null, name: '', deadline_date: '', days_remaining: 0 },
  summary: { total_shohibul: 0, total_collected: 0, total_target: 0, count_lunas: 0, count_belum_lunas: 0, percentage: 0 },
  animals: { sapi_shohibul: 0, kambing_shohibul: 0, sapi_groups: 0, estimated_sapi: 0 },
  pending_transactions: 0,
  recent_transactions: [],
  settings: { hargaSapi: 28000000, hargaSlotSapi: 4000000, hargaKambing: 3500000 }
})

onMounted(() => {
  setTimeout(() => {
    store.value = {
      period: {
        id: 1,
        name: "1447 H / 2026 M",
        deadline_date: "2026-06-30",
        days_remaining: 45
      },
      summary: {
        total_shohibul: 45,
        total_collected: 42500000,
        total_target: 85000000,
        count_lunas: 12,
        count_belum_lunas: 33,
        percentage: 50.0
      },
      animals: {
        sapi_shohibul: 21,
        kambing_shohibul: 24,
        sapi_groups: 3,
        estimated_sapi: 3
      },
      pending_transactions: 5,
      recent_transactions: [
        { id: 1, amount: 4000000, method: 'Transfer BSI', status: 'success', created_at: '2026-06-15T14:00:00Z', shohibul: { id: 1, name: 'Ibu Fatimah', target_type: 'sapi' } },
        { id: 2, amount: 500000, method: 'QRIS', status: 'pending', created_at: '2026-06-16T10:00:00Z', shohibul: { id: 2, name: 'Bapak Ahmad', target_type: 'sapi' } },
        { id: 3, amount: 3500000, method: 'Tunai', status: 'success', created_at: '2026-06-14T09:00:00Z', shohibul: { id: 3, name: 'Deni Setiawan', target_type: 'kambing' } }
      ],
      settings: { hargaSapi: 28000000, hargaSlotSapi: 4000000, hargaKambing: 3500000 }
    }
    isLoading.value = false
  }, 1200)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); }

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fade-in-down {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fade-in-down 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>