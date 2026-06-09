<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Keuangan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Daftar tautan integrasi repositori sistem DKM.</p>
      </div>
    </div>

    <div class="max-w-5xl space-y-6">
      <!-- Frontend Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layout class="w-5 h-5 text-secondary" />
            Frontend Repositories
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Tautan menuju repositori antarmuka pengguna.</p>
        </div>
        
        <div class="p-6 sm:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <a href="https://github.com/ndiecyber/WebDKM" target="_blank" class="block bg-gray-50 dark:bg-gray-950 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-5 hover:bg-gray-100 dark:hover:bg-white/5 hover:ring-secondary/50 transition-all group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white group-hover:text-secondary transition-colors">WebDKM</h4>
                  <p class="text-sm text-gray-500 mt-0.5">Sistem Profil & Manajemen Konten</p>
                </div>
                <ExternalLink class="w-4 h-4 text-gray-400 dark:text-gray-600 ml-auto group-hover:text-secondary transition-colors" />
              </div>
            </a>

            <a href="https://github.com/ndiecyber/KeuanganDKM" target="_blank" class="block bg-gray-50 dark:bg-gray-950 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-5 hover:bg-gray-100 dark:hover:bg-white/5 hover:ring-secondary/50 transition-all group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white group-hover:text-secondary transition-colors">KeuanganDKM</h4>
                  <p class="text-sm text-gray-500 mt-0.5">Sistem Laporan & Transaksi</p>
                </div>
                <ExternalLink class="w-4 h-4 text-gray-400 dark:text-gray-600 ml-auto group-hover:text-secondary transition-colors" />
              </div>
            </a>

            <a href="https://github.com/ndiecyber/TabunganQurban" target="_blank" class="block bg-gray-50 dark:bg-gray-950 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-5 hover:bg-gray-100 dark:hover:bg-white/5 hover:ring-secondary/50 transition-all group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white group-hover:text-secondary transition-colors">TabunganQurban</h4>
                  <p class="text-sm text-gray-500 mt-0.5">Sistem Tabungan Qurban</p>
                </div>
                <ExternalLink class="w-4 h-4 text-gray-400 dark:text-gray-600 ml-auto group-hover:text-secondary transition-colors" />
              </div>
            </a>

          </div>
        </div>
      </section>

      <!-- Backend Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Server class="w-5 h-5 text-blue-500 dark:text-blue-400" />
            Backend Repositories
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Tautan menuju repositori API dan server.</p>
        </div>
        
        <div class="p-6 sm:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <a href="https://github.com/ndiecyber/BackendDKM" target="_blank" class="block bg-gray-50 dark:bg-gray-950 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-5 hover:bg-gray-100 dark:hover:bg-white/5 hover:ring-blue-500/50 transition-all group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Github class="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
                <div>
                  <h4 class="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">BackendDKM</h4>
                  <p class="text-sm text-gray-500 mt-0.5">Core API & Database</p>
                </div>
                <ExternalLink class="w-4 h-4 text-gray-400 dark:text-gray-600 ml-auto group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </a>

          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { Github, ExternalLink, Layout, Server } from 'lucide-vue-next'
</script>
