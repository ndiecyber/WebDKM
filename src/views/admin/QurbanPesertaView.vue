<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users class="w-6 h-6 text-emerald-500" />
          Data Peserta Qurban
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Kelola data pendaftar shohibul qurban tahun ini.</p>
      </div>
      <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
        <Plus class="w-4 h-4" />
        Tambah Peserta
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
          placeholder="Cari nama atau kode peserta..." 
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
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shohibul</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hewan & Target</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Terkumpul</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
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
                <div class="text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>{{ peserta.type === 'sapi' ? '🐄' : '🐐' }}</span>
                  <span class="capitalize">{{ peserta.type }}</span>
                </div>
                <div class="text-xs text-gray-500 font-medium mt-0.5">{{ formatRupiah(peserta.target) }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900 dark:text-white mb-1">{{ formatRupiah(peserta.collected) }}</div>
                <div class="w-full max-w-30 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500"
                       :class="peserta.collected >= peserta.target ? 'bg-emerald-500' : 'bg-blue-500'"
                       :style="{ width: getPercentage(peserta) + '%' }">
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2.5 py-1 inline-flex text-[10px] leading-4 font-bold rounded-md uppercase tracking-wider"
                      :class="peserta.collected >= peserta.target 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'">
                  {{ peserta.collected >= peserta.target ? 'Lunas' : 'Proses' }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openDetails(peserta)" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg transition-colors inline-flex items-center justify-center" title="Lihat Detail">
                  <Eye class="w-4 h-4" />
                </button>
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

    <div v-if="selectedPeserta" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <User class="w-5 h-5 text-emerald-500" />
            Detail Shohibul
          </h3>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-1">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl border border-emerald-200 dark:border-emerald-800">
              {{ getInitials(selectedPeserta.name) }}
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedPeserta.name }}</h4>
              <div class="flex items-center gap-2 mt-1">
                <span class="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-[10px] text-gray-600 dark:text-gray-400 font-bold rounded uppercase border border-gray-200 dark:border-white/10">
                  {{ selectedPeserta.code }}
                </span>
                <span class="text-xs text-gray-500">{{ selectedPeserta.address }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Hewan Target</span>
              <span class="text-lg font-black text-gray-900 dark:text-white flex items-center justify-center gap-1.5">
                {{ selectedPeserta.type === 'sapi' ? '🐄 Sapi' : '🐐 Kambing' }}
              </span>
              <span class="text-[10px] text-gray-500 block mt-1">{{ selectedPeserta.animalGroup }}</span>
            </div>
            <div class="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Kekurangan</span>
              <span class="text-lg font-black text-amber-600 dark:text-amber-500 flex items-center justify-center">
                {{ formatRupiah(Math.max(0, selectedPeserta.target - selectedPeserta.collected)) }}
              </span>
              <span class="text-[10px] text-gray-500 block mt-1">{{ getPercentage(selectedPeserta) }}% Terkumpul</span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
          <button @click="closeDetails" class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Tutup
          </button>
          <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
            <Wallet class="w-4 h-4" />
            Terima Setoran
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Users, Search, Eye, X, Plus, Wallet, User } from 'lucide-vue-next'

// STATE
const searchQuery = ref('')
const activeFilter = ref('all')
const selectedPeserta = ref(null)

const filters = [
  { label: 'Semua', value: 'all', icon: '' },
  { label: 'Sapi', value: 'sapi', icon: '🐄' },
  { label: 'Kambing', value: 'kambing', icon: '🐐' },
  { label: 'Lunas', value: 'lunas', icon: '✓' }
]

// MOCK DATA
const mockPeserta = ref([
  { id: 1, name: 'Bapak Ahmad', code: 'QUR-001', type: 'sapi', animalGroup: 'Sapi A (Slot 1)', target: 3500000, collected: 3500000, address: 'Blok A No. 12' },
  { id: 2, name: 'Ibu Fatimah', code: 'QUR-002', type: 'sapi', animalGroup: 'Sapi A (Slot 2)', target: 3500000, collected: 2000000, address: 'Blok B No. 5' },
  { id: 3, name: 'Keluarga Budi', code: 'QUR-003', type: 'kambing', animalGroup: 'Kambing 1', target: 3000000, collected: 3000000, address: 'Blok C No. 8' },
  { id: 4, name: 'Haji Suryana', code: 'QUR-004', type: 'sapi', animalGroup: 'Sapi A (Slot 3)', target: 3500000, collected: 1500000, address: 'Blok A No. 1' },
  { id: 5, name: 'Deni Setiawan', code: 'QUR-005', type: 'kambing', animalGroup: 'Kambing 2', target: 4000000, collected: 1000000, address: 'Blok D No. 22' }
])

// COMPUTED
const filteredPeserta = computed(() => {
  return mockPeserta.value.filter(p => {
    // Search
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filter
    let matchesFilter = true
    if (activeFilter.value === 'sapi') matchesFilter = p.type === 'sapi'
    if (activeFilter.value === 'kambing') matchesFilter = p.type === 'kambing'
    if (activeFilter.value === 'lunas') matchesFilter = p.collected >= p.target
    
    return matchesSearch && matchesFilter
  })
})

// METHODS
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const getPercentage = (peserta) => {
  if (peserta.target === 0) return 0
  const pct = (peserta.collected / peserta.target) * 100
  return Math.min(Math.round(pct), 100)
}

const getInitials = (name) => {
  if (!name) return ''
  const split = name.split(' ')
  if (split.length >= 2) return (split[0][0] + split[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

const openDetails = (peserta) => {
  selectedPeserta.value = peserta
  document.body.style.overflow = 'hidden' // Mencegah background scroll
}

const closeDetails = () => {
  selectedPeserta.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>