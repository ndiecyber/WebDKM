<template>
  <div class="space-y-6 sm:space-y-8 pb-10">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
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

    <!-- KARTU RINGKASAN -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/30 p-5 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <p class="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Menunggu Verifikasi</p>
          <p class="text-2xl font-black text-amber-700 dark:text-amber-500 mt-1">{{ pendingTransactions.length }} <span class="text-sm font-semibold">Transaksi</span></p>
        </div>
        <Clock class="w-10 h-10 text-amber-500 opacity-40" />
      </div>
      <div class="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-500/30 p-5 rounded-2xl flex justify-between items-center shadow-sm">
        <div>
          <p class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Total Dana Masuk</p>
          <p class="text-2xl font-black text-emerald-700 dark:text-emerald-500 mt-1">{{ formatRupiah(totalSuccessAmount) }}</p>
        </div>
        <CheckCircle class="w-10 h-10 text-emerald-500 opacity-40" />
      </div>
    </div>

    <!-- FILTER & PENCARIAN (Sudah dirombak menjadi Tab) -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
      
      <!-- Input Cari -->
      <div class="relative w-full lg:w-1/3">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors" 
          placeholder="Cari nama, ID, atau kode..." 
        />
      </div>

      <!-- Tab Filter Status -->
      <div class="flex gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 p-1.5 rounded-xl w-full lg:w-auto overflow-x-auto custom-scrollbar">
        <button @click="statusFilter = 'all'" :class="statusFilter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Semua Data
        </button>
        <button @click="statusFilter = 'pending'" :class="statusFilter === 'pending' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Pending
        </button>
        <button @click="statusFilter = 'success'" :class="statusFilter === 'success' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Sukses (Lunas)
        </button>
        <button @click="statusFilter = 'cancelled'" :class="statusFilter === 'cancelled' ? 'bg-white dark:bg-gray-700 shadow-sm text-red-600 dark:text-red-400 font-bold' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium'" class="px-5 py-2 text-xs rounded-lg whitespace-nowrap transition-all">
          Dibatalkan
        </button>
      </div>
    </div>

    <!-- TABEL DATA (Desain Mode Gabung) -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
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
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                  <Search class="w-8 h-8 mb-3 opacity-50" />
                  <p class="text-sm font-medium">Tidak ada data transaksi yang ditemukan.</p>
                </div>
              </td>
            </tr>
            <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ formatDate(tx.date) }}</div>
                <div class="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                  <Clock class="w-3 h-3" /> {{ tx.time }} WIB
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="shrink-0 h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-100 dark:border-emerald-800/30">
                    {{ getInitials(tx.name) }}
                  </div>
                  <div>
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ tx.name }}</div>
                    <div class="text-[10px] font-bold text-gray-400 mt-0.5 tracking-wide">{{ tx.id }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full" 
                        :class="tx.paymentMethod === 'qris' ? 'bg-blue-500' : 
                                tx.paymentMethod === 'tunai' ? 'bg-emerald-500' : 'bg-orange-500'"></span>
                  {{ tx.paymentMethod === 'qris' ? 'QRIS' : tx.paymentMethod === 'tunai' ? 'TUNAI' : 'Transfer VA' }}
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
                <!-- Tombol Aksi (Sisa ikon pensil untuk Detail, sesuai revisi) -->
                <div class="flex justify-center">
                  <button @click="openReceipt(tx)" class="text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 p-2 rounded-lg transition-colors border border-emerald-100 dark:border-emerald-800/30" title="Detail & Verifikasi">
                    <Pencil class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL DETAIL TRANSAKSI & VERIFIKASI -->
    <div v-if="selectedTx" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Header Modal -->
        <div class="p-6 text-center border-b border-dashed border-gray-300 dark:border-white/20">
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
        
        <!-- Informasi Transaksi -->
        <div class="p-6 space-y-4 bg-gray-50 dark:bg-white/5">
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">ID Transaksi</span>
            <span class="font-bold text-gray-900 dark:text-white uppercase">{{ selectedTx.id }}</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Nama Shohibul</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ selectedTx.name }}</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Waktu Setor</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ formatDate(selectedTx.date) }} - {{ selectedTx.time }} WIB</span>
          </div>
          <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
            <span class="text-gray-500 font-medium">Metode Pembayaran</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">{{ selectedTx.paymentMethod }}</span>
          </div>
        </div>

        <!-- Area Tombol Aksi (Hanya muncul jika Pending) -->
        <div class="p-5 bg-white dark:bg-gray-900 flex flex-col sm:flex-row gap-3">
          <!-- Jika Pending, munculkan opsi Verifikasi & Batal -->
          <template v-if="selectedTx.status === 'pending'">
            <button @click="verifyTransaction(selectedTx.id)" class="flex-1 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              <CheckCircle class="w-4 h-4" /> Terima & Lunas
            </button>
            <button @click="cancelTransaction(selectedTx.id)" class="py-3 px-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center" title="Tolak / Batal">
              <XCircle class="w-4 h-4" />
            </button>
          </template>
          
          <!-- Tombol Tutup (Tampil untuk semua status) -->
          <button @click="selectedTx = null" class="w-full sm:w-auto flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL INPUT SETORAN TUNAI (Tidak berubah logikanya) -->
    <div v-if="isCashModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 p-6 animate-in zoom-in-95 duration-200">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Banknote class="w-5 h-5 text-emerald-500" /> Input Setoran Tunai
        </h3>
        <form @submit.prevent="submitCashDeposit" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih Shohibul</label>
            <select v-model="cashForm.shohibulId" required class="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-emerald-500 sm:text-sm outline-none">
              <option value="" disabled>Pilih Peserta...</option>
              <option value="1">Bapak Ahmad (QUR-001)</option>
              <option value="5">Deni Setiawan (QUR-005)</option>
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
import { ref, computed } from 'vue'
// Menghapus ikon Download, menambahkan ikon Pencil
import { History, Search, CheckCircle, Clock, Banknote, XCircle, Pencil } from 'lucide-vue-next'

