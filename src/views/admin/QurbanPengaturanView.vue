<template>
  <form @submit.prevent="saveSettings" class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Sistem Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi periode, master harga hewan, dan pelaksanaan tutup buku.</p>
      </div>
      <button 
        type="submit"
        v-if="activeTab === 'periode'"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- 2-Column Layout -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
      
      <!-- Navigasi Kiri (Sidebar) -->
      <div class="w-full md:w-64 shrink-0 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 p-2 rounded-xl shadow-sm md:sticky md:top-6 overflow-x-auto md:overflow-visible z-20">
        <div class="flex md:flex-col gap-1 min-w-max md:min-w-0">
          <button 
            type="button"
            @click="activeTab = 'periode'"
            :class="activeTab === 'periode' 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
          >
            <Calendar class="w-4 h-4 shrink-0" :class="activeTab === 'periode' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'" />
            <span>Periode Aktif & Harga</span>
          </button>
          
          <button 
            type="button"
            @click="activeTab = 'riwayat'"
            :class="activeTab === 'riwayat' 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
          >
            <History class="w-4 h-4 shrink-0" :class="activeTab === 'riwayat' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'" />
            <span>Riwayat Periode</span>
          </button>

          <button 
            type="button"
            @click="activeTab = 'tutup_buku'"
            :class="activeTab === 'tutup_buku' 
              ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
          >
            <AlertTriangle class="w-4 h-4 shrink-0" :class="activeTab === 'tutup_buku' ? 'text-red-600 dark:text-red-400' : 'text-gray-400'" />
            <span>Zona Bahaya</span>
          </button>
        </div>
      </div>

      <!-- Area Konten Kanan -->
      <div class="flex-1 w-full min-w-0">
        
        <!-- Tab 1: Periode -->
        <section v-show="activeTab === 'periode'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <Calendar class="w-5 h-5 text-gray-400" />
                Informasi Periode & Harga
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Status saat ini: <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-bold uppercase rounded tracking-wide ml-1">Aktif</span></p>
            </div>
          </div>

          <div class="p-6 sm:p-8 space-y-8">
            <!-- Informasi Dasar -->
            <div class="space-y-6">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                Informasi Dasar
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tahun Qurban (Judul Periode)</label>
                  <input 
                    v-model="settings.periodeName"
                    type="text" 
                    required
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Batas Waktu (Deadline) Tabungan</label>
                  <input 
                    v-model="settings.deadline"
                    type="date" 
                    required
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                  />
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">Pendaftaran via Aplikasi Mobile</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Buka atau tutup akses pendaftaran jamaah baru dari HP mereka.</p>
                </div>
                <button type="button" @click="settings.isRegistrationOpen = !settings.isRegistrationOpen" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shrink-0" :class="settings.isRegistrationOpen ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-600'">
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform" :class="settings.isRegistrationOpen ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>
            </div>

            <!-- Master Harga Hewan -->
            <div class="space-y-6">
              <div class="border-b border-gray-200 dark:border-white/10 pb-2">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  Master Harga Hewan (Target Tagihan)
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Perubahan harga akan meng-update target jamaah yang belum lunas.</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Sapi (1 Ekor Penuh)</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                    <input 
                      v-model.number="settings.hargaSapiEkor"
                      @input="hitungSlotSapi"
                      type="number" 
                      required
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Sapi (Per Slot/Orang)</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                    <input 
                      v-model.number="settings.hargaSapiSlot"
                      @input="hitungEkorSapi"
                      type="number" 
                      required
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5 sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Kambing (Mandiri)</label>
                  <div class="relative sm:w-[calc(50%-12px)]">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">Rp</span>
                    <input 
                      v-model.number="settings.hargaKambing"
                      type="number" 
                      required
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <!-- Tab 2: Riwayat -->
        <section v-show="activeTab === 'riwayat'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
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
                  <th class="px-6 py-4 font-bold text-right">Harga Sapi (Slot)</th>
                  <th class="px-6 py-4 font-bold text-right">Harga Kambing</th>
                  <th class="px-6 py-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                <tr v-for="history in riwayatPeriode" :key="history.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td class="px-6 py-4">
                    <p class="text-sm font-bold text-gray-900 dark:text-white">{{ history.name }}</p>
                    <p class="text-[11px] text-gray-500 mt-0.5">Tutup pada: {{ history.closed_date }}</p>
                  </td>
                  <td class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">
                    {{ formatRupiah(history.hargaSapiSlot) }}
                  </td>
                  <td class="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">
                    {{ formatRupiah(history.hargaKambing) }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="px-2.5 py-1 bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded inline-flex items-center gap-1.5">
                      <Archive class="w-3 h-3" /> Arsip
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Tab 3: Zona Bahaya -->
        <section v-show="activeTab === 'tutup_buku'" class="bg-red-50/50 dark:bg-red-900/10 ring-1 ring-red-200 dark:ring-red-500/30 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-red-200 dark:border-red-500/30">
            <h3 class="text-lg font-semibold text-red-700 dark:text-red-400 tracking-tight flex items-center gap-2">
              <AlertTriangle class="w-5 h-5 text-red-500" />
              Zona Bahaya (Tutup Buku)
            </h3>
            <p class="text-sm text-red-600/80 dark:text-red-400/80 mt-1">Eksekusi Tutup Buku hanya dilakukan di akhir tahun operasional Qurban.</p>
          </div>
          <div class="p-6 sm:p-8 space-y-6">
            <div class="space-y-3">
              <h4 class="text-sm font-bold text-red-800 dark:text-red-300">Apa yang terjadi saat Anda melakukan Tutup Buku?</h4>
              <ul class="text-sm text-red-800/80 dark:text-red-300/80 list-disc list-inside space-y-1.5 ml-1 font-medium">
                <li>Periode aktif saat ini ("{{ settings.periodeName }}") akan dipindahkan ke <strong>Riwayat Periode</strong>.</li>
                <li>Seluruh kelompok Sapi dan peserta yang sudah LUNAS akan diarsipkan.</li>
                <li>Jamaah yang tabungannya BELUM LUNAS akan otomatis diteruskan (Carry-over) ke periode tahun depan.</li>
                <li>Sistem akan meminta Anda membuat Judul Periode baru yang kosong.</li>
              </ul>
            </div>
            
            <div class="p-5 bg-white/60 dark:bg-black/20 rounded-xl ring-1 ring-red-200/50 dark:ring-red-500/20 mt-6">
              <p class="text-xs text-red-600 dark:text-red-400 font-medium text-center mb-5">
                Fitur ini hanya boleh dijalankan <strong>1 KALI DALAM SETAHUN</strong>, tepat setelah ibadah Idul Adha selesai dilaksanakan.
              </p>
              <button type="button" @click="executeRollover" class="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                <Archive class="w-4 h-4" />
                Tutup Buku & Arsipkan Periode Sekarang
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  </form>
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
const isSaving = ref(false)

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
const saveSettings = () => {
  // Cegah submit ganda jika ditekan di tab Zona Bahaya atau Riwayat yang bukan form utama
  if (activeTab.value !== 'periode') return;

  // JSON payload yang akan dikirim ke Backend
  const payloadToBackend = {
    name: settings.value.periodeName,
    deadline_date: settings.value.deadline,
    sapi_price_per_slot: settings.value.hargaSapiSlot,
    kambing_price: settings.value.hargaKambing
  }
  
  console.log("Mengirim payload JSON ke API PeriodController@update:", payloadToBackend)

  isSaving.value = true
  
  setTimeout(() => {
    isSaving.value = false
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
</style>