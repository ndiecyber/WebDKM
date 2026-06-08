<template>
  <form @submit.prevent="saveFinance" class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Laporan Keuangan Publik</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Ubah data ringkasan kas yang tampil di widget halaman beranda website.</p>
      </div>
      <button 
        type="submit"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- Alert / Notice -->
    <div class="bg-blue-50 dark:bg-blue-500/10 ring-1 ring-blue-200 dark:ring-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
      <Info class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
      <div>
        <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-400">Terkoneksi dengan Landing Page</h4>
        <p class="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1 leading-relaxed">
          Semua data yang Anda simpan di sini akan langsung mengubah angka pada bagian <strong>Laporan Keuangan</strong> di halaman Beranda.
        </p>
      </div>
    </div>

    <div class="max-w-5xl space-y-6">
      
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl shadow-sm">
        <div class="p-6 sm:p-8 border-b border-gray-200 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Wallet class="w-5 h-5 text-gray-500" />
            Detail Angka Laporan
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Sesuaikan nominal dengan format yang benar. Anda bisa mengubah format "juta" agar tampilan kartu publik lebih rapi.</p>
        </div>
        
        <div class="p-6 sm:p-8 space-y-8">
          
          <!-- Periode Global -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:border-white/5">
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Periode Awal</label>
              <input v-model="form.periodeAwal" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="Jumat, 29 Mei 2026" />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Periode Akhir</label>
              <input v-model="form.periodeAkhir" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="Selasa, 2 Juni 2026" />
            </div>
            <div class="space-y-1.5 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rentang Periode Singkat (Bottom Bar)</label>
              <input v-model="form.periodeSingkat" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="29 Mei - 2 Jun" />
            </div>
          </div>

          <!-- Pemasukan & Pengeluaran -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-gray-200 dark:border-white/5">
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <TrendingUp class="w-4 h-4" /> Pemasukan
              </h4>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Singkat (Juta)</label>
                <input v-model="form.pemasukan" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all text-sm" placeholder="15" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Penuh (Rp)</label>
                <input v-model="form.pemasukanFull" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all text-sm" placeholder="15.000.000" />
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <TrendingDown class="w-4 h-4" /> Pengeluaran
              </h4>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Singkat (Juta)</label>
                <input v-model="form.pengeluaran" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all text-sm" placeholder="8" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Penuh (Rp)</label>
                <input v-model="form.pengeluaranFull" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all text-sm" placeholder="8.000.000" />
              </div>
            </div>
          </div>

          <!-- Saldo Awal & Akhir -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-gray-200 dark:border-white/5">
            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Saldo Awal</h4>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Singkat (Juta)</label>
                <input v-model="form.saldoAwal" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="84,74" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Penuh (Rp)</label>
                <input v-model="form.saldoAwalFull" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="84.739.781" />
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-semibold text-sky-600 dark:text-sky-400">Saldo Akhir</h4>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Singkat (Juta)</label>
                <input v-model="form.saldoAkhir" type="text" class="w-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 transition-all text-sm font-bold" placeholder="91,74" />
              </div>
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-gray-500">Angka Penuh (Rp)</label>
                <input v-model="form.saldoAkhirFull" type="text" class="w-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 transition-all text-sm font-bold" placeholder="91.739.781" />
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Selisih Bersih (Bottom Bar)</label>
              <input v-model="form.selisihBersih" type="text" class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm" placeholder="7.000.000" />
            </div>
          </div>

        </div>
      </section>

    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Wallet, TrendingUp, TrendingDown, Save, Info } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'
import { useAdminStore } from '../../stores/admin'

const toastStore = useToastStore()
const adminStore = useAdminStore()
const isSaving = ref(false)

const form = ref({})

onMounted(() => {
  // Load data from store
  form.value = { ...adminStore.finance }
})

function saveFinance() {
  isSaving.value = true
  
  setTimeout(() => {
    adminStore.updateFinance(form.value)
    isSaving.value = false
    toastStore.addToast('Laporan keuangan publik berhasil diupdate!')
  }, 600)
}
</script>
