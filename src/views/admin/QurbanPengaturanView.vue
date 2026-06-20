<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Sistem Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode, master harga hewan, dan pelaksanaan tutup buku.</p>
      </div>
      <button @click="saveSettings" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 shrink-0">
        <Save class="w-4 h-4" />
        <span>Simpan Perubahan</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 space-y-6">
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2 flex justify-between items-center">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar class="w-4 h-4 text-emerald-500" />
              Periode Aktif Saat Ini
            </h3>
            <span class="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-md">Aktif</span>
          </div>
          <div class="p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Tahun Qurban (Judul Periode)</label>
                <input v-model="settings.periodeName" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Batas Waktu (Deadline) Tabungan</label>
                <input v-model="settings.deadline" type="date" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/5">
              <div>
                <p class="text-sm font-bold text-gray-900 dark:text-white">Status Pendaftaran Aplikasi</p>
                <p class="text-xs text-gray-500 mt-0.5">Buka atau tutup akses pendaftaran jamaah baru di versi mobile.</p>
              </div>
              <button @click="settings.isRegistrationOpen = !settings.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="settings.isRegistrationOpen ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="settings.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag class="w-4 h-4 text-blue-500" />
              Master Harga Hewan
            </h3>
            <p class="text-[10px] text-gray-500 mt-1">Perubahan harga di sini akan langsung memperbarui nilai 'Kekurangan/Target' jamaah carry-over.</p>
          </div>
          <div class="p-6 space-y-5 flex-1">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Sapi (1 Ekor Penuh)</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                  <input v-model.number="settings.hargaSapiEkor" type="number" @input="hitungSlotSapi" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Sapi (Per Slot/Orang)</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                  <input v-model.number="settings.hargaSapiSlot" type="number" @input="hitungEkorSapi" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Kambing (Mandiri)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                <input v-model.number="settings.hargaKambing" type="number" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>
            </div>

          </div>
        </div>

      </div>

      <div class="space-y-6">
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Headset class="w-4 h-4 text-amber-500" />
              Narahubung & Bantuan
            </h3>
          </div>
          <div class="p-6 space-y-5">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Nomor WhatsApp (CS Jamaah)</label>
              <div class="relative">
                <Phone class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input v-model="settings.kontakWa" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" placeholder="Contoh: 6281234567890" />
              </div>
              <p class="text-[10px] text-gray-500 mt-1">*Digunakan saat jamaah mengklik tombol "Bantuan" di aplikasi mobile.</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/30 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-red-200 dark:border-red-500/30 bg-red-100 dark:bg-red-900/30">
            <h3 class="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle class="w-4 h-4" />
              Zona Berbahaya (Akhir Tahun)
            </h3>
          </div>
          <div class="p-6 space-y-4">
            <p class="text-xs text-red-800 dark:text-red-300 font-medium">
              Eksekusi <strong>Tutup Buku</strong> dilakukan HANYA setelah Idul Adha berakhir. Sistem akan mengarsipkan seluruh data, mereset saldo jamaah yang sudah lunas, dan meneruskan (carry-over) saldo jamaah yang belum lunas ke periode selanjutnya.
            </p>
            <button @click="executeRollover" class="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
              <Archive class="w-4 h-4" />
              Tutup Buku & Arsipkan Periode Ini
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Settings, Save, Calendar, Phone, Tag, Headset, AlertTriangle, Archive } from 'lucide-vue-next'

// Mock Data State
const settings = ref({
  periodeName: 'Qurban 1447 H / 2026 M',
  deadline: '2026-06-18',
  isRegistrationOpen: true,
  kontakWa: '6281234567890',
  hargaSapiEkor: 28000000,
  hargaSapiSlot: 4000000,
  hargaKambing: 3500000
})

// Auto-calculate logic (Fase 11)
const hitungSlotSapi = () => {
  settings.value.hargaSapiSlot = Math.round(settings.value.hargaSapiEkor / 7)
}
const hitungEkorSapi = () => {
  settings.value.hargaSapiEkor = settings.value.hargaSapiSlot * 7
}

// Handlers
const saveSettings = () => {
  const btn = event.currentTarget
  const originalHtml = btn.innerHTML
  
  btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Menyimpan...`
  
  setTimeout(() => {
    btn.innerHTML = originalHtml
    alert('Pengaturan periode dan master harga berhasil disimpan! Target kekurangan jamaah carry-over otomatis disesuaikan.')
  }, 800)
}

const executeRollover = () => {
  const isConfirmed = confirm("PERINGATAN!\n\nAnda akan melakukan proses Tutup Buku (Rollover) untuk periode ini.\nData akan diarsipkan secara permanen. Anda yakin ingin melanjutkan?")
  
  if (isConfirmed) {
    const doubleConfirm = prompt("Ketik 'TUTUP BUKU' untuk mengonfirmasi eksekusi ini:")
    if (doubleConfirm === 'TUTUP BUKU') {
      alert("Proses Tutup Buku sedang dijalankan di latar belakang. Periode ini berhasil diarsipkan.")
    } else {
      alert("Konfirmasi gagal. Tutup buku dibatalkan.")
    }
  }
}
</script>