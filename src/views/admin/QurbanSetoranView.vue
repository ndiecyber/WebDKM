<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <History class="w-6 h-6 text-emerald-500" />
          Riwayat Setoran
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Verifikasi dan pantau semua aliran dana yang masuk ke kas Qurban.</p>
      </div>
      <div class="flex gap-3">
        <div class="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 px-4 py-2 rounded-xl text-right">
          <p class="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Menunggu Verifikasi</p>
          <p class="text-lg font-black text-amber-700 dark:text-amber-500">{{ pendingTransactions.length }} Transaksi</p>
        </div>
        <div class="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-4 py-2 rounded-xl text-right hidden sm:block">
          <p class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Total Dana Masuk</p>
          <p class="text-lg font-black text-emerald-700 dark:text-emerald-500">{{ formatRupiah(totalSuccessAmount) }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
      
      <div class="relative w-full sm:w-1/3">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" 
          placeholder="Cari nama, ID, atau kode..." 
        />
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <select v-model="statusFilter" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer">
          <option value="all">Semua Status</option>
          <option value="pending">Menunggu Verifikasi</option>
          <option value="success">Sukses (Lunas)</option>
        </select>
        
        <button class="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl border border-gray-200 dark:border-white/10 transition-colors flex items-center gap-2">
          <Download class="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-white/5">
          <thead class="bg-gray-50 dark:bg-white/5">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tgl & Waktu</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID & Nama Shohibul</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metode</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nominal</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-white/5">
            <tr v-if="filteredTransactions.length === 0">
              <td colspan="6" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
                Tidak ada data setoran ditemukan.
              </td>
            </tr>
            <tr v-for="tx in filteredTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ formatDate(tx.date) }}</div>
                <div class="text-xs text-gray-500 font-medium">{{ tx.time }}</div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-200 dark:border-gray-700">
                    {{ getInitials(tx.name) }}
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ tx.name }}</div>
                    <div class="text-xs text-gray-500 flex items-center gap-1">
                      <span class="uppercase tracking-wider font-semibold">{{ tx.id }}</span>
                      <span>•</span>
                      <span class="bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{{ tx.code }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full" :class="tx.paymentMethod === 'qris' ? 'bg-blue-500' : 'bg-orange-500'"></span>
                  {{ tx.paymentMethod === 'qris' ? 'QRIS' : 'Transfer VA' }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="text-sm font-black text-gray-900 dark:text-white">{{ formatRupiah(tx.amount) }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span v-if="tx.status === 'success'" class="px-3 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle class="w-3 h-3 mr-1" /> Sukses
                </span>
                <span v-else class="px-3 py-1 inline-flex text-[10px] leading-4 font-bold rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 uppercase tracking-wider border border-amber-200 dark:border-amber-800/50">
                  <Clock class="w-3 h-3 mr-1" /> Pending
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button v-if="tx.status === 'pending'" @click="verifyTransaction(tx.id)" class="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors mr-2">
                  Verifikasi
                </button>
                <button @click="openReceipt(tx)" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center" title="Lihat Struk">
                  <FileText class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Menampilkan <span class="font-bold text-gray-900 dark:text-white">{{ filteredTransactions.length }}</span> dari {{ mockTransactions.length }} transaksi.
        </p>
        <div class="flex gap-1">
          <button class="px-2 py-1 border border-gray-300 dark:border-white/10 rounded text-xs bg-white dark:bg-gray-800 text-gray-500 disabled:opacity-50" disabled>Prev</button>
          <button class="px-2 py-1 border border-gray-300 dark:border-white/10 rounded text-xs bg-white dark:bg-gray-800 text-gray-500 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>

    <div v-if="selectedTx" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        <div class="p-6 text-center border-b border-dashed border-gray-300 dark:border-white/20">
          <div class="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3" 
               :class="selectedTx.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'">
            <CheckCircle v-if="selectedTx.status === 'success'" class="w-8 h-8" />
            <Clock v-else class="w-8 h-8" />
          </div>
          <h3 class="text-sm font-bold text-gray-500 uppercase tracking-widest">{{ selectedTx.status === 'success' ? 'Pembayaran Sukses' : 'Menunggu Verifikasi' }}</h3>
          <p class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ formatRupiah(selectedTx.amount) }}</p>
        </div>
        
        <div class="p-6 space-y-3 bg-gray-50 dark:bg-white/5">
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">ID Transaksi</span>
            <span class="font-bold text-gray-900 dark:text-white uppercase">{{ selectedTx.id }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">Shohibul</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ selectedTx.name }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">Waktu Pembayaran</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ formatDate(selectedTx.date) }} {{ selectedTx.time }}</span>
          </div>
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">Metode</span>
            <span class="font-bold text-gray-900 dark:text-white uppercase">{{ selectedTx.paymentMethod }}</span>
          </div>
        </div>

        <div class="p-6 pt-0 bg-gray-50 dark:bg-white/5 flex gap-3">
          <button @click="selectedTx = null" class="flex-1 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { History, Search, Download, CheckCircle, Clock, FileText } from 'lucide-vue-next'

