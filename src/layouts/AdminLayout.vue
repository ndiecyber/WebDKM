<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex text-gray-600 dark:text-gray-300 font-sans relative selection:bg-secondary/30 selection:text-secondary transition-colors duration-300">
    <ToastContainer />
    <ConfirmDialog />
    
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-40 md:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <aside 
      class="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-white/5 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 md:relative transform transition-all duration-300 ease-in-out md:translate-x-0 overflow-hidden"
      :class="{
        'translate-x-0': isMobileMenuOpen,
        '-translate-x-full': !isMobileMenuOpen,
        'w-72': !isSidebarCollapsed,
        'w-20': isSidebarCollapsed
      }"
    >
      <div class="h-24 flex flex-col justify-center px-6 border-b border-gray-200 dark:border-white/5 shrink-0 relative overflow-hidden group">
        <div class="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div class="relative z-10 flex items-center justify-between w-full">
          <img v-if="!isSidebarCollapsed" :src="isDarkMode ? logoDark : logoLight" alt="Logo" class="h-12 sm:h-14 w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105 origin-left" />
          <div v-else class="w-full flex justify-center">
            <div class="w-10 h-10 overflow-hidden flex items-center justify-start">
              <img :src="isDarkMode ? logoDark : logoLight" alt="Logo DKM" class="h-10 w-auto max-w-none drop-shadow-sm transition-transform duration-500 hover:scale-110 origin-left" />
            </div>
          </div>
          <span v-if="!isSidebarCollapsed" class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
            Admin
          </span>
        </div>
      </div>

      <!-- Module Switcher -->
      <div v-if="adminStore.currentRoleData?.modules?.length > 1" class="px-4 py-4 border-b border-gray-200 dark:border-white/5 shrink-0 bg-gray-50/50 dark:bg-gray-900/20">
        <div class="bg-gray-200/50 dark:bg-gray-950 p-1.5 rounded-xl flex items-center shadow-inner ring-1 ring-black/5 dark:ring-white/5 overflow-x-auto hide-scrollbar" :class="{'flex-col gap-2': isSidebarCollapsed}">
          <button 
            v-if="adminStore.hasModuleAccess('web')"
            @click="switchModule('web')" 
            :title="isSidebarCollapsed ? 'Web DKM' : ''"
            :class="activeModule === 'web' ? 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10 font-bold' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium hover:bg-white/50 dark:hover:bg-gray-800/50'" 
            class="flex-1 py-2 text-xs rounded-lg transition-all duration-300 flex justify-center items-center gap-1.5 relative overflow-hidden group min-w-[3rem]"
          >
            <div v-if="activeModule === 'web'" class="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent"></div>
            <span v-if="!isSidebarCollapsed" class="relative z-10 whitespace-nowrap px-2">Web</span>
            <span v-else class="relative z-10 text-sm">W</span>
          </button>
          
          <button 
            v-if="adminStore.hasModuleAccess('keuangan')"
            @click="switchModule('keuangan')" 
            :title="isSidebarCollapsed ? 'Keuangan DKM' : ''"
            :class="activeModule === 'keuangan' ? 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10 font-bold' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium hover:bg-white/50 dark:hover:bg-gray-800/50'" 
            class="flex-1 py-2 text-xs rounded-lg transition-all duration-300 flex justify-center items-center gap-1.5 relative overflow-hidden group min-w-[3rem]"
          >
            <div v-if="activeModule === 'keuangan'" class="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent"></div>
            <span v-if="!isSidebarCollapsed" class="relative z-10 whitespace-nowrap px-2">Keuangan</span>
            <span v-else class="relative z-10 text-sm">K</span>
          </button>

          <!-- Modul Qurban Terintegrasi -->
          <button 
            v-if="adminStore.hasModuleAccess('qurban')"
            @click="switchModule('qurban')" 
            :title="isSidebarCollapsed ? 'Qurban' : ''"
            :class="activeModule === 'qurban' ? 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10 font-bold' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium hover:bg-white/50 dark:hover:bg-gray-800/50'" 
            class="flex-1 py-2 text-xs rounded-lg transition-all duration-300 flex justify-center items-center gap-1.5 relative overflow-hidden group min-w-[3rem]"
          >
            <div v-if="activeModule === 'qurban'" class="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent"></div>
            <span v-if="!isSidebarCollapsed" class="relative z-10 whitespace-nowrap px-2">Qurban</span>
            <span v-else class="relative z-10 text-sm">Q</span>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-6 px-4 overflow-y-auto hide-scrollbar space-y-6">
        
        <!-- Group: Manajemen Konten (Web DKM) -->
        <div v-show="activeModule === 'web'" class="border-t border-gray-200 dark:border-white/5 pt-6">
          <div class="px-3 mb-2" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Utama</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-dashboard' }"
              :title="isSidebarCollapsed ? 'Dashboard Web' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-dashboard' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Home class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Dashboard Web</span>
            </router-link>
          </div>

          <div class="px-3 mb-2 mt-6" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Manajemen Konten</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-kegiatan' }"
              :title="isSidebarCollapsed ? 'Berita Masjid' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-kegiatan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Calendar class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Berita Masjid</span>
            </router-link>

            <router-link 
              :to="{ name: 'admin-galeri' }"
              :title="isSidebarCollapsed ? 'Galeri Foto' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-galeri' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Image class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Galeri Foto</span>
            </router-link>

            <router-link 
              :to="{ name: 'admin-layanan' }"
              :title="isSidebarCollapsed ? 'Layanan & Fasilitas' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-layanan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Briefcase class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Layanan & Fasilitas</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Transaksi (Keuangan DKM) -->
        <div v-show="activeModule === 'keuangan'" class="border-t border-gray-200 dark:border-white/5 pt-6">
          <div class="px-3 mb-2" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Utama</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-keuangan-dashboard' }"
              :title="isSidebarCollapsed ? 'Dashboard Keuangan' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-dashboard' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Wallet class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Dashboard Keuangan</span>
            </router-link>
          </div>

          <div class="px-3 mb-2 mt-6" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Keuangan</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-keuangan-transaksi' }"
              :title="isSidebarCollapsed ? 'Transaksi' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-transaksi' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <ArrowLeftRight class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Transaksi</span>
            </router-link>
            <router-link 
              :to="{ name: 'admin-keuangan-program' }"
              :title="isSidebarCollapsed ? 'Program & Kegiatan' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-program' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <ClipboardList class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Program & Kegiatan</span>
            </router-link>
            <router-link 
              :to="{ name: 'admin-keuangan-bank-kas' }"
              :title="isSidebarCollapsed ? 'Bank & Kas' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-bank-kas' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Landmark class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Bank & Kas</span>
            </router-link>
            <router-link 
              :to="{ name: 'admin-keuangan-laporan' }"
              :title="isSidebarCollapsed ? 'Laporan' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-laporan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <FileBarChart class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Laporan</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Qurban DKM -->
        <div v-show="activeModule === 'qurban'" class="border-t border-gray-200 dark:border-white/5 pt-6">
          <div class="px-3 mb-2" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Utama</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-qurban-dashboard' }"
              :title="isSidebarCollapsed ? 'Dashboard Qurban' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-qurban-dashboard' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Activity class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Dashboard Qurban</span>
            </router-link>
          </div>

          <div class="px-3 mb-2 mt-6" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Manajemen Qurban</p>
          </div>
          <div class="space-y-1">
            <router-link 
              :to="{ name: 'admin-qurban-target' }"
              :title="isSidebarCollapsed ? 'Target Hewan' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-qurban-target' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Target class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Target Hewan</span>
            </router-link>
            <router-link 
              :to="{ name: 'admin-qurban-peserta' }"
              :title="isSidebarCollapsed ? 'Data Peserta' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-qurban-peserta' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Users class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Data Peserta</span>
            </router-link>
            <router-link 
              :to="{ name: 'admin-qurban-setoran' }"
              :title="isSidebarCollapsed ? 'Riwayat Setoran' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-qurban-setoran' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <History class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Riwayat Setoran</span>
            </router-link>
          </div>
        </div>

        <!-- Group: Sistem -->
        <div v-show="adminStore.hasModuleAccess('sistem')" class="border-t border-gray-200 dark:border-white/5 pt-6">
          <div class="px-3 mb-2" v-if="!isSidebarCollapsed">
            <p class="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">Sistem</p>
          </div>
          <div class="space-y-1">
            <!-- Pengaturan Umum Berdasarkan Modul -->
            <router-link
              v-show="activeModule === 'web'"
              :to="{ name: 'admin-pengaturan' }"
              :title="isSidebarCollapsed ? 'Pengaturan Umum' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-pengaturan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Settings class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Pengaturan Umum</span>
            </router-link>

            <router-link
              v-show="activeModule === 'keuangan'"
              :to="{ name: 'admin-keuangan-pengaturan' }"
              :title="isSidebarCollapsed ? 'Pengaturan Keuangan' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-keuangan-pengaturan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Settings class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Pengaturan Keuangan</span>
            </router-link>

            <router-link
              v-show="activeModule === 'qurban'"
              :to="{ name: 'admin-qurban-pengaturan' }"
              :title="isSidebarCollapsed ? 'Pengaturan Qurban' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-qurban-pengaturan' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Settings class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Pengaturan Qurban</span>
            </router-link>

            <!-- Manajemen Pengguna & Peran (Fitur Tim Baru) -->
            <router-link
              :to="{ name: 'admin-pengguna' }"
              :title="isSidebarCollapsed ? 'Manajemen Pengguna' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-pengguna' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <ShieldCheck class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Manajemen Pengguna</span>
            </router-link>

            <!-- Log Aktivitas (Fitur Tim Baru) -->
            <router-link
              :to="{ name: 'admin-log-aktivitas' }"
              :title="isSidebarCollapsed ? 'Log Aktivitas' : ''"
              class="flex items-center gap-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden"
              :class="[$route.name === 'admin-log-aktivitas' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-linear-to-r from-emerald-500/10 to-transparent ring-1 ring-emerald-500/20 shadow-sm scale-100' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-105 transform', isSidebarCollapsed ? 'justify-center px-0' : 'px-4']"
            >
              <Activity class="w-5 h-5 shrink-0" />
              <span v-if="!isSidebarCollapsed" class="truncate">Log Aktivitas</span>
            </router-link>

          </div>
        </div>
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-900 shrink-0">
        <div class="flex items-center" :class="isSidebarCollapsed ? 'justify-center' : 'justify-between'">
          <router-link :to="{ name: 'admin-profil' }" class="flex items-center gap-3 truncate hover:opacity-80 transition-opacity">
            <div class="w-9 h-9 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center ring-1 ring-gray-200 dark:ring-white/10 shrink-0">
              <User class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div class="truncate" v-if="!isSidebarCollapsed">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ adminStore.currentUser?.name || 'Admin' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{{ adminStore.currentUser?.role || 'Administrator' }}</p>
            </div>
          </router-link>
          <button v-if="!isSidebarCollapsed" @click="handleLogout" class="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0" title="Keluar">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <header class="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300">
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Toggle -->
          <button @click="isMobileMenuOpen = true" class="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <Menu class="w-6 h-6" />
          </button>
          
          <!-- Desktop Sidebar Collapse Toggle -->
          <button @click="isSidebarCollapsed = !isSidebarCollapsed" class="hidden md:block p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Toggle Sidebar">
            <Menu class="w-5 h-5" />
          </button>
          
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ pageTitle }}</h2>
        </div>

        <div class="flex items-center gap-3 sm:gap-4">
          <button @click="toggleTheme" class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Ubah Tema">
            <Sun v-if="isDarkMode" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <router-link :to="{ name: 'home' }" target="_blank" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-medium shadow-sm border border-emerald-500/50">
            <Globe class="w-4 h-4" />
            <span class="hidden sm:inline">Kembali</span>
          </router-link>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col">
        <!-- Mockup Warning Banner (Fitur Tim Baru) -->
        <div class="mb-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex items-start gap-3 shadow-sm shrink-0">
          <AlertTriangle class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 class="text-sm font-semibold text-amber-800 dark:text-amber-400">Mode Pratinjau (Mockup)</h4>
            <p class="text-xs text-amber-700 dark:text-amber-500 mt-1">Halaman admin saat ini beroperasi dalam mode mockup (data lokal) untuk keperluan analisis dan pengembangan backend (API). Perubahan yang Anda lakukan di sini tidak akan terhubung ke database asli, beberapa pengaturan tidak mengubah yang ada di landing page.</p>
          </div>
        </div>

        <div class="max-w-7xl mx-auto w-full flex-1">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin'
