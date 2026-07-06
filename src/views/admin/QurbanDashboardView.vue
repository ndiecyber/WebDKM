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

        <QurbanPeriodSelector />
          
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Kartu Hijau (Total Dana) -->
      <div class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white block">
        <div class="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <Wallet class="w-24 h-24" />
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
      </div>

      <!-- Kartu Putih 1 (Total Shohibul) -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Shohibul</p>
          <div class="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
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
      </div>

      <!-- Kartu Putih 2 (Lunas) -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shohibul Lunas</p>
          <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
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
      </div>

      <!-- Kartu Putih 3 (Belum Lunas) -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum Lunas</p>
          <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
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
      </div>

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
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ formatDate(tx.created_at) }} • {{ tx.payment_method || 'Transfer' }}</p>
                </div>
              </div>
              <div class="text-right flex items-center gap-3">
                <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  + Rp {{ formatRupiahSimple(tx.amount) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Widget Rekap Target Hewan -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Target Hewan</h2>
          <RouterLink to="/admin/qurban/target" class="text-xs font-medium text-secondary hover:text-yellow-600 transition-colors">
            Lihat Semua
          </RouterLink>
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
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Sapi</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ store.animals.sapi_shohibul }} Shohibul</span>
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
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Kambing</span>
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
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { 
  Wallet, CheckCircle, TrendingUp, TrendingDown, Users, PieChart, 
  AlertCircle, Calendar, Clock, ArrowUpRight
} from 'lucide-vue-next'
import api from '@/utils/api'
import QurbanPeriodSelector from '@/components/admin/qurban/QurbanPeriodSelector.vue'
import { useQurbanStore } from '@/stores/qurban'
import { useToastStore } from '@/stores/toast'

const qurbanStore = useQurbanStore()
const toastStore = useToastStore()

const localLoading = ref(true)
const isLoading = computed(() => qurbanStore.isLoading || localLoading.value)

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



const store = ref({
  period: { id: null, name: '', deadline_date: '', days_remaining: 0 },
  summary: { total_shohibul: 0, total_collected: 0, total_target: 0, count_lunas: 0, count_belum_lunas: 0, percentage: 0 },
  animals: { sapi_shohibul: 0, kambing_shohibul: 0, sapi_groups: 0, estimated_sapi: 0 },
  pending_transactions: 0,
  recent_transactions: [],
  settings: { hargaSapi: 0, hargaSlotSapi: 0, hargaKambing: 0 }
})

const fetchDashboardData = async () => {
  localLoading.value = true
  try {
    const params = qurbanStore.selectedPeriodId ? { period_id: qurbanStore.selectedPeriodId } : {}
    const response = await api.get('/qurban/dashboard/stats', { params })
    
    if (response.data?.success) {
      const data = response.data.data
      store.value = {
        ...data,
        settings: {
          hargaSapi: (data.settings?.sapi_price_per_slot || 0) * 7,
          hargaSlotSapi: data.settings?.sapi_price_per_slot || 0,
          hargaKambing: data.settings?.kambing_price || 0
        }
      }
    }
  } catch (err) {
    if (err.response?.status !== 404) {
      toastStore.addToast('Gagal memuat data dashboard qurban', 'error')
    }
  } finally {
    localLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})

watch(() => qurbanStore.selectedPeriodId, (newVal) => {
  if (newVal) {
    fetchDashboardData()
  }
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