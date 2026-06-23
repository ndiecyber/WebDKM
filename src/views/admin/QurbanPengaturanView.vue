<template>
  <div class="space-y-6 pb-8 max-w-5xl mx-auto">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings class="w-6 h-6 text-emerald-500" />
          Pengaturan Sistem Qurban
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode, master harga hewan, dan riwayat tutup buku.</p>
      </div>
      
      <!-- Tombol Simpan hanya muncul jika kita sedang di Tab Periode & Harga -->
      <button v-if="activeTab === 'periode'" @click="saveSettings" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2">
        <Save class="w-4 h-4" />
        Simpan Perubahan
      </button>
    </div>

    <!-- Sistem Tab Navigasi -->
    <div class="bg-white dark:bg-gray-900 p-1.5 rounded-xl border border-gray-200 dark:border-white/5 inline-flex w-full md:w-auto overflow-x-auto">
      <button @click="activeTab = 'periode'" :class="activeTab === 'periode' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <Calendar class="w-4 h-4" />
        Periode Aktif & Harga
      </button>
      <button @click="activeTab = 'riwayat'" :class="activeTab === 'riwayat' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <History class="w-4 h-4" />
        Riwayat Periode
      </button>
      <button @click="activeTab = 'tutup_buku'" :class="activeTab === 'tutup_buku' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <AlertTriangle class="w-4 h-4" />
        Zona Bahaya
      </button>
    </div>

    <!-- KONTEN TAB 1: PERIODE AKTIF & HARGA -->
    <div v-show="activeTab === 'periode'" class="space-y-6">
      
      <!-- Step 1: Periode -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2 flex justify-between items-center">
          <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-black">1</span>
            Informasi Periode Saat Ini
          </h3>
          <span class="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-md">Status: Aktif</span>
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
              <p class="text-sm font-bold text-gray-900 dark:text-white">Status Pendaftaran via Aplikasi Mobile</p>
              <p class="text-xs text-gray-500 mt-0.5">Buka atau tutup akses pendaftaran jamaah baru dari HP mereka.</p>
            </div>
            <button @click="settings.isRegistrationOpen = !settings.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="settings.isRegistrationOpen ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="settings.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Master Harga -->
      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
          <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-black">2</span>
            Master Harga Hewan (Target Tagihan)
          </h3>
          <p class="text-[10px] text-gray-500 mt-1 pl-8">Harga ini akan digunakan sebagai target tabungan jamaah. Perubahan harga akan meng-update target jamaah yang belum lunas.</p>
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

    <!-- KONTEN TAB 2: RIWAYAT PERIODE (Data Mockup Tambahan Baru) -->
    <div v-show="activeTab === 'riwayat'" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/2">
        <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">Daftar Riwayat Periode Qurban</h3>
        <p class="text-[10px] text-gray-500 mt-1">Data periode tahun-tahun sebelumnya yang sudah diarsipkan (Tutup Buku).</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th class="px-6 py-3 font-bold">Judul Periode</th>
              <th class="px-6 py-3 font-bold">Harga Sapi (Slot)</th>
              <th class="px-6 py-3 font-bold">Harga Kambing</th>
              <th class="px-6 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="history in riwayatPeriode" :key="history.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ history.name }}</p>
                <p class="text-[10px] text-gray-500">Tutup pada: {{ history.closed_date }}</p>
              </td>
              <td class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rp {{ history.hargaSapiSlot.toLocaleString('id-ID') }}
              </td>
              <td class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rp {{ history.hargaKambing.toLocaleString('id-ID') }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] font-bold uppercase rounded-md flex items-center w-max gap-1">
                  <Archive class="w-3 h-3" /> Arsip
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- KONTEN TAB 3: TUTUP BUKU (ZONA BAHAYA) -->
    <div v-show="activeTab === 'tutup_buku'" class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/30 rounded-2xl shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-red-200 dark:border-red-500/30 bg-red-100 dark:bg-red-900/30">
        <h3 class="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle class="w-5 h-5" />
          Eksekusi Tutup Buku (Akhir Tahun)
        </h3>
      </div>
      <div class="p-6 md:p-8 space-y-6">
        <div class="space-y-2">
          <h4 class="text-sm font-bold text-red-800 dark:text-red-300">Apa yang terjadi saat Anda melakukan Tutup Buku?</h4>
          <ul class="text-xs text-red-800/80 dark:text-red-300/80 list-disc list-inside space-y-1 ml-1">
            <li>Periode aktif saat ini ("{{ settings.periodeName }}") akan dipindahkan ke <strong>Riwayat Periode</strong>.</li>
            <li>Seluruh kelompok Sapi dan peserta yang sudah LUNAS akan diarsipkan.</li>
            <li>Jamaah yang tabungannya BELUM LUNAS akan otomatis diteruskan (Carry-over) ke periode tahun depan.</li>
            <li>Sistem akan meminta Anda membuat Judul Periode baru yang kosong.</li>
          </ul>
        </div>
        
        <div class="p-4 bg-white/60 dark:bg-black/20 rounded-xl border border-red-200/50 dark:border-red-500/20">
          <p class="text-xs text-red-600 dark:text-red-400 font-medium text-center mb-4">
            Fitur ini hanya boleh dijalankan <strong>1 KALI DALAM SETAHUN</strong>, tepat setelah ibadah Idul Adha selesai dilaksanakan.
          </p>
          <button @click="executeRollover" class="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2">
            <Archive class="w-4 h-4" />
            Tutup Buku & Arsipkan Periode Sekarang
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Settings, Save, Calendar, Tag, AlertTriangle, Archive, History } from 'lucide-vue-next'

// State Navigasi
const activeTab = ref('periode') // Tab default saat halaman dibuka

// Mock Data State (Sesuai instruksi: WA Dihapus)
const settings = ref({
  periodeName: 'Qurban 1447 H / 2026 M',
  deadline: '2026-06-18',
  isRegistrationOpen: true,
  hargaSapiEkor: 28000000,
  hargaSapiSlot: 4000000,
  hargaKambing: 3500000
})

// Mock Data Baru (Untuk Tab Riwayat Periode)
const riwayatPeriode = ref([
  { id: 1, name: 'Qurban 1446 H / 2025 M', closed_date: '10 Juli 2025', hargaSapiSlot: 3800000, hargaKambing: 3200000 },
  { id: 2, name: 'Qurban 1445 H / 2024 M', closed_date: '20 Juni 2024', hargaSapiSlot: 3500000, hargaKambing: 3000000 },
])

// Auto-calculate logic
const hitungSlotSapi = () => {
  settings.value.hargaSapiSlot = Math.round(settings.value.hargaSapiEkor / 7)
}
const hitungEkorSapi = () => {
  settings.value.hargaSapiEkor = settings.value.hargaSapiSlot * 7
}

// Handlers
const saveSettings = (event) => {
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