// STATE
const searchQuery = ref('')
const statusFilter = ref('all') // 'all' | 'pending' | 'success' | 'cancelled'
const selectedTx = ref(null)
const isCashModalOpen = ref(false)
const cashForm = ref({ shohibulId: '', amount: null })

// MOCK DATA TRANSAKSI
const mockTransactions = ref([
  { id: 'TX-1A2B', name: 'Bapak Ahmad', amount: 500000, date: '2026-06-14', time: '08:30', paymentMethod: 'va', status: 'pending' },
  { id: 'TX-3C4D', name: 'Ibu Fatimah', amount: 3000000, date: '2026-06-13', time: '14:15', paymentMethod: 'tunai', status: 'success' },
  { id: 'TX-5E6F', name: 'Keluarga Budi', amount: 1000000, date: '2026-06-12', time: '09:00', paymentMethod: 'qris', status: 'success' },
  { id: 'TX-7G8H', name: 'Haji Suryana', amount: 2000000, date: '2026-06-10', time: '16:45', paymentMethod: 'va', status: 'cancelled' },
  { id: 'TX-9I0J', name: 'Deni Setiawan', amount: 150000, date: '2026-06-09', time: '11:20', paymentMethod: 'qris', status: 'pending' }
])

// COMPUTED
const filteredTransactions = computed(() => {
  return mockTransactions.value.filter(tx => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = tx.name.toLowerCase().includes(q) || tx.id.toLowerCase().includes(q)
    let matchesStatus = true
    if (statusFilter.value !== 'all') matchesStatus = tx.status === statusFilter.value
    return matchesSearch && matchesStatus
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
})

const pendingTransactions = computed(() => mockTransactions.value.filter(tx => tx.status === 'pending'))
const totalSuccessAmount = computed(() => mockTransactions.value.filter(tx => tx.status === 'success').reduce((sum, tx) => sum + tx.amount, 0))

// METHODS
const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
const getInitials = (name) => {
  const split = name.split(' ')
  return split.length >= 2 ? (split[0][0] + split[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

// Handlers
const openReceipt = (tx) => selectedTx.value = tx
const openCashDepositModal = () => { cashForm.value = { shohibulId: '', amount: null }; isCashModalOpen.value = true; document.body.style.overflow = 'hidden' }

const verifyTransaction = (id) => {
  if (confirm("Yakin memverifikasi setoran ini secara manual? Pastikan uang sudah masuk ke rekening DKM.")) {
    const tx = mockTransactions.value.find(t => t.id === id)
    if (tx) { 
      tx.status = 'success'
      alert("Transaksi berhasil diverifikasi!") 
      selectedTx.value = null // Tutup modal otomatis setelah berhasil
    }
  }
}

const cancelTransaction = (id) => {
  if (confirm("Apakah Anda yakin ingin membatalkan transaksi pending ini?")) {
    const tx = mockTransactions.value.find(t => t.id === id)
    if (tx) { 
      tx.status = 'cancelled'
      alert("Transaksi berhasil dibatalkan.") 
      selectedTx.value = null // Tutup modal otomatis setelah dibatalkan
    }
  }
}

const submitCashDeposit = () => {
  if (cashForm.value.amount < 50000) {
    alert("Setoran tunai minimal Rp 50.000")
    return
  }
  // Simulasi nambah transaksi
  mockTransactions.value.unshift({
    id: `TX-CASH-${Math.floor(Math.random() * 1000)}`,
    name: 'Bapak Ahmad', // Hardcoded for mockup
    amount: cashForm.value.amount,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    paymentMethod: 'tunai',
    status: 'success'
  })
  
  alert("Setoran tunai berhasil dicatat dan langsung berstatus SUKSES!")
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