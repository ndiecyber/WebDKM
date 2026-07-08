<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Kotak Sampah</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola data keuangan yang telah dihapus (Recycle Bin)</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
      <div class="flex border-b border-gray-200 dark:border-white/10">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="flex-1 py-3 px-4 text-sm font-medium text-center transition-colors relative"
          :class="activeTab === tab.id ? 'text-secondary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'">
          {{ tab.name }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"></div>
        </button>
      </div>

      <!-- Table Content -->
      <div class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th class="px-6 py-4 font-medium">Nama / Deskripsi</th>
                <th class="px-6 py-4 font-medium">Tipe / Kategori</th>
                <th class="px-6 py-4 font-medium">Dihapus Pada</th>
                <th class="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-white/10">
              <tr v-if="loading" class="bg-white dark:bg-gray-900">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    <span>Memuat data...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="trashedItems.length === 0" class="bg-white dark:bg-gray-900">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data terhapus di kategori ini.
                </td>
              </tr>
              <tr v-else v-for="item in trashedItems" :key="item.id" class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="font-medium text-gray-900 dark:text-white">{{ getItemName(item) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-xs">{{ getItemDesc(item) }}</div>
                </td>
                <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {{ getItemType(item) }}
                </td>
                <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {{ formatDate(item.deleted_at) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="restoreItem(item.id)" class="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors">
                      Pulihkan
                    </button>
                    <button @click="confirmForceDelete(item)" class="px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors">
                      Hapus Permanen
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="pagination.lastPage > 1" class="px-6 py-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">Halaman {{ pagination.currentPage }} dari {{ pagination.lastPage }}</span>
          <div class="flex gap-2">
            <button @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1" class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">Sebelumnya</button>
            <button @click="changePage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.lastPage" class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus Permanen -->
    <div v-if="itemToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="itemToDelete = null"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
            <AlertTriangle class="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 class="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Hapus Permanen?</h3>
          <p class="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Apakah Anda yakin ingin menghapus data <b>{{ getItemName(itemToDelete) }}</b> secara permanen?
            <br/><br/>
            <span class="text-rose-500 font-medium">PERINGATAN: Tindakan ini tidak dapat dibatalkan dan data akan hilang selamanya dari database.</span>
          </p>
          <div class="flex gap-3">
            <button @click="itemToDelete = null" class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
            <button @click="executeForceDelete" :disabled="isDeleting" class="flex-1 px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors disabled:opacity-70">
              {{ isDeleting ? 'Menghapus...' : 'Ya, Hapus Permanen' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useKeuanganStore } from '@/stores/keuangan'
import { AlertTriangle } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()

const tabs = [
  { id: 'transactions', name: 'Transaksi' },
  { id: 'bank-kas', name: 'Rekening / Kas' },
  { id: 'programs', name: 'Program' },
  { id: 'categories', name: 'Kategori' },
]

const activeTab = ref('transactions')
const trashedItems = ref([])
const loading = ref(false)
const pagination = ref({ currentPage: 1, lastPage: 1 })

const itemToDelete = ref(null)
const isDeleting = ref(false)

const loadData = async (page = 1) => {
  loading.value = true
  try {
    const res = await keuanganStore.fetchTrashed(activeTab.value, { page })
    trashedItems.value = res.items
    pagination.value = { currentPage: res.currentPage, lastPage: res.lastPage }
  } catch (err) {
    toast.showToast('Gagal memuat data sampah', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

watch(activeTab, () => {
  loadData(1)
})

const changePage = (page) => {
  if (page > 0 && page <= pagination.value.lastPage) {
    loadData(page)
  }
}

const getItemName = (item) => {
  return item.nama || item.name || item.nomor_transaksi || 'Tanpa Nama'
}

const getItemDesc = (item) => {
  return item.deskripsi || item.nomor_rekening || item.nomor_transaksi || '-'
}

const getItemType = (item) => {
  if (activeTab.value === 'transactions') return item.tipe === 'pemasukan' ? 'Pemasukan' : item.tipe === 'pengeluaran' ? 'Pengeluaran' : 'Transfer'
  if (activeTab.value === 'bank-kas') return item.tipe
  if (activeTab.value === 'categories') return item.tipe === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'
  if (activeTab.value === 'programs') return item.status === 'aktif' ? 'Aktif' : 'Selesai'
  return '-'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const restoreItem = async (id) => {
  try {
    await keuanganStore.restoreTrashed(activeTab.value, id)
    toast.showToast('Data berhasil dipulihkan', 'success')
    loadData(pagination.value.currentPage)
    
    // Refresh main store data in background
    if (activeTab.value === 'transactions') keuanganStore.fetchTransactions()
    if (activeTab.value === 'bank-kas') keuanganStore.fetchBankKas()
    if (activeTab.value === 'programs') keuanganStore.fetchPrograms()
    if (activeTab.value === 'categories') keuanganStore.fetchCategories()
  } catch (err) {
    toast.showToast('Gagal memulihkan data', 'error')
  }
}

const confirmForceDelete = (item) => {
  itemToDelete.value = item
}

const executeForceDelete = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    await keuanganStore.forceDeleteTrashed(activeTab.value, itemToDelete.value.id)
    toast.showToast('Data berhasil dihapus permanen', 'success')
    itemToDelete.value = null
    loadData(pagination.value.currentPage)
  } catch (err) {
    toast.showToast('Gagal menghapus data', 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
