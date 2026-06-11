<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-6 py-4 sm:py-10">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-dark/60 dark:bg-dark/80 backdrop-blur-md transition-opacity" 
        @click="$emit('close')"
      ></div>

      <!-- Modal Container -->
      <div 
        class="relative bg-white dark:bg-[#111827] w-full max-w-4xl h-[calc(100vh-2rem)] sm:h-auto sm:max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-300 dark:border-white/10 flex flex-col overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-gray-300 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-secondary/10 flex items-center justify-center text-primary dark:text-secondary">
              <FileText class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-dark dark:text-white font-heading leading-tight">
                {{ report?.title || 'Laporan Keuangan' }}
              </h2>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ report?.date || 'Periode Laporan' }}</p>
            </div>
          </div>
          <button 
            @click="$emit('close')" 
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto overflow-x-auto p-2 sm:p-6 lg:p-8 custom-scrollbar pb-8 sm:pb-8">
          <ReportKegiatanTemplate v-if="report" :report="report" />
          <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
            <Loader2 class="w-8 h-8 animate-spin mb-4" />
            <p>Memuat Data Laporan...</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { FileText, X, Loader2 } from 'lucide-vue-next'
import ReportKegiatanTemplate from '@/components/ui/ReportKegiatanTemplate.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  report: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const formatRupiah = (angka) => {
  if (angka === undefined || angka === null) return '0'
  return new Intl.NumberFormat('id-ID').format(angka)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from .relative {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.fade-leave-to .relative {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
