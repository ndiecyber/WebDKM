<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in pb-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Manajemen Periode Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode aktif, master harga hewan, dan riwayat tutup buku.</p>
      </div>
      <button 
        @click="openWizard"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-bold px-5 py-2.5 rounded-xl shadow-md shadow-secondary/20 transition-all text-sm flex items-center gap-2 justify-center shrink-0"
      >
        <FolderSync class="w-4 h-4" />
        <span>Tutup Buku & Buka Periode Baru</span>
      </button>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 mb-6">
      <div class="flex flex-wrap items-center gap-2 sm:gap-6">
        <button 
          @click="activeTab = 'periode'"
          class="pb-3 text-sm sm:text-base font-bold transition-colors relative flex items-center gap-2 px-2"
          :class="activeTab === 'periode' ? 'text-secondary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          <Calendar class="w-4 h-4 sm:w-5 sm:h-5" /> 
          <span class="hidden sm:inline">Periode Aktif & Harga</span>
          <span class="sm:hidden">Periode Aktif</span>
          <div v-if="activeTab === 'periode'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full"></div>
        </button>
        <button 
          @click="activeTab = 'riwayat'"
          class="pb-3 text-sm sm:text-base font-bold transition-colors relative flex items-center gap-2 px-2"
          :class="activeTab === 'riwayat' ? 'text-secondary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          <History class="w-4 h-4 sm:w-5 sm:h-5" /> 
          <span class="hidden sm:inline">Riwayat Periode</span>
          <span class="sm:hidden">Riwayat</span>
          <div v-if="activeTab === 'riwayat'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full"></div>
        </button>
      </div>
    </div>

    <!-- Area Konten -->
    <div class="w-full min-w-0">
        
        <!-- Tab 1: Periode -->
        <section v-show="activeTab === 'periode'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <Calendar class="w-5 h-5 text-gray-400" />
                Informasi Periode & Harga
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Status saat ini: 
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold uppercase rounded tracking-wide ml-1">Aktif</span>
              </p>
            </div>
            <button 
              @click="openEditModal"
              class="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700 flex items-center gap-2"
            >
              <Edit2 class="w-4 h-4" /> Edit Pengaturan
            </button>
          </div>

          <div class="p-6 sm:p-8 space-y-8">
            <!-- Informasi Dasar -->
            <div class="space-y-4">
              <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Informasi Dasar
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Judul Periode (Tahun)</p>
                  <p class="font-bold text-gray-900 dark:text-white text-lg">{{ settings.periodeName }}</p>
                </div>
                <div class="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Batas Waktu (Deadline) Tabungan</p>
                  <p class="font-bold text-gray-900 dark:text-white text-lg">{{ formatDate(settings.deadline) }}</p>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-white/[0.02] rounded-xl border border-gray-100 dark:border-white/5">
                <div>
                  <p class="text-sm font-bold text-gray-900 dark:text-white">Status Pendaftaran via Mobile</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Akses pendaftaran bagi jamaah baru melalui aplikasi.</p>
                </div>
                <span class="px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider" 
                      :class="settings.isRegistrationOpen ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'">
                  {{ settings.isRegistrationOpen ? 'Dibuka' : 'Ditutup' }}
                </span>
              </div>
            </div>

            <!-- Master Harga Hewan -->
            <div class="space-y-4">
              <div class="border-b border-gray-100 dark:border-white/5 pb-2">
                <h4 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Master Harga Hewan (Target Tagihan)
                </h4>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
                  <p class="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Harga Sapi (Per Slot/Orang)</p>
                  <p class="font-black text-gray-900 dark:text-white text-xl">{{ formatRupiah(settings.hargaSapiSlot) }}</p>
                </div>
                <div class="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-xl">
                  <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Harga Sapi (1 Ekor/7 Slot)</p>
                  <p class="font-black text-gray-900 dark:text-white text-xl opacity-70">{{ formatRupiah(settings.hargaSapiSlot * 7) }}</p>
                </div>
                <div class="p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl sm:col-span-2 lg:col-span-1">
                  <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Harga Kambing (Mandiri)</p>
                  <p class="font-black text-gray-900 dark:text-white text-xl">{{ formatRupiah(settings.hargaKambing) }}</p>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <!-- Tab 2: Riwayat -->
        <section v-show="activeTab === 'riwayat'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-100 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <History class="w-5 h-5 text-gray-400" />
              Riwayat Periode
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Data periode tahun-tahun sebelumnya yang sudah diarsipkan (Tutup Buku).</p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th class="px-6 py-4 font-bold">Judul Periode</th>
                  <th class="px-6 py-4 font-bold text-center">Total Sapi</th>
                  <th class="px-6 py-4 font-bold text-center">Total Kambing</th>
                  <th class="px-6 py-4 font-bold text-center">Total Shohibul</th>
                  <th class="px-6 py-4 font-bold text-right">Dana Terkumpul</th>
                  <th class="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                <tr v-for="history in riwayatPeriode" :key="history.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td class="px-6 py-4">
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ history.name }}</p>
                    <p class="text-[11px] text-gray-500 mt-0.5">Tutup pada: {{ history.closed_date }}</p>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">🐄 {{ history.totalSapi }} Ekor</span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">🐐 {{ history.totalKambing }} Ekor</span>
                  </td>
                  <td class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                    {{ history.totalShohibul }} Orang
                  </td>
                  <td class="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white text-right">
                    {{ formatRupiah(history.totalDana) }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button @click="openRecapModal(history)" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 mx-auto">
                      Lihat Laporan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>

  <Teleport to="body">
    <!-- Edit Modal -->
    <div v-if="editModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="editModal.isOpen = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 animate-fade-in-up relative z-10 flex flex-col max-h-[90vh]">
        
        <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 shrink-0">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Edit2 class="w-5 h-5 text-gray-400" /> Edit Pengaturan Periode Aktif
            </h3>
          </div>
          <button @click="editModal.isOpen = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        
        <form @submit.prevent="saveEdit" class="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tahun Qurban (Judul Periode)</label>
              <input 
                v-model="editForm.periodeName"
                type="text" 
                required
                class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
              />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Batas Waktu (Deadline)</label>
              <input 
                v-model="editForm.deadline"
                type="date" 
                required
                class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
              />
            </div>
            
            <div class="space-y-1.5 sm:col-span-2">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Pendaftaran via Aplikasi Mobile</p>
                </div>
                <button type="button" @click="editForm.isRegistrationOpen = !editForm.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shrink-0" :class="editForm.isRegistrationOpen ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-600'">
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform" :class="editForm.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Sapi (Per Slot/Orang)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                <input 
                  v-model.number="editForm.hargaSapiSlot"
                  type="number" 
                  required
                  class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
            </div>
            
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Kambing (Mandiri)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                <input 
                  v-model.number="editForm.hargaKambing"
                  type="number" 
                  required
                  class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </form>

        <div class="p-5 sm:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/50 shrink-0 flex justify-end gap-3">
          <button @click="editModal.isOpen = false" class="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="saveEdit" class="px-5 py-2.5 text-sm font-bold text-white bg-secondary hover:bg-yellow-500 rounded-xl shadow-sm transition-colors flex items-center gap-2">
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>

    <!-- Wizard Tutup & Buka Baru -->
    <div v-if="wizardModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 animate-fade-in-up relative z-10 flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/50 shrink-0">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                Tutup Buku & Mulai Periode Baru
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Langkah {{ wizardModal.step }} dari 2</p>
            </div>
            <button @click="wizardModal.isOpen = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
          </div>
          
          <div class="flex gap-2">
            <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="wizardModal.step >= 1 ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'"></div>
            <div class="h-1.5 flex-1 rounded-full transition-colors duration-300" :class="wizardModal.step >= 2 ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'"></div>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
          <!-- Step 1: Peringatan & Konfirmasi -->
          <div v-if="wizardModal.step === 1" class="space-y-6 animate-fade-in">
            <div class="p-5 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20 text-red-800 dark:text-red-400 text-sm leading-relaxed">
              <div class="flex items-start gap-3 mb-3">
                <AlertTriangle class="w-6 h-6 shrink-0 text-red-600 dark:text-red-500" />
                <p><strong>Peringatan Penting:</strong> Proses Tutup Buku hanya boleh dilakukan setelah pelaksanaan ibadah Qurban tahun ini ({{ settings.periodeName }}) <strong>selesai sepenuhnya</strong>.</p>
              </div>
              <ul class="list-disc list-inside space-y-1.5 pl-9">
                <li>Periode aktif saat ini akan dikunci (Read-Only) dan diarsipkan ke Riwayat.</li>
                <li>Semua data jamaah yang sudah Lunas akan ikut diarsipkan.</li>
                <li>Jamaah yang tabungannya <strong>Belum Lunas</strong> akan otomatis diwariskan (carry-over) ke periode baru.</li>
              </ul>
            </div>
            
            <div class="p-5 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-white/5 space-y-3">
              <h4 class="font-bold text-gray-900 dark:text-white text-sm border-b border-gray-200 dark:border-gray-700 pb-2">Ringkasan Sistem Saat Ini</h4>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400">Judul Periode</span>
                <span class="font-bold text-gray-900 dark:text-white">{{ settings.periodeName }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400">Total Hewan (Sapi/Kambing)</span>
                <span class="font-bold text-gray-900 dark:text-white">12 Sapi / 8 Kambing</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400">Estimasi Jamaah Carry-over</span>
                <span class="font-bold text-amber-600 dark:text-amber-400">14 Orang (Belum Lunas)</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer" @click="wizardModal.isConfirmed = !wizardModal.isConfirmed">
              <div class="w-5 h-5 rounded border flex items-center justify-center transition-colors" :class="wizardModal.isConfirmed ? 'bg-secondary border-secondary' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'">
                <Check v-if="wizardModal.isConfirmed" class="w-3.5 h-3.5 text-white" />
              </div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">Saya mengerti dan yakin ingin menutup periode saat ini.</p>
            </div>
          </div>
          
          <!-- Step 2: Setup Baru -->
          <div v-if="wizardModal.step === 2" class="space-y-6 animate-fade-in">
            <div class="mb-2">
              <h4 class="font-bold text-gray-900 dark:text-white text-lg">Setup Periode Baru</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Masukkan informasi pengaturan awal untuk tahun Qurban selanjutnya. Harga ini akan menjadi acuan bagi jamaah yang terkena carry-over.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="space-y-1.5 sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tahun Qurban Baru (Judul Periode)</label>
                <input 
                  v-model="wizardModal.form.periodeName"
                  type="text" 
                  placeholder="Contoh: Qurban 1448 H / 2027 M"
                  class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Batas Waktu (Deadline) Tabungan</label>
                <input 
                  v-model="wizardModal.form.deadline"
                  type="date" 
                  class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1.5"></div> <!-- spacer -->
              
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Sapi Baru (Per Slot/Orang)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                  <input 
                    v-model.number="wizardModal.form.hargaSapiSlot"
                    type="number" 
                    class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                  />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Kambing Baru (Mandiri)</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                  <input 
                    v-model.number="wizardModal.form.hargaKambing"
                    type="number" 
                    class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Wizard -->
        <div class="p-5 sm:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/50 shrink-0 flex justify-between gap-3">
          <button v-if="wizardModal.step === 1" @click="wizardModal.isOpen = false" class="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Batal</button>
          <button v-if="wizardModal.step === 2" @click="wizardModal.step = 1" class="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <ArrowLeft class="w-4 h-4" /> Kembali
          </button>
          
          <button v-if="wizardModal.step === 1" @click="wizardModal.step = 2" :disabled="!wizardModal.isConfirmed" class="ml-auto px-5 py-2.5 text-sm font-bold text-white bg-secondary hover:bg-yellow-500 rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            Lanjut Buat Periode Baru <ArrowRight class="w-4 h-4" />
          </button>
          <button v-if="wizardModal.step === 2" @click="executeWizard" :disabled="!isWizardFormValid" class="ml-auto px-5 py-2.5 text-sm font-bold text-white bg-secondary hover:bg-yellow-500 rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <FolderSync class="w-4 h-4" /> Simpan & Mulai Periode
          </button>
        </div>

      </div>
    </div>

    <!-- Recap Modal -->
    <div v-if="recapModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="recapModal.isOpen = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 animate-fade-in-up relative z-10 flex flex-col max-h-[90vh]">
        
        <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 shrink-0">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Archive class="w-5 h-5 text-gray-400" /> Rekapitulasi Periode Qurban
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ recapModal.data?.name }}</p>
          </div>
          <button @click="recapModal.isOpen = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Global Stats -->
            <div class="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 text-center sm:col-span-2">
              <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase mb-1">Total Dana Terkumpul</p>
              <p class="text-3xl font-black text-emerald-700 dark:text-emerald-300">{{ formatRupiah(recapModal.data?.totalDana) }}</p>
              <p class="text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70 mt-1">Dari Total {{ recapModal.data?.totalShohibul }} Shohibul Qurban</p>
            </div>
            
            <!-- Sapi Stats -->
            <div class="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Total Sapi</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">🐄 {{ recapModal.data?.totalSapi }} <span class="text-sm font-medium text-gray-500">Ekor</span></p>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 text-center">
                <div class="p-3 bg-emerald-50/30 dark:bg-emerald-900/10">
                  <p class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">Lunas</p>
                  <p class="font-bold text-gray-900 dark:text-white">{{ recapModal.data?.sapiLunas }}</p>
                </div>
                <div class="p-3 bg-amber-50/30 dark:bg-amber-900/10">
                  <p class="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-500 mb-0.5">Belum Lunas</p>
                  <p class="font-bold text-gray-900 dark:text-white">{{ recapModal.data?.sapiBelumLunas }}</p>
                </div>
              </div>
            </div>

            <!-- Kambing Stats -->
            <div class="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Total Kambing</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">🐐 {{ recapModal.data?.totalKambing }} <span class="text-sm font-medium text-gray-500">Ekor</span></p>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700 text-center">
                <div class="p-3 bg-emerald-50/30 dark:bg-emerald-900/10">
                  <p class="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">Lunas</p>
                  <p class="font-bold text-gray-900 dark:text-white">{{ recapModal.data?.kambingLunas }}</p>
                </div>
                <div class="p-3 bg-amber-50/30 dark:bg-amber-900/10">
                  <p class="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-500 mb-0.5">Belum Lunas</p>
                  <p class="font-bold text-gray-900 dark:text-white">{{ recapModal.data?.kambingBelumLunas }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-4">
            <h4 class="text-sm font-bold text-blue-800 dark:text-blue-400 mb-2">Ingin melihat rincian lengkap?</h4>
            <p class="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              Anda dapat membuka <strong>Dashboard Qurban</strong> dengan periode ini (Mode Arsip). Sistem akan memuat seluruh laporan, daftar shohibul, target hewan, dan riwayat setoran khusus untuk tahun ini.
            </p>
          </div>
        </div>

        <div class="p-5 sm:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/50 shrink-0 flex justify-end gap-3">
          <button @click="recapModal.isOpen = false" class="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Tutup</button>
          <button @click="goToDashboard(recapModal.data?.id)" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-2">
            Buka Dashboard (Arsip) <ArrowRight class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

  </Teleport>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Calendar, Archive, History, Edit2, FolderSync, AlertTriangle, X, Check, ArrowRight, ArrowLeft } from 'lucide-vue-next'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'
