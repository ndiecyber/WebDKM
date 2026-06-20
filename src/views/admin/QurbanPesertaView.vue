<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Data Peserta Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola data pendaftar shohibul qurban tahun ini.</p>
      </div>
      <button @click="openAddModal" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 shrink-0">
        <Plus class="w-4 h-4" />
        <span>Tambah Peserta Manual</span>
      </button>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors" 
          placeholder="Cari nama, no. HP, atau kode peserta..." 
        />
      </div>

      <div class="flex gap-2 overflow-x-auto hide-scrollbar">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border"
          :class="activeFilter === filter.value 
            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' 
            : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'"
        >
          <span v-if="filter.icon" class="mr-1">{{ filter.icon }}</span>
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-white/5">
          <thead class="bg-gray-50 dark:bg-white/5">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Identitas Shohibul</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kontak & Alamat</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Hewan</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Terkumpul</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-white/5">
            <tr v-if="filteredPeserta.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-sm">
                Data peserta tidak ditemukan.
              </td>
            </tr>
            <tr v-for="peserta in filteredPeserta" :key="peserta.id" class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="shrink-0 h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm border border-emerald-200 dark:border-emerald-800">
                    {{ getInitials(peserta.name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ peserta.name }}</div>
                    <div class="text-xs text-gray-500">{{ peserta.code }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Phone class="w-3 h-3 text-gray-400" /> {{ peserta.phone }}
                </div>
                <div class="text-xs text-gray-500 flex items-center gap-1.5 truncate max-w-[200px]" :title="peserta.address">
                  <MapPin class="w-3 h-3 text-gray-400 shrink-0" /> <span class="truncate">{{ peserta.address }}</span>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white flex items-center gap-1.5 mb-1 font-semibold">
                  <span>{{ peserta.type === 'sapi' ? '🐄' : '🐐' }}</span>
                  <span class="capitalize">{{ peserta.type }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ peserta.animalGroup }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex justify-between items-end mb-1">
                  <span class="text-sm font-bold text-gray-900 dark:text-white">{{ formatRupiah(peserta.collected) }}</span>
                  <span class="px-2 py-0.5 inline-flex text-[9px] leading-4 font-bold rounded-md uppercase tracking-wider"
                        :class="peserta.collected >= peserta.target ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'">
                    {{ peserta.collected >= peserta.target ? 'Lunas' : 'Proses' }}
                  </span>
                </div>
                <div class="w-full max-w-[150px] h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500"
                       :class="peserta.collected >= peserta.target ? 'bg-emerald-500' : 'bg-blue-500'"
                       :style="{ width: getPercentage(peserta) + '%' }">
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openDetails(peserta)" class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 p-2 rounded-lg transition-colors" title="Lihat Detail">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button @click="openEditModal(peserta)" class="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 p-2 rounded-lg transition-colors" title="Edit Peserta">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(peserta)" class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-2 rounded-lg transition-colors" title="Hapus Peserta">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
        <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Menampilkan <span class="font-bold text-gray-900 dark:text-white">{{ filteredPeserta.length }}</span> dari {{ mockPeserta.length }} peserta.
        </p>
      </div>
    </div>

    <div v-if="selectedPeserta && modalType === 'detail'" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <User class="w-5 h-5 text-emerald-500" />
            Detail Shohibul
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 transition-colors p-1">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold text-xl border border-emerald-200">
              {{ getInitials(selectedPeserta.name) }}
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedPeserta.name }}</h4>
              <div class="flex items-center gap-2 mt-1">
                <span class="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-[10px] text-gray-600 dark:text-gray-400 font-bold rounded uppercase border border-gray-200">
                  {{ selectedPeserta.code }}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 rounded-xl space-y-3">
            <div class="flex items-start gap-3">
              <Phone class="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Nomor HP/WA</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedPeserta.phone }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Alamat Lengkap</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedPeserta.address }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-white/5 border border-gray-100 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Hewan Target</span>
              <span class="text-lg font-black text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
                {{ selectedPeserta.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </span>
              <span class="text-[10px] text-gray-500 block mt-1">{{ selectedPeserta.animalGroup }}</span>
            </div>
            <div class="bg-gray-50 dark:bg-white/5 border border-gray-100 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Status Keuangan</span>
              <span class="text-lg font-black text-amber-600 flex items-center justify-center">
                {{ formatRupiah(Math.max(0, selectedPeserta.target - selectedPeserta.collected)) }}
              </span>
              <span class="text-[10px] text-gray-500 block mt-1">Sisa Kekurangan</span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">Tutup</button>
        </div>
      </div>
    </div>

    <div v-if="(modalType === 'add' || modalType === 'edit')" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <component :is="modalType === 'add' ? Plus : Edit2" class="w-5 h-5 text-emerald-500" />
            {{ modalType === 'add' ? 'Tambah Shohibul Manual' : 'Edit Data Shohibul' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 transition-colors p-1"><X class="w-5 h-5" /></button>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
            <input v-model="formData.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp / HP</label>
            <input v-model="formData.phone" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap</label>
            <textarea v-model="formData.address" required rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pilihan Hewan</label>
              <select v-model="formData.type" class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="sapi">🐄 Sapi (Kelompok)</option>
                <option value="kambing">🐐 Kambing (Mandiri)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Pilihan Kelompok (Opsional)</label>
              <select v-model="formData.animalGroup" :disabled="formData.type === 'kambing'" class="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:bg-gray-100">
                <option value="Otomatis">Pilih Otomatis</option>
                <option value="Sapi A">Sapi A</option>
                <option value="Sapi B">Sapi B</option>
              </select>
            </div>
          </div>
          <div v-if="modalType === 'add'" class="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-2">
            <p class="text-xs text-amber-700 font-medium">Catatan: Pendaftaran manual akan memiliki status Saldo Terkumpul Rp 0. Gunakan menu <strong>Transaksi</strong> untuk menginputkan setoran awal secara tunai.</p>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">Batal</button>
            <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalType === 'delete'" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-200 p-6 text-center animate-in zoom-in-95 duration-200">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 class="w-8 h-8 text-red-600" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Hapus Peserta Qurban?</h3>
        <p class="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin menghapus data <strong>{{ selectedPeserta?.name }}</strong>? Data yang dihapus tidak dapat dikembalikan.</p>
        
        <div class="flex gap-3 w-full">
          <button @click="closeModal" class="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors">Batal</button>
          <button @click="executeDelete" class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">Ya, Hapus Data</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Users, Search, Eye, X, Plus, Edit2, Trash2, MapPin, Phone } from 'lucide-vue-next'

// STATE
const searchQuery = ref('')
const activeFilter = ref('all')
const modalType = ref(null) // 'detail', 'add', 'edit', 'delete', null
const selectedPeserta = ref(null)
const formData = ref({ name: '', phone: '', address: '', type: 'sapi', animalGroup: 'Otomatis' })

const filters = [
  { label: 'Semua', value: 'all', icon: '' },
  { label: 'Sapi', value: 'sapi', icon: '🐄' },
  { label: 'Kambing', value: 'kambing', icon: '🐐' },
  { label: 'Lunas', value: 'lunas', icon: '✓' }
]

// MOCK DATA 
const mockPeserta = ref([
  { id: 1, name: 'Bapak Ahmad', phone: '081234567890', address: 'Blok A No. 12', code: 'QUR-001', type: 'sapi', animalGroup: 'Sapi A', target: 4000000, collected: 4000000 },
  { id: 2, name: 'Ibu Fatimah', phone: '089876543210', address: 'Blok B No. 5', code: 'QUR-002', type: 'sapi', animalGroup: 'Sapi A', target: 4000000, collected: 2000000 },
  { id: 3, name: 'Keluarga Budi', phone: '085612345678', address: 'Blok C No. 8', code: 'QUR-003', type: 'kambing', animalGroup: 'Kambing Mandiri', target: 3500000, collected: 3500000 },
])

// COMPUTED
const filteredPeserta = computed(() => {
  return mockPeserta.value.filter(p => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.phone.includes(q)
    
    let matchesFilter = true
    if (activeFilter.value === 'sapi') matchesFilter = p.type === 'sapi'
    if (activeFilter.value === 'kambing') matchesFilter = p.type === 'kambing'
    if (activeFilter.value === 'lunas') matchesFilter = p.collected >= p.target
    
    return matchesSearch && matchesFilter
  })
})

// METHODS
const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const getPercentage = (peserta) => Math.min(Math.round((peserta.collected / peserta.target) * 100), 100)
const getInitials = (name) => {
  const split = name.split(' ')
  return split.length >= 2 ? (split[0][0] + split[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

// Modal Handlers
const openDetails = (peserta) => { selectedPeserta.value = peserta; modalType.value = 'detail'; document.body.style.overflow = 'hidden' }
const openAddModal = () => { formData.value = { name: '', phone: '', address: '', type: 'sapi', animalGroup: 'Otomatis' }; modalType.value = 'add'; document.body.style.overflow = 'hidden' }
const openEditModal = (peserta) => { selectedPeserta.value = peserta; formData.value = { ...peserta }; modalType.value = 'edit'; document.body.style.overflow = 'hidden' }
const confirmDelete = (peserta) => { 
  if (peserta.collected > 0) {
    alert(`TIDAK BISA DIHAPUS: ${peserta.name} memiliki saldo tabungan aktif sebesar ${formatRupiah(peserta.collected)}. Lakukan refund transaksi terlebih dahulu.`)
    return
  }
  selectedPeserta.value = peserta; modalType.value = 'delete'; document.body.style.overflow = 'hidden' 
}
const closeModal = () => { modalType.value = null; selectedPeserta.value = null; document.body.style.overflow = '' }

// Actions
const submitForm = () => {
  if (modalType.value === 'add') alert('Berhasil mendaftarkan peserta manual. Silakan arahkan jamaah ke menu Transaksi untuk input uang tunai.')
  else if (modalType.value === 'edit') alert('Berhasil menyimpan perubahan data peserta.')
  closeModal()
}
const executeDelete = () => {
  alert('Data berhasil dihapus dari sistem.')
  closeModal()
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>