import ToastContainer from '../components/ui/ToastContainer.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'
// Menggabungkan ikon dari kedua sisi (termasuk fitur Qurban & fitur Log Aktivitas/Admin)
import { 
  LayoutDashboard, Home, Calendar, LogOut, Menu, User, Globe, Image, Briefcase, Settings, Wallet, ChevronRight, ArrowLeftRight, Landmark, FileBarChart, Sun, Moon, ShieldCheck, Activity, AlertTriangle, Target, Users, History, ClipboardList
} from 'lucide-vue-next'
import logoLight from '@/assets/images/logo-kustom.webp'
import logoDark from '@/assets/images/logo-kustom2.webp'
import { getStorage, setStorage } from '@/utils/storage'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const isMobileMenuOpen = ref(false)
const isSidebarCollapsed = ref(false)
const activeModule = ref('web')
const isDarkMode = ref(true)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  setStorage('theme', isDarkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = getStorage('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true
    }
  }

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  // Logika sinkronisasi rute milik Tim dan Qurban
  const roleModules = adminStore.currentRoleData?.modules || ['web']
  const isSystemRoute = ['admin-pengaturan', 'admin-pengguna', 'admin-log-aktivitas', 'admin-profil'].includes(route.name)
  
  if (!isSystemRoute) {
    if (route.name?.startsWith('admin-keuangan')) {
      activeModule.value = 'keuangan'
    } else if (route.name?.startsWith('admin-qurban')) {
      activeModule.value = 'qurban'
    } else if (!roleModules.includes('web') && roleModules.length > 0) {
      activeModule.value = roleModules[0]
    } else {
      activeModule.value = 'web'
    }
  } else {
    activeModule.value = roleModules.includes(activeModule.value) ? activeModule.value : (roleModules[0] || 'web')
  }
})

