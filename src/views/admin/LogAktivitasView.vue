<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Log Aktivitas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Pantau setiap perubahan dan aktivitas yang dilakukan oleh pengguna di dalam sistem.</p>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden flex flex-col h-[calc(100vh-16rem)]">
      <div class="overflow-y-auto flex-1">
        <table class="w-full text-left text-sm whitespace-nowrap relative">
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5 sticky top-0 z-10">
            <tr>
              <th class="px-6 py-4 font-semibold">Waktu</th>
              <th class="px-6 py-4 font-semibold">Pengguna</th>
              <th class="px-6 py-4 font-semibold">Aksi</th>
              <th class="px-6 py-4 font-semibold w-full">Detail Aktivitas</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5">
            <tr v-for="log in adminStore.auditLogs" :key="log.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                {{ formatDate(log.timestamp) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-900 dark:text-white">{{ log.userName }}</span>
                  <span class="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{{ log.userRole }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-300 truncate max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl" :title="log.details">
                {{ log.details }}
              </td>
            </tr>
            <tr v-if="adminStore.auditLogs.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Belum ada log aktivitas yang tercatat.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../stores/admin'

const adminStore = useAdminStore()

function formatDate(isoString) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return formatter.format(date).replace(/\./g, ':');
}
</script>
