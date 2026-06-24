<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in pb-10">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm mb-2">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Riwayat Setoran</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola dan verifikasi semua transaksi pembayaran jamaah.</p>
      </div>
      <div class="flex gap-3 w-full sm:w-auto shrink-0">
        <button @click="openCashDepositModal" class="flex-1 sm:flex-none bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center justify-center gap-2">
          <Banknote class="w-4 h-4" />
          <span>Input Setoran Tunai</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Menunggu Verifikasi</p>
          <div class="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors">
            <Clock class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div class="relative z-10 flex flex-col justify-end">
          <div v-if="isLoading" class="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/3"></div>
          <p v-else class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{{ pendingCount }} <span class="text-sm font-medium text-gray-500">Transaksi</span></p>
        </div>
      </div>

      <div class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white group block hover:-translate-y-1 hover:shadow-emerald-900/30 transition-all duration-300">
        <div class="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-20 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
          <CheckCircle class="w-24 h-24" />
        </div>
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-emerald-100" />
        </div>
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-emerald-100">Total Dana Masuk</p>
          </div>
          <div>
            <div v-if="isLoading" class="h-9 bg-white/20 animate-pulse rounded w-3/4"></div>
            <h3 v-else class="text-3xl font-bold tracking-tight">{{ formatRupiah(totalSuccessAmount) }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center relative z-20">
      
      <div class="relative w-full lg:w-1/3">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors" 
          placeholder="Cari nama, ID..." 
        />
      </div>

      <div class="flex gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-xl w-full lg:w-auto overflow-x-auto custom-scrollbar">
        <button @click="changeFilter('all')" :class="statusFilter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Semua Data
        </button>
        <button @click="changeFilter('pending')" :class="statusFilter === 'pending' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Pending
        </button>
        <button @click="changeFilter('success')" :class="statusFilter === 'success' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Sukses (Lunas)
        </button>
        <button @click="changeFilter('cancelled')" :class="statusFilter === 'cancelled' ? 'bg-white dark:bg-gray-700 shadow-sm text-red-600 dark:text-red-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Dibatalkan
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl shadow-sm overflow-hidden relative z-10">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th class="px-6 py-4 font-bold">Waktu Transaksi</th>
              <th class="px-6 py-4 font-bold">Shohibul & ID</th>
              <th class="px-6 py-4 font-bold">Metode</th>
              <th class="px-6 py-4 font-bold text-right">Nominal (Rp)</th>
              <th class="px-6 py-4 font-bold text-center">Status</th>
              <th class="px-6 py-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            
            <template v-if="isLoading">
              <tr v-for="i in 5" :key="i" class="animate-pulse">
                <td class="px-6 py-5"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                <td class="px-6 py-5 flex items-center gap-3"><div class="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full"></div><div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div></div></td>
                <td class="px-6 py-5"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                <td class="px-6 py-5 text-right"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div></td>
                <td class="px-6 py-5 text-center"><div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div></td>
                <td class="px-6 py-5 text-center"><div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div></td>
              </tr>
            </template>

            <tr v-else-if="filteredTransactions.length === 0">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                  <Search class="w-8 h-8 mb-3 opacity-50" />
                  <p class="text-sm font-medium">Tidak ada data transaksi yang ditemukan.</p>
                </div>
              </td>
            </tr>

            <tr v-else v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ formatDate(tx.created_at) }}</div>
                <div class="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                  <Clock class="w-3 h-3" /> {{ formatTime(tx.created_at) }} WIB
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs border"
                       :class="tx.shohibul.target_type === 'sapi' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30' : 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30'">
                    {{ getInitials(tx.shohibul.name) }}
                  </div>
                  <div>
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ tx.shohibul.name }}</div>
                    <div class="text-[10px] font-bold text-gray-400 mt-0.5 tracking-wide uppercase">{{ tx.id }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full" 
                        :class="tx.payment_method === 'qris' ? 'bg-blue-500' : 
                                tx.payment_method === 'tunai' ? 'bg-emerald-500' : 'bg-orange-500'"></span>
                  {{ tx.payment_method }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="text-sm font-black text-gray-900 dark:text-white">{{ formatRupiah(tx.amount) }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span v-if="tx.status === 'success'" class="px-3 py-1 inline-flex text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 uppercase tracking-wider">
                  Sukses
                </span>
                <span v-else-if="tx.status === 'pending'" class="px-3 py-1 inline-flex text-[10px] font-bold rounded-md bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 uppercase tracking-wider animate-pulse">
                  Pending
                </span>
                <span v-else class="px-3 py-1 inline-flex text-[10px] font-bold rounded-md bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 uppercase tracking-wider">
                  Batal
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex justify-center">
                  <button @click="openReceipt(tx)" class="text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-emerald-900/20 p-2 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Detail & Verifikasi">
                    <Pencil class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!isLoading && paginatedData.total > paginatedData.per_page" class="p-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500">
          <p>Menampilkan {{ paginatedData.from }} - {{ paginatedData.to }} dari {{ paginatedData.total }} transaksi</p>
          <div class="flex gap-2">
            <button :disabled="!paginatedData.prev_page_url" class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">Sebelumnnya</button>
            <button :disabled="!paginatedData.next_page_url" class="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">Selanjutnya</button>
          </div>
        </div>

      </div>
    </div>

    <div v-if="selectedTx" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        <div class="p-6 text-center border-b border-dashed border-gray-300 dark:border-white/20 relative">
          <button @click="selectedTx = null" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><XCircle class="w-6 h-6" /></button>

          <div class="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3" 
               :class="selectedTx.status === 'success' ? 'bg-emerald-100 text-emerald-500' : 
                       selectedTx.status === 'pending' ? 'bg-amber-100 text-amber-500' : 'bg-red-100 text-red-500'">
            <CheckCircle v-if="selectedTx.status === 'success'" class="w-8 h-8" />
            <Clock v-else-if="selectedTx.status === 'pending'" class="w-8 h-8" />
            <XCircle v-else class="w-8 h-8" />
          </div>
          <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {{ selectedTx.status === 'success' ? 'Pembayaran Sukses' : selectedTx.status === 'pending' ? 'Menunggu Verifikasi Admin' : 'Dibatalkan' }}
          </h3>
          <p class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ formatRupiah(selectedTx.amount) }}</p>
        </div>
        
        <div class="p-6 space-y-4 bg-gray-50 dark:bg-white/5">
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">ID Transaksi</span>
            <span class="font-bold text-gray-900 dark:text-white uppercase">{{ selectedTx.id }}</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Nama Shohibul</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ selectedTx.shohibul.name }}</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Waktu Setor</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ formatDate(selectedTx.created_at) }} - {{ formatTime(selectedTx.created_at) }} WIB</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Metode Pembayaran</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">{{ selectedTx.payment_method }}</span>
          </div>
        </div>

        <div class="p-5 bg-white dark:bg-gray-900 flex flex-col sm:flex-row gap-3">
          <template v-if="selectedTx.status === 'pending'">
            <button @click="verifyTransaction(selectedTx.id)" class="flex-1 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              <CheckCircle class="w-4 h-4" /> Terima & Lunas
            </button>
            <button @click="cancelTransaction(selectedTx.id)" class="py-3 px-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2" title="Tolak / Batal">
            <XCircle class="w-4 h-4" /> Batal
          </button>
          </template>
          <template v-else>
             <button @click="selectedTx = null" class="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Tutup Struk
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-if="isCashModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 p-6 animate-in zoom-in-95 duration-200">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Banknote class="w-5 h-5 text-emerald-500" /> Input Setoran Tunai
        </h3>
        <form @submit.prevent="submitCashDeposit" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih Shohibul (ID - Nama)</label>
            <select v-model="cashForm.shohibul_id" required class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-emerald-500 sm:text-sm outline-none">
              <option value="" disabled>Pilih Peserta Qurban...</option>
              <option value="1">QUR-001 - Bapak Ahmad</option>
              <option value="2">QUR-005 - Deni Setiawan</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nominal Tunai (Rp)</label>
            <input v-model.number="cashForm.amount" type="number" required placeholder="Contoh: 500000" class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-emerald-500 sm:text-sm outline-none">
          </div>
          <div class="pt-2 flex gap-3">
            <button type="button" @click="isCashModalOpen = false" class="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl transition-colors">Batal</button>
            <button type="submit" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">Simpan Transaksi</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { History, Search, CheckCircle, Clock, Banknote, XCircle, Pencil, ArrowRight } from 'lucide-vue-next'