const switchModule = (module) => {
  activeModule.value = module
  if (module === 'keuangan') {
    router.push({ name: 'admin-keuangan-dashboard' })
  } else if (module === 'qurban') {
    router.push({ name: 'admin-qurban-dashboard' })
  } else if (module === 'web') {
    router.push({ name: 'admin-dashboard' })
  }
}

watch(
  () => route.name,
  (newName) => {
    const isSystemRoute = ['admin-pengaturan', 'admin-pengguna', 'admin-log-aktivitas', 'admin-profil'].includes(newName)
    if (isSystemRoute) return 
    
    if (newName?.startsWith('admin-keuangan')) {
      activeModule.value = 'keuangan'
    } else if (newName?.startsWith('admin-qurban')) {
      activeModule.value = 'qurban'
    } else {
      activeModule.value = 'web'
    }
  }
)

const pageTitle = computed(() => {
  // Title Web DKM
  if (route.name === 'admin-dashboard') return 'Dashboard Web'
  if (route.name === 'admin-kegiatan') return 'Berita Masjid'
  if (route.name === 'admin-galeri') return 'Galeri Foto'
  if (route.name === 'admin-layanan') return 'Layanan & Fasilitas'
  if (route.name === 'admin-pengaturan') return 'Pengaturan Umum'
  if (route.name === 'admin-pengguna') return 'Manajemen Pengguna'
  if (route.name === 'admin-log-aktivitas') return 'Log Aktivitas'
  
  // Title Keuangan DKM
  if (route.name === 'admin-keuangan-dashboard') return 'Dashboard Keuangan'
  if (route.name === 'admin-keuangan-transaksi') return 'Transaksi Keuangan'
  if (route.name === 'admin-keuangan-bank-kas') return 'Bank & Kas'
  if (route.name === 'admin-keuangan-laporan') return 'Laporan Keuangan'
  if (route.name === 'admin-keuangan-pengaturan') return 'Pengaturan Keuangan'
  if (route.name === 'admin-keuangan-program') return 'Program & Kegiatan'

  // Title Qurban DKM
  if (route.name === 'admin-qurban-dashboard') return 'Dashboard Tabungan Qurban'
  if (route.name === 'admin-qurban-target') return 'Manajemen Target Hewan'
  if (route.name === 'admin-qurban-peserta') return 'Data Peserta Qurban'
  if (route.name === 'admin-qurban-setoran') return 'Riwayat Setoran'
  if (route.name === 'admin-qurban-pengaturan') return 'Pengaturan Qurban'

  return 'Admin Panel'
})

function handleLogout() {
  adminStore.logout()
  router.push({ name: 'admin-login' })
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