// STATE
const searchQuery = ref('')
const statusFilter = ref('all') // 'all' | 'pending' | 'success'
const selectedTx = ref(null)

// MOCK DATA TRANSAKSI
const mockTransactions = ref([
  { id: 'tx-a1b2c', name: 'Bapak Ahmad', code: 'QUR-001', amount: 500000, date: '2026-06-14', time: '08:30 WIB', paymentMethod: 'va', status: 'pending' },
  { id: 'tx-d3e4f', name: 'Ibu Fatimah', code: 'QUR-002', amount: 3000000, date: '2026-06-13', time: '14:15 WIB', paymentMethod: 'qris', status: 'success' },
  { id: 'tx-g5h6i', name: 'Keluarga Budi', code: 'QUR-003', amount: 1000000, date: '2026-06-12', time: '09:00 WIB', paymentMethod: 'va', status: 'success' },
  { id: 'tx-j7k8l', name: 'Haji Suryana', code: 'QUR-004', amount: 2000000, date: '2026-06-10', time: '16:45 WIB', paymentMethod: 'qris', status: 'success' },
  { id: 'tx-m9n0o', name: 'Deni Setiawan', code: 'QUR-005', amount: 150000, date: '2026-06-09', time: '11:20 WIB', paymentMethod: 'va', status: 'pending' },
  { id: 'tx-p1q2r', name: 'Deni Setiawan', code: 'QUR-005', amount: 850000, date: '2026-06-01', time: '10:00 WIB', paymentMethod: 'qris', status: 'success' },
])

// COMPUTED
const filteredTransactions = computed(() => {
  return mockTransactions.value.filter(tx => {
    // Search Filter
    const matchesSearch = tx.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          tx.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          tx.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Status Filter
    let matchesStatus = true
    if (statusFilter.value !== 'all') {
      matchesStatus = tx.status === statusFilter.value
    }
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => new Date(b.date) - new Date(a.date)) // Urutkan terbaru
})

const pendingTransactions = computed(() => mockTransactions.value.filter(tx => tx.status === 'pending'))

const totalSuccessAmount = computed(() => {
  return mockTransactions.value
    .filter(tx => tx.status === 'success')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

// METHODS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) return (split[0][0] + split[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const openReceipt = (tx) => {
  selectedTx.value = tx
}

const verifyTransaction = (id) => {
  const isConfirmed = confirm("Apakah Anda yakin dana setoran ini telah masuk ke rekening Kas Masjid?")
  if (isConfirmed) {
    const index = mockTransactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      mockTransactions.value[index].status = 'success'
      // Di dunia nyata, ini akan memanggil fungsi Axios/Fetch ke Laravel Backend
      alert("Transaksi berhasil diverifikasi!")
    }
  }
}
</script>