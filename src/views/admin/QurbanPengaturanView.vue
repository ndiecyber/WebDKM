<template>
  <div class="space-y-6 pb-8 max-w-5xl mx-auto animate-fade-in">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings class="w-6 h-6 text-gray-700 dark:text-gray-300" />
          Pengaturan Sistem Qurban
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode, master harga hewan, dan pelaksanaan tutup buku.</p>
      </div>
      
      <button v-if="activeTab === 'periode'" @click="saveSettings" class="bg-secondary hover:bg-yellow-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 text-sm flex items-center gap-2 shrink-0">
        <Save class="w-4 h-4" />
        <span>Simpan Perubahan</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="bg-white dark:bg-gray-900 p-1.5 rounded-xl ring-1 ring-gray-300 dark:ring-white/10 shadow-sm inline-flex w-full md:w-auto overflow-x-auto relative z-20">
      <button @click="activeTab = 'periode'" :class="activeTab === 'periode' ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary font-bold shadow-sm ring-1 ring-secondary/20' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <Calendar class="w-4 h-4" />
        Periode Aktif & Harga
      </button>
      <button @click="activeTab = 'riwayat'" :class="activeTab === 'riwayat' ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary font-bold shadow-sm ring-1 ring-secondary/20' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <History class="w-4 h-4" />
        Riwayat Periode
      </button>
      <button @click="activeTab = 'tutup_buku'" :class="activeTab === 'tutup_buku' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold shadow-sm ring-1 ring-red-200' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium'" class="px-5 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex items-center gap-2">
        <AlertTriangle class="w-4 h-4" />
        Zona Bahaya
      </button>
    </div>

    <!-- Tab 1: Periode -->
    <div v-show="activeTab === 'periode'" class="space-y-6 animate-fade-in-up">
      
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] flex justify-between items-center">
          <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white shadow-sm text-xs font-black">1</span>
            Informasi Periode Saat Ini
          </h3>
          <span class="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-md tracking-wide">Status: Aktif</span>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Tahun Qurban (Judul Periode)</label>
              <input v-model="settings.periodeName" type="text" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Batas Waktu (Deadline) Tabungan</label>
              <input v-model="settings.deadline" type="date" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/5 transition-colors hover:border-gray-300 dark:hover:border-white/10">
            <div>
              <p class="text-sm font-bold text-gray-900 dark:text-white">Status Pendaftaran via Aplikasi Mobile</p>
              <p class="text-xs text-gray-500 mt-0.5">Buka atau tutup akses pendaftaran jamaah baru dari HP mereka.</p>
            </div>
            <button @click="settings.isRegistrationOpen = !settings.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900" :class="settings.isRegistrationOpen ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform" :class="settings.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
          <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white shadow-sm text-xs font-black">2</span>
            Master Harga Hewan (Target Tagihan)
          </h3>
          <p class="text-[11px] text-gray-500 mt-1 pl-9">Harga ini akan digunakan sebagai target tabungan jamaah. Perubahan harga akan meng-update target jamaah yang belum lunas.</p>
        </div>
        <div class="p-6 space-y-5 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Sapi (1 Ekor Penuh)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                <input v-model.number="settings.hargaSapiEkor" type="number" @input="hitungSlotSapi" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm" />
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Sapi (Per Slot/Orang)</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                <input v-model.number="settings.hargaSapiSlot" type="number" @input="hitungEkorSapi" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm" />
              </div>
            </div>
          </div>

          <div class="space-y-1.5 w-full md:w-[calc(50%-10px)]">
            <label class="text-xs font-bold text-gray-600 dark:text-gray-400">Harga Kambing (Mandiri)</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
              <input v-model.number="settings.hargaKambing" type="number" class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Riwayat -->
    <div v-show="activeTab === 'riwayat'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden animate-fade-in-up">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
        <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">Daftar Riwayat Periode Qurban</h3>
        <p class="text-[11px] text-gray-500 mt-1">Data periode tahun-tahun sebelumnya yang sudah diarsipkan (Tutup Buku).</p>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th class="px-6 py-4 font-bold">Judul Periode</th>
              <th class="px-6 py-4 font-bold text-right">Harga Sapi (Slot)</th>
              <th class="px-6 py-4 font-bold text-right">Harga Kambing</th>
              <th class="px-6 py-4 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="history in riwayatPeriode" :key="history.id" class="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ history.name }}</p>
                <p class="text-[11px] text-gray-500 font-medium mt-0.5">Tutup pada: {{ history.closed_date }}</p>
              </td>
              <td class="px-6 py-4 text-sm font-black text-gray-700 dark:text-gray-300 text-right">
                {{ formatRupiah(history.hargaSapiSlot) }}
              </td>
              <td class="px-6 py-4 text-sm font-black text-gray-700 dark:text-gray-300 text-right">
                {{ formatRupiah(history.hargaKambing) }}
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1.5">
                  <Archive class="w-3 h-3" /> Arsip
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab 3: Zona Bahaya -->
    <div v-show="activeTab === 'tutup_buku'" class="bg-red-50/50 dark:bg-red-900/10 ring-1 ring-red-200 dark:ring-red-500/30 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
      <div class="px-6 py-4 border-b border-red-200 dark:border-red-500/30 bg-red-100/50 dark:bg-red-900/30">
        <h3 class="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle class="w-5 h-5" />
          Eksekusi Tutup Buku (Akhir Tahun)
        </h3>
      </div>
      <div class="p-6 md:p-8 space-y-6">
        <div class="space-y-3">
          <h4 class="text-sm font-bold text-red-800 dark:text-red-300">Apa yang terjadi saat Anda melakukan Tutup Buku?</h4>
          <ul class="text-sm text-red-800/80 dark:text-red-300/80 list-disc list-inside space-y-1.5 ml-1 font-medium">
            <li>Periode aktif saat ini ("{{ settings.periodeName }}") akan dipindahkan ke <strong>Riwayat Periode</strong>.</li>
            <li>Seluruh kelompok Sapi dan peserta yang sudah LUNAS akan diarsipkan.</li>
            <li>Jamaah yang tabungannya BELUM LUNAS akan otomatis diteruskan (Carry-over) ke periode tahun depan.</li>
            <li>Sistem akan meminta Anda membuat Judul Periode baru yang kosong.</li>
          </ul>
        </div>
        
        <div class="p-5 bg-white/60 dark:bg-black/20 rounded-xl ring-1 ring-red-200/50 dark:ring-red-500/20">
          <p class="text-xs text-red-600 dark:text-red-400 font-medium text-center mb-5">
            Fitur ini hanya boleh dijalankan <strong>1 KALI DALAM SETAHUN</strong>, tepat setelah ibadah Idul Adha selesai dilaksanakan.
          </p>
          <button @click="executeRollover" class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
            <Archive class="w-4 h-4" />
            Tutup Buku & Arsipkan Periode Sekarang
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Settings, Save, Calendar, AlertTriangle, Archive, History } from 'lucide-vue-next'