// STATE (Disiapkan untuk menerima Response API)
const isLoading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all') // 'all' | 'pending' | 'success' | 'cancelled'
const selectedTx = ref(null)

// Modal State
const isCashModalOpen = ref(false)
const cashForm = ref({ shohibul_id: '', amount: null })

// BENTUK DATA PAGINASI (Sesuai Respons API -> paginate())
const paginatedData = ref({
  current_page: 1,
  data: [],
  from: 1,
  to: 5,
  total: 5,
  per_page: 20,
  next_page_url: null,
  prev_page_url: null
})

// MOCK DATA FETCH (Mensimulasikan respons JSON dari Pandu)
onMounted(() => {
  setTimeout(() => {
    paginatedData.value.data = [
      { id: 'TX-1A2B', amount: 500000, created_at: '2026-06-24T08:30:00Z', payment_method: 'qris', status: 'pending', shohibul: { id: 1, name: 'Bapak Ahmad', target_type: 'sapi' } },
      { id: 'TX-3C4D', amount: 3000000, created_at: '2026-06-23T14:15:00Z', payment_method: 'tunai', status: 'success', shohibul: { id: 2, name: 'Ibu Fatimah', target_type: 'sapi' } },
      { id: 'TX-5E6F', amount: 1000000, created_at: '2026-06-22T09:00:00Z', payment_method: 'transfer bank', status: 'success', shohibul: { id: 3, name: 'Keluarga Budi', target_type: 'sapi' } },
      { id: 'TX-7G8H', amount: 2000000, created_at: '2026-06-20T16:45:00Z', payment_method: 'va bsi', status: 'cancelled', shohibul: { id: 4, name: 'Haji Suryana', target_type: 'sapi' } },
      { id: 'TX-9I0J', amount: 3500000, created_at: '2026-06-19T11:20:00Z', payment_method: 'qris', status: 'pending', shohibul: { id: 5, name: 'Deni Setiawan', target_type: 'kambing' } }
    ]
    isLoading.value = false
  }, 1000)
})

