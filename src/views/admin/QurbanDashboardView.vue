<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in pb-8">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Tabungan Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ringkasan performa finansial dan progres shohibul qurban tahun ini.
        </p>
      </div>
      
      <div class="flex items-center gap-3">
        <span class="hidden sm:flex text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg font-bold items-center ring-1 ring-red-100 dark:ring-red-900/30">
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
          
          <div v-if="showPeriodeDropdown" class="absolute right-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-fade-in-down max-h-60 overflow-y-auto custom-scrollbar">
            <button @click="changePeriode(periodes[0])" class="w-full text-left px-4 py-2 text-sm bg-emerald-50 text-emerald-600 font-medium transition-colors">
              1447 H / 2026 M
            </button>
            <button @click="changePeriode(periodes[1])" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              1446 H / 2025 M (Arsip)
            </button>
          </div>
          <div v-if="showPeriodeDropdown" @click="showPeriodeDropdown = false" class="fixed inset-0 z-10"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <div class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white group block hover:-translate-y-1 hover:shadow-emerald-900/30 transition-all duration-300 cursor-pointer">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
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

      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md group block hover:-translate-y-1 hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden">
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Shohibul</p>
            <div class="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
              <Users class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
            <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.total_shohibul }}</h3>
            
            <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
            <p v-else class="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1 font-medium">
              <ArrowUpRight class="w-4 h-4" /> Pencapaian {{ store.summary.percentage }}%
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md group block hover:-translate-y-1 hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden">
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Shohibul Lunas</p>
            <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
              <CheckCircle class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
            <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.count_lunas }}</h3>
            
            <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
            <p v-else class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
              <TrendingUp class="w-4 h-4" /> Dari total target
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md group block hover:-translate-y-1 hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden">
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Belum Lunas</p>
            <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
              <AlertCircle class="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div>
            <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3 mb-2"></div>
            <h3 v-else class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{{ store.summary.count_belum_lunas }}</h3>
            
            <div v-if="isLoading" class="h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mt-2"></div>
            <p v-else class="text-sm text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1 font-medium">
              <TrendingDown class="w-4 h-4" /> Butuh follow-up
            </p>
          </div>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-base font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h2>
              <span v-if="!isLoading && store.pending_transactions > 0" class="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold rounded">
                {{ store.pending_transactions }} Pending
              </span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Daftar setoran masuk terbaru dari jamaah.</p>
          </div>
          <RouterLink to="/admin/qurban-setoran" class="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 transition-colors">
            Lihat Semua
          </RouterLink>
        </div>
        
        <div class="p-2 flex-1 overflow-x-auto">
          <div v-if="isLoading" class="p-4 space-y-4">
            <div v-for="i in 3" :key="i" class="flex justify-between items-center animate-pulse">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
            </div>
          </div>

          <div v-else-if="store.recent_transactions.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500">
            <CheckCircle class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p class="text-sm font-medium">Belum ada transaksi.</p>
          </div>

          <table v-else class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                <th class="pb-3 font-semibold px-4 pt-2">ID / Shohibul</th>
                <th class="pb-3 font-semibold px-4 pt-2">Tipe Hewan</th>
                <th class="pb-3 font-semibold px-4 pt-2 text-right">Nominal</th>
                <th class="pb-3 font-semibold px-4 pt-2 text-center">Waktu Setor</th>
                <th class="pb-3 font-semibold px-4 pt-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="tx in store.recent_transactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td class="p-4">
                  <span class="font-bold text-gray-900 dark:text-white block">{{ tx.shohibul?.name || 'Hamba Allah' }}</span>
                  <span class="text-xs text-gray-400 font-mono">{{ formatDate(tx.created_at) }} • {{ tx.method || 'Transfer' }}</span>
                </td>
                <td class="p-4 text-center">
                  <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded capitalize"
                    :class="tx.shohibul?.target_type === 'sapi' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'">
                    {{ tx.shohibul?.target_type }}
                  </span>
                </td>
                <td class="p-4 font-bold text-gray-900 dark:text-white text-right">{{ formatRupiah(tx.amount) }}</td>
                <td class="p-4 text-center">
                  <span v-if="tx.status === 'success'" class="inline-block bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-semibold text-[10px] uppercase">
                    Sukses
                  </span>
                  <span v-else-if="tx.status === 'pending'" class="inline-block bg-amber-50 text-amber-600 px-2 py-1 rounded font-semibold text-[10px] uppercase">
                    Pending
                  </span>
                  <span v-else class="inline-block bg-red-50 text-red-600 px-2 py-1 rounded font-semibold text-[10px] uppercase">
                    Batal
                  </span>
                </td>
                <td class="p-4 text-center">
                  <button @click="verifyClick(tx.id)" class="inline-flex p-2 bg-gray-50 dark:bg-white/5 hover:bg-emerald-500 hover:text-white text-gray-400 rounded-lg transition-all border border-gray-200 dark:border-white/10 active:scale-90" title="Verifikasi / Detail">
                    <Pencil class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Rekap Target Hewan</h2>
          <button @click="isSimulasiOpen = true" class="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
            <Plus class="w-3 h-3" /> Buat Grup
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div v-if="isLoading" class="space-y-4">
            <div class="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
            <div class="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
          </div>

          <template v-else>
            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center text-lg">🐄</div>
                <div>
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Target Sapi</span>
                  <span class="block text-xs text-gray-500 mt-0.5">{{ store.animals.sapi_groups }} Grup Penuh</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-lg font-black text-gray-900 dark:text-white">{{ store.animals.estimated_sapi }} <span class="text-xs font-normal text-gray-500">Ekor</span></span>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 flex items-center justify-center text-lg">🐐</div>
                <div>
                  <span class="block text-sm font-bold text-gray-900 dark:text-white">Target Kambing</span>
                  <span class="block text-xs text-gray-500 mt-0.5">Mandiri</span>
                </div>
              </div>
              <div class="text-right">
                <span class="block text-lg font-black text-gray-900 dark:text-white">{{ store.animals.kambing_shohibul }} <span class="text-xs font-normal text-gray-500">Ekor</span></span>
              </div>
            </div>
            
            <div class="pt-4 mt-2 border-t border-gray-200 dark:border-white/10">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Master Harga Periode Ini</p>
              <div class="space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Sapi (Utuh)</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.settings?.hargaSapi || 0) }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Sapi (Per Slot)</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.settings?.hargaSlotSapi || 0) }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">Kambing</span>
                  <span class="font-bold text-gray-700 dark:text-gray-300">{{ formatRupiah(store.settings?.hargaKambing || 0) }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

    </div>

    <div v-if="isSimulasiOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 animate-fade-in-down">
        <div class="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users class="w-5 h-5 text-emerald-500" /> Simulasi Grup Sapi
            </h3>
          </div>
          <button @click="isSimulasiOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        <div class="p-6 bg-gray-50/50 dark:bg-black/20 h-[400px] overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div v-for="n in store.animals.sapi_groups || 3" :key="n" class="bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 rounded-xl p-4 shadow-sm hover:ring-emerald-500 transition-colors cursor-pointer group">
              <div class="flex justify-between items-start mb-2">
                <span class="text-2xl group-hover:scale-110 transition-transform origin-left">🐄</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">7/7 Penuh</span>
              </div>
              <h4 class="font-bold text-sm text-gray-900 dark:text-white">Kelompok Sapi {{ n }}</h4>
            </div>
            
            <button class="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-emerald-600 transition-all min-h-[100px]">
              <Plus class="w-8 h-8" />
              <span class="text-xs font-bold">Buat Sapi Baru</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Wallet, CheckCircle, TrendingUp, TrendingDown, Users, PieChart, 
  AlertCircle, Calendar, Clock, ChevronDown, Plus, Pencil, ArrowUpRight, X,
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
  alert(`Memverifikasi transaksi ${id}... (Memicu logika verifikasi backend)`)
}

// STRUKTUR DATA SINKRON DENGAN BACKEND
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