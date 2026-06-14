<template>
  <div class="space-y-6 pb-8">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings class="w-6 h-6 text-emerald-500" />
          Pengaturan Sistem Qurban
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode, rekening masjid, dan informasi panitia qurban.</p>
      </div>
      <button @click="saveSettings" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2">
        <Save class="w-4 h-4" />
        Simpan Perubahan
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar class="w-4 h-4 text-emerald-500" />
              Pengaturan Umum
            </h3>
          </div>
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Periode Qurban (Tahun Hijriah)</label>
                <input v-model="settings.periodeHijriah" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Tahun Masehi</label>
                <input v-model="settings.periodeMasehi" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/5">
              <div>
                <p class="text-sm font-bold text-gray-900 dark:text-white">Status Pendaftaran Online</p>
                <p class="text-xs text-gray-500 mt-0.5">Buka atau tutup akses jamaah untuk mendaftar qurban via website.</p>
              </div>
              <button @click="settings.isRegistrationOpen = !settings.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="settings.isRegistrationOpen ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="settings.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users class="w-4 h-4 text-blue-500" />
              Narahubung & Panitia
            </h3>
          </div>
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Ketua Panitia Qurban</label>
                <div class="relative">
                  <User class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input v-model="settings.ketuaPanitia" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Nomor WhatsApp (CS)</label>
                <div class="relative">
                  <Phone class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input v-model="settings.kontakWa" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" placeholder="Contoh: 6281234567890" />
                </div>
              </div>
            </div>
            <p class="text-[10px] text-gray-500 italic">*Nomor WhatsApp ini akan diarahkan ketika jamaah mengklik tombol "Bantuan" atau "Konfirmasi Manual" di aplikasi mobile.</p>
          </div>
        </div>

      </div>

      <div class="space-y-6">
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard class="w-4 h-4 text-amber-500" />
              Rekening Pembayaran
            </h3>
          </div>
          <div class="p-6 space-y-5 flex-1">
            
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Nama Bank</label>
              <div class="relative">
                <Building class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input v-model="settings.bankName" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Nomor Rekening</label>
              <input v-model="settings.bankAccount" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold tracking-wider text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Atas Nama (A/N)</label>
              <input v-model="settings.bankOwner" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
            </div>

            <div class="my-4 border-t border-dashed border-gray-200 dark:border-white/10"></div>

            <div class="bg-linear-to-br from-gray-800 to-gray-900 text-white p-4 rounded-xl shadow-inner relative overflow-hidden">
              <div class="absolute right-[-10%] top-[-20%] w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Pratinjau Rekening</p>
              <p class="text-lg font-black tracking-widest">{{ settings.bankAccount || '---- ---- ----' }}</p>
              <div class="flex justify-between items-end mt-2">
                <div>
                  <p class="text-[9px] text-gray-400">A/N</p>
                  <p class="text-xs font-bold">{{ settings.bankOwner || 'Nama Pemilik' }}</p>
                </div>
                <p class="text-xs font-black text-emerald-400">{{ settings.bankName || 'BANK' }}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Settings, Save, Calendar, Users, User, Phone, CreditCard, Building } from 'lucide-vue-next'

// Mock Data State
const settings = ref({
  periodeHijriah: '1447 H',
  periodeMasehi: '2026',
  isRegistrationOpen: true,
  ketuaPanitia: 'H. Suryaman, M.Ag',
  kontakWa: '6281234567890',
  bankName: 'Bank Syariah Indonesia (BSI)',
  bankAccount: '7123456789',
  bankOwner: 'DKM Masjid Jami Kassiti Qurban'
})

const saveSettings = () => {
  // Animasi/Feedback sederhana saat disave
  const btn = event.currentTarget
  const originalHtml = btn.innerHTML
  
  btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Menyimpan...`
  
  setTimeout(() => {
    btn.innerHTML = originalHtml
    alert('Pengaturan berhasil disimpan!')
  }, 800)
}
</script>