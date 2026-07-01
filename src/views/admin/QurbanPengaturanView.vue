<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi pengaturan umum sistem Qurban DKM.</p>
      </div>
    </div>

    <!-- Placeholder Content -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md p-8 sm:p-12 text-center animate-fade-in-up">
      <div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
        <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 ring-1 ring-gray-200 dark:ring-white/10">
          <Settings class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Pengaturan Umum</h3>
        <p class="text-sm text-gray-500 max-w-md mx-auto">Menu pengaturan umum Qurban sedang dalam tahap pengembangan. Fitur manajemen periode kini telah dipindahkan ke menu terpisah di panel navigasi kiri.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Settings } from 'lucide-vue-next'
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>