// FILTER & PENCARIAN (Lokal, nantinya akan dikirim sebagai query parameter ke API)
const filteredTransactions = computed(() => {
  if (!paginatedData.value.data) return []
  return paginatedData.value.data.filter(tx => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = tx.shohibul.name.toLowerCase().includes(q) || tx.id.toLowerCase().includes(q)
    const matchesStatus = statusFilter.value === 'all' ? true : tx.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const pendingCount = computed(() => paginatedData.value.data.filter(tx => tx.status === 'pending').length)
const totalSuccessAmount = computed(() => paginatedData.value.data.filter(tx => tx.status === 'success').reduce((sum, tx) => sum + tx.amount, 0))

// METHODS
const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
const formatTime = (dateStr) => new Date(dateStr).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
const getInitials = (name) => {
  const split = name.split(' ')
  return split.length >= 2 ? (split[0][0] + split[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

// HANDLERS
const changeFilter = (status) => {
  statusFilter.value = status
  // Jika API sudah tersambung, panggil Axios di sini dengan parameter status:
  // fetchTransactions(status)
}

const openReceipt = (tx) => selectedTx.value = tx
const openCashDepositModal = () => { cashForm.value = { shohibul_id: '', amount: null }; isCashModalOpen.value = true; document.body.style.overflow = 'hidden' }

const verifyTransaction = (id) => {
  if (confirm("Yakin memverifikasi setoran ini secara manual? Pastikan uang sudah masuk ke rekening DKM.")) {
    const tx = paginatedData.value.data.find(t => t.id === id)
    if (tx) { 
      tx.status = 'success'
      alert("Transaksi berhasil diverifikasi!") 
      selectedTx.value = null
    }
  }
}

const cancelTransaction = (id) => {
  if (confirm("Apakah Anda yakin ingin membatalkan transaksi pending ini? Aksi ini sesuai fungsi 'cancel' di backend.")) {
    const tx = paginatedData.value.data.find(t => t.id === id)
    if (tx) { 
      tx.status = 'cancelled'
      alert("Transaksi berhasil dibatalkan.") 
      selectedTx.value = null
    }
  }
}

const submitCashDeposit = () => {
  if (cashForm.value.amount <= 0) {
    alert("Nominal setoran tunai tidak valid.")
    return
  }
  // Simulasi (Fungsi 'manualDeposit' di backend)
  paginatedData.value.data.unshift({
    id: `TX-CASH-${Math.floor(Math.random() * 1000)}`,
    amount: cashForm.value.amount,
    created_at: new Date().toISOString(),
    payment_method: 'tunai',
    status: 'success',
    shohibul: { id: cashForm.value.shohibul_id, name: 'Bapak Ahmad', target_type: 'sapi' } // Hardcoded untuk Mockup
  })
  
  alert("Setoran tunai manual berhasil dicatat (Sesuai alur 'manualDeposit' Backend)!")
  isCashModalOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 4px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
</style>