<template>
  <form @submit.prevent="saveFinance" class="space-y-6 sm:space-y-8">
    
    <!-- Header (Filament Style) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Laporan Keuangan</h1>
        <p class="text-sm text-gray-400 mt-1">Ubah data ringkasan kas yang tampil di widget halaman beranda.</p>
      </div>
      <button 
        type="submit"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- Alert / Notice -->
    <div class="bg-blue-500/10 ring-1 ring-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
      <Info class="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
      <div>
        <h4 class="text-sm font-semibold text-blue-400">Catatan Integrasi Sistem</h4>
        <p class="text-sm text-blue-400/80 mt-1 leading-relaxed">
          Saat ini pengisian data bersifat manual. Ke depannya, formulir ini akan dinonaktifkan dan data akan ditarik secara otomatis dari <strong>Sistem Keuangan Kas DKM</strong> (Backend API).
        </p>
      </div>
    </div>

    <div class="max-w-4xl space-y-6">
      
      <section class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm">
        <div class="p-6 sm:p-8 border-b border-white/5">
          <h3 class="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <Wallet class="w-5 h-5 text-gray-400" />
            Update Angka Laporan
          </h3>
          <p class="text-sm text-gray-400 mt-1">Pastikan nominal yang dimasukkan sesuai dengan buku kas fisik.</p>
        </div>
        
        <div class="p-6 sm:p-8 space-y-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Saldo Awal -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-300">Total Saldo Awal (Rp)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm font-medium">Rp</span>
                </div>
                <input 
                  v-model="finance.saldoAwal"
                  type="text" 
                  class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg pl-10 pr-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                  placeholder="84.739.781"
                />
              </div>
            </div>

            <!-- Periode -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-300">Tanggal / Periode Laporan</label>
              <input 
                v-model="finance.periode"
                type="text" 
                class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                placeholder="Misal: Jumat, 29 Mei 2026"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-8">
            <!-- Pemasukan -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-green-400">Pemasukan Bulan Ini (Rp)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingUp class="w-4 h-4 text-green-500/50" />
                </div>
                <input 
                  v-model="finance.pemasukan"
                  type="text" 
                  class="w-full bg-white/5 border-0 ring-1 ring-green-500/30 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-green-500 transition-all text-sm shadow-sm"
                  placeholder="12.500.000"
                />
              </div>
            </div>

            <!-- Pengeluaran -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-red-400">Pengeluaran Bulan Ini (Rp)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingDown class="w-4 h-4 text-red-500/50" />
                </div>
                <input 
                  v-model="finance.pengeluaran"
                  type="text" 
                  class="w-full bg-white/5 border-0 ring-1 ring-red-500/30 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-red-500 transition-all text-sm shadow-sm"
                  placeholder="4.200.000"
                />
              </div>
            </div>
          </div>

          <!-- Total Saldo Akhir -->
          <div class="border-t border-white/5 pt-8">
            <div class="bg-gray-800 ring-1 ring-white/10 rounded-xl p-6">
              <label class="block text-sm font-medium text-gray-300 mb-3">Total Saldo Akhir Saat Ini (Rp)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <strong class="text-gray-500">Rp</strong>
                </div>
                <input 
                  v-model="finance.saldoAkhir"
                  type="text" 
                  class="w-full bg-gray-950 border-0 ring-1 ring-white/10 rounded-lg pl-12 pr-4 py-3 text-xl font-bold text-white focus:ring-2 focus:ring-secondary transition-all shadow-inner"
                  placeholder="93.039.781"
                />
              </div>
              <p class="text-xs text-gray-500 mt-2">Nilai ini adalah angka utama yang paling disorot di website.</p>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Wallet, TrendingUp, TrendingDown, Save, Info } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
const isSaving = ref(false)

// Mock Data
const finance = ref({
  saldoAwal: '84.739.781',
  periode: 'Jumat, 29 Mei 2026',
  pemasukan: '12.500.000',
  pengeluaran: '4.200.000',
  saldoAkhir: '93.039.781'
})

function saveFinance() {
  isSaving.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSaving.value = false
    toastStore.addToast('Laporan keuangan berhasil diupdate')
  }, 1000)
}
</script>