import { useQurbanStore } from '@/stores/qurban'
import { useRouter } from 'vue-router'

const toastStore = useToastStore()
const qurbanStore = useQurbanStore()
const router = useRouter()

// Utilities
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}
const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

// State Navigasi
const activeTab = ref('periode')

// Data Terkini (Mapping untuk update PeriodController)
const settings = ref({
  id: null,
  periodeName: '',
  deadline: '',
  isRegistrationOpen: true,
  hargaSapiSlot: 0,
  hargaKambing: 0
})

const riwayatPeriode = ref([])

const fetchPeriodsData = async () => {
  try {
    const res = await api.get('/qurban/admin/periods')
    if (res.data?.success) {
      const active = res.data.data.find(p => p.is_active)
      if (active) {
        settings.value = {
          id: active.id,
          periodeName: active.name,
          deadline: active.deadline_date,
          hargaSapiSlot: active.sapi_price_per_slot,
          hargaKambing: active.kambing_price,
          isRegistrationOpen: active.is_registration_open !== false
        }
      }
      
      riwayatPeriode.value = res.data.data.filter(p => !p.is_active).map(p => ({
        id: p.id,
        name: p.name,
        closed_date: formatDate(p.updated_at),
        totalSapi: p.totalSapi || 0,
        sapiLunas: p.sapiLunas || 0,
        sapiBelumLunas: p.sapiBelumLunas || 0,
        totalKambing: p.totalKambing || 0,
        kambingLunas: p.kambingLunas || 0,
        kambingBelumLunas: p.kambingBelumLunas || 0,
        totalShohibul: p.totalShohibul || 0,
        totalDana: p.totalDana || 0
      }))
    }
  } catch (err) {
    toastStore.addToast('Gagal mengambil data periode', 'error')
  }
}

