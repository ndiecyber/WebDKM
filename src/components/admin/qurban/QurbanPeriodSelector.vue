<template>
  <div class="relative">
    <button 
      @click="showDropdown = !showDropdown" 
      :disabled="qurbanStore.isLoading" 
      class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2 min-w-[180px] justify-between disabled:opacity-50"
    >
      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4 text-gray-400" />
        <span>{{ qurbanStore.selectedPeriod?.label }}</span>
        <span v-if="qurbanStore.isArchiveMode" class="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] font-bold rounded">Arsip</span>
      </div>
      <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
    </button>
    
    <div v-if="showDropdown" class="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 rounded-lg shadow-lg z-50 py-1 overflow-hidden animate-fade-in-down max-h-60 overflow-y-auto custom-scrollbar">
      <button 
        v-for="period in qurbanStore.periods" 
        :key="period.id"
        @click="selectPeriod(period.id)" 
        class="w-full text-left px-4 py-2 text-sm transition-colors"
        :class="qurbanStore.selectedPeriodId === period.id 
          ? 'bg-secondary/10 text-secondary dark:bg-secondary/20 font-bold' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
      >
        {{ period.label }} <span v-if="period.status === 'arsip'" class="text-[10px] text-gray-400 ml-1">(Arsip)</span>
      </button>
    </div>
    <div v-if="showDropdown" @click="showDropdown = false" class="fixed inset-0 z-40"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, ChevronDown } from 'lucide-vue-next'
import { useQurbanStore } from '@/stores/qurban'

const qurbanStore = useQurbanStore()
const showDropdown = ref(false)

onMounted(async () => {
  if (qurbanStore.periods.length === 0) {
    await qurbanStore.fetchPeriods()
  }
})

const selectPeriod = (id) => {
  qurbanStore.changeSelectedPeriod(id)
  showDropdown.value = false
}
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
</style>