// Utilities
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

// State Navigasi
const activeTab = ref('periode')

// Data Terkini (Mapping untuk update PeriodController)
const settings = ref({
  id: null,
  periodeName: '',
  deadline: '',
  isRegistrationOpen: true, // Hanya flag UI
  hargaSapiEkor: 0, // Hanya kalkulasi UI
  hargaSapiSlot: 0,
  hargaKambing: 0
})

const riwayatPeriode = ref([])

// Simulasi load data dari endpoint `active` dan `index`
onMounted(() => {
  // Simulasi PeriodController@active
  const responseActive = {
    id: 1,
    name: 'Qurban 1447 H / 2026 M',
    deadline_date: '2026-06-18',
    sapi_price_per_slot: 4000000,
    kambing_price: 3500000,
    is_active: true
  }

  // Populate UI settings
  settings.value.id = responseActive.id
  settings.value.periodeName = responseActive.name
  settings.value.deadline = responseActive.deadline_date
  settings.value.hargaSapiSlot = responseActive.sapi_price_per_slot
  settings.value.hargaSapiEkor = responseActive.sapi_price_per_slot * 7
  settings.value.hargaKambing = responseActive.kambing_price
  settings.value.isRegistrationOpen = true

  // Simulasi PeriodController@index (Riwayat)
  riwayatPeriode.value = [
    { id: 2, name: 'Qurban 1446 H / 2025 M', closed_date: '10 Juli 2025', hargaSapiSlot: 3800000, hargaKambing: 3200000 },
    { id: 3, name: 'Qurban 1445 H / 2024 M', closed_date: '20 Juni 2024', hargaSapiSlot: 3500000, hargaKambing: 3000000 },
  ]
})

// Auto-calculate logic (Tetap dipertahankan untuk UX, tapi backend cuma butuh hargaSapiSlot)
const hitungSlotSapi = () => {
  settings.value.hargaSapiSlot = Math.round(settings.value.hargaSapiEkor / 7)
}
const hitungEkorSapi = () => {
  settings.value.hargaSapiEkor = settings.value.hargaSapiSlot * 7
}

// Handler untuk Update (Simulasi PeriodController@update)
const saveSettings = (event) => {
  // JSON payload yang akan dikirim ke Backend
  const payloadToBackend = {
    name: settings.value.periodeName,
    deadline_date: settings.value.deadline,
    sapi_price_per_slot: settings.value.hargaSapiSlot,
    kambing_price: settings.value.hargaKambing
  }
  
  console.log("Mengirim payload JSON ke API PeriodController@update:", payloadToBackend)

  const btn = event.currentTarget
  const originalHtml = btn.innerHTML
  
  btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Menyimpan...`
  
  setTimeout(() => {
    btn.innerHTML = originalHtml
    alert('Pengaturan periode dan master harga berhasil disimpan!\n\n(Catatan: Jika ada perubahan harga, Backend otomatis telah menyesuaikan target tagihan jamaah).')
  }, 800)
}

// Handler untuk Tutup Buku (Simulasi PeriodController@rollover)
const executeRollover = () => {
  const isConfirmed = confirm("PERINGATAN!\n\nAnda akan melakukan proses Tutup Buku (Rollover) untuk periode ini.\nData akan diarsipkan secara permanen. Anda yakin ingin melanjutkan?")
  
  if (isConfirmed) {
    const doubleConfirm = prompt("Ketik 'TUTUP BUKU' untuk mengonfirmasi eksekusi ini:")
    if (doubleConfirm === 'TUTUP BUKU') {
      
      console.log("Memanggil Endpoint PeriodController@rollover...")
      
      alert("Proses Tutup Buku berhasil dijalankan!\n\nBackend RolloverService telah memindahkan jamaah yang belum lunas (carry-over) dan mengarsipkan periode ini.")
      
      // Reset UI as dummy reaction
      settings.value.periodeName = "Qurban Tahun Baru (Belum Diset)"
      settings.value.hargaSapiSlot = 0
      settings.value.hargaSapiEkor = 0
      settings.value.hargaKambing = 0
      activeTab.value = 'periode'

    } else {
      alert("Konfirmasi gagal. Tutup buku dibatalkan.")
    }
  }
}
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