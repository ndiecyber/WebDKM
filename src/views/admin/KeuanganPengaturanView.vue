<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Keuangan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola master data dan referensi transaksi keuangan DKM.</p>
      </div>
      <button 
        type="button"
        @click="saveSettings"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- 2-Column Layout -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
      
      <!-- Navigasi Kiri (Sidebar) -->
      <div class="w-full md:w-64 shrink-0 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 p-2 rounded-xl shadow-sm md:sticky md:top-6 overflow-x-auto md:overflow-visible z-10">
        <div class="flex md:flex-col gap-1 min-w-max md:min-w-0">
          <button 
            type="button"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold"
          >
            <Database class="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>Master Data</span>
          </button>
        </div>
      </div>

      <!-- Area Konten Kanan -->
      <div class="flex-1 w-full min-w-0">
        
        <!-- Tab: Master Data -->
        <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Tags class="w-5 h-5 text-gray-400" />
              Kategori Transaksi
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola jenis kategori pemasukan dan pengeluaran agar pencatatan lebih teratur.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-8">
            
            <!-- Kategori Pemasukan -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowDownLeft class="w-4 h-4 text-emerald-500" /> Pemasukan
                </h4>
                <button type="button" @click="addCategory('in')" class="text-xs font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ring-1 ring-emerald-500/20">
                  <Plus class="w-3.5 h-3.5" /> Tambah
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(cat, index) in kategoriPemasukan" :key="'in-'+index" class="group flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 transition-colors hover:border-emerald-300 dark:hover:border-emerald-500/50">
                  <input 
                    v-model="cat.name" 
                    type="text" 
                    class="w-full bg-transparent border-none focus:ring-0 px-0 py-0 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Nama Kategori..."
                  />
                  <button type="button" @click="removeCategory('in', index)" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all shrink-0 ml-2" title="Hapus">
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-200 dark:bg-white/10 w-full"></div>

            <!-- Kategori Pengeluaran -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowUpRight class="w-4 h-4 text-rose-500" /> Pengeluaran
                </h4>
                <button type="button" @click="addCategory('out')" class="text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ring-1 ring-rose-500/20">
                  <Plus class="w-3.5 h-3.5" /> Tambah
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(cat, index) in kategoriPengeluaran" :key="'out-'+index" class="group flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 transition-colors hover:border-rose-300 dark:hover:border-rose-500/50">
                  <input 
                    v-model="cat.name" 
                    type="text" 
                    class="w-full bg-transparent border-none focus:ring-0 px-0 py-0 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Nama Kategori..."
                  />
                  <button type="button" @click="removeCategory('out', index)" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all shrink-0 ml-2" title="Hapus">
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Database, Tags, Save, Plus, Trash2, ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next'

const isSaving = ref(false)

const kategoriPemasukan = ref([
  { id: 1, name: 'Kotak Amal' },
  { id: 2, name: 'Infaq Jumat' },
  { id: 3, name: 'Zakat' },
  { id: 4, name: 'Donasi Bebas' }
])

const kategoriPengeluaran = ref([
  { id: 1, name: 'Operasional' },
  { id: 2, name: 'Listrik & Air' },
  { id: 3, name: 'Pembangunan' },
  { id: 4, name: 'Honor Penceramah' },
  { id: 5, name: 'Kegiatan Sosial' }
])

const addCategory = (type) => {
  if (type === 'in') {
    kategoriPemasukan.value.push({ id: Date.now(), name: '' })
  } else {
    kategoriPengeluaran.value.push({ id: Date.now(), name: '' })
  }
}

const removeCategory = (type, index) => {
  if (type === 'in') {
    kategoriPemasukan.value.splice(index, 1)
  } else {
    kategoriPengeluaran.value.splice(index, 1)
  }
}

const saveSettings = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    // Show toast here if available
  }, 1000)
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>