onMounted(() => {
  fetchPeriodsData()
})

// MODAL EDIT
const editModal = ref({ isOpen: false })
const editForm = ref({})

const openEditModal = () => {
  editForm.value = { ...settings.value }
  editModal.value.isOpen = true
}

const saveEdit = async () => {
  try {
    const payload = {
      name: editForm.value.periodeName,
      deadline_date: editForm.value.deadline,
      sapi_price_per_slot: editForm.value.hargaSapiSlot,
      kambing_price: editForm.value.hargaKambing,
      is_registration_open: editForm.value.isRegistrationOpen
    }
    
    const res = await api.put('/qurban/admin/periods/active', payload)
    if (res.data?.success) {
      toastStore.addToast('Pengaturan periode berhasil diperbarui', 'success')
      editModal.value.isOpen = false
      fetchPeriodsData()
      qurbanStore.isFetchingPeriods = false
      qurbanStore.fetchPeriods()
    }
  } catch (err) {
    toastStore.addToast(err.response?.data?.message || 'Gagal menyimpan pengaturan', 'error')
  }
}

// MODAL REKAPITULASI
const recapModal = ref({ isOpen: false, data: null })

const openRecapModal = (history) => {
  recapModal.value.data = history
  recapModal.value.isOpen = true
}

const goToDashboard = (periodId) => {
  recapModal.value.isOpen = false
  qurbanStore.changeSelectedPeriod(periodId)
  router.push({ name: 'admin-qurban-dashboard' })
  toastStore.addToast(`Sistem beralih ke Mode Arsip`, 'info')
}

