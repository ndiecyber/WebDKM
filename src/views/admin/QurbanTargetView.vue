<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Target class="w-6 h-6 text-emerald-500" />
          Manajemen Target Hewan
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Atur jenis, harga, dan kuota hewan qurban yang ditawarkan ke jamaah.</p>
      </div>
      <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
        <Plus class="w-4 h-4" />
        Tambah Hewan
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      
      <div v-for="hewan in mockHewanList" :key="hewan.id" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        
        <div class="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-start bg-gray-50 dark:bg-white/2">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-2xl border border-gray-100 dark:border-white/5">
              {{ hewan.icon }}
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">{{ hewan.name }}</h3>
              <span class="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-[10px] font-bold text-gray-600 dark:text-gray-300 rounded uppercase tracking-wider">
                {{ hewan.type }}
              </span>
            </div>
          </div>
          <button @click="hewan.isActive = !hewan.isActive" class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none" :class="hewan.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'">
            <span class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform" :class="hewan.isActive ? 'translate-x-5' : 'translate-x-1'"></span>
          </button>
        </div>

        <div class="p-5 space-y-4 flex-1">
          <div>
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Harga per Slot/Ekor</p>
            <p class="text-2xl font-black text-gray-900 dark:text-white font-heading">{{ formatRupiah(hewan.price) }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-white/5">
            <div>
              <p class="text-[10px] text-gray-500 font-semibold mb-0.5">Kapasitas</p>
              <p class="text-sm font-bold text-gray-800 dark:text-white">{{ hewan.slots }} Orang</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-500 font-semibold mb-0.5">Target Tahun Ini</p>
              <p class="text-sm font-bold text-gray-800 dark:text-white">{{ hewan.targetCount }} Ekor</p>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 bg-gray-50 dark:bg-white/2 border-t border-gray-100 dark:border-white/5 flex justify-end gap-2">
          <button class="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors flex items-center gap-1.5">
            <Edit2 class="w-3.5 h-3.5" /> Edit
          </button>
          <button class="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-1.5">
            <Trash2 class="w-3.5 h-3.5" /> Hapus
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Target, Plus, Edit2, Trash2 } from 'lucide-vue-next'

// MOCK DATA (Diambil & dikembangkan dari calcTargets di MenebungView.vue)
const mockHewanList = ref([
  { id: 1, name: 'Sapi Kelompok (Reguler)', type: 'sapi', icon: '🐄👥', price: 3000000, slots: 7, targetCount: 3, isActive: true },
  { id: 2, name: 'Sapi Utuh Reguler', type: 'sapi', icon: '🐄', price: 21000000, slots: 1, targetCount: 1, isActive: true },
  { id: 3, name: 'Sapi Utuh Super', type: 'sapi', icon: '🐄✨', price: 25000000, slots: 1, targetCount: 1, isActive: false },
  { id: 4, name: 'Kambing Reguler', type: 'kambing', icon: '🐐', price: 2500000, slots: 1, targetCount: 10, isActive: true },
  { id: 5, name: 'Kambing Super', type: 'kambing', icon: '🐐✨', price: 3000000, slots: 1, targetCount: 5, isActive: true },
])

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}
</script>