// WIZARD MODAL
const wizardModal = ref({
  isOpen: false,
  step: 1,
  isConfirmed: false,
  form: {
    periodeName: '',
    deadline: '',
    hargaSapiSlot: 4000000,
    hargaKambing: 3500000
  }
})

const isWizardFormValid = computed(() => {
  const f = wizardModal.value.form
  return f.periodeName && f.deadline && f.hargaSapiSlot > 0 && f.hargaKambing > 0
})

const openWizard = () => {
  wizardModal.value = {
    isOpen: true,
    step: 1,
    isConfirmed: false,
    form: {
      periodeName: '',
      deadline: '',
      hargaSapiSlot: settings.value.hargaSapiSlot,
      hargaKambing: settings.value.hargaKambing
    }
  }
}

const executeWizard = async () => {
  try {
    const payload = {
      name: wizardModal.value.form.periodeName,
      deadline_date: wizardModal.value.form.deadline,
      sapi_price_per_slot: wizardModal.value.form.hargaSapiSlot,
      kambing_price: wizardModal.value.form.hargaKambing
    }
    
    const res = await api.post('/qurban/admin/rollover/execute', payload)
    if (res.data?.success) {
      toastStore.addToast('Proses Tutup Buku & Buat Periode Baru berhasil', 'success')
      wizardModal.value.isOpen = false
      fetchPeriodsData()
      qurbanStore.isFetchingPeriods = false
      qurbanStore.fetchPeriods()
    }
  } catch (err) {
    toastStore.addToast(err.response?.data?.message || 'Gagal melakukan rollover', 'error')
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 10px; }

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