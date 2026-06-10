<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Bank & Kas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pantau saldo seluruh rekening bank dan kotak fisik kas masjid.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="showMutasiModal = true" class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2">
          <ArrowLeftRight class="w-4 h-4" />
          <span>Mutasi Kas</span>
        </button>
        <button @click="showTambahRekeningModal = true" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span>Tambah Rekening</span>
        </button>
      </div>
    </div>

    <!-- Cards Section (Horizontal Scroll) -->
    <div class="flex gap-4 sm:gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
      
      <!-- Card: BSI -->
      <div class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 to-teal-800 text-white p-6 shadow-lg shadow-emerald-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Landmark class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-emerald-100">BSI Masjid Jami Kassiti</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-emerald-900/50 rounded-md backdrop-blur-sm border border-emerald-500/30">Bank</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 45.250.000</p>
            <p class="text-emerald-200 text-sm mt-1 font-mono tracking-wider">7123 4567 8900</p>
          </div>
        </div>
      </div>

      <!-- Card: Kotak Amal -->
      <div class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 to-indigo-800 text-white p-6 shadow-lg shadow-blue-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Wallet class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-blue-100">Kotak Amal Utama</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-blue-900/50 rounded-md backdrop-blur-sm border border-blue-500/30">Kas Tunai</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 5.150.000</p>
            <p class="text-blue-200 text-sm mt-1">Dihitung setiap Jumat</p>
          </div>
        </div>
      </div>

      <!-- Card: Kas Operasional -->
      <div class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl bg-linear-to-br from-gray-700 to-gray-900 text-white p-6 shadow-lg shadow-gray-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Briefcase class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-gray-300">Kas Kecil Operasional</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-gray-800/80 rounded-md backdrop-blur-sm border border-gray-600/30">Petty Cash</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 850.000</p>
            <p class="text-gray-400 text-sm mt-1">Dipegang oleh Bendahara</p>
          </div>
        </div>
      </div>

      <!-- Card: Kas Pembangunan -->
      <div class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl bg-linear-to-br from-amber-600 to-orange-800 text-white p-6 shadow-lg shadow-amber-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <HardHat class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-amber-100">Kas Pembangunan</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-amber-900/50 rounded-md backdrop-blur-sm border border-amber-500/30">Kas Tunai</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 12.000.000</p>
            <p class="text-amber-200 text-sm mt-1">Renovasi area wudhu</p>
          </div>
        </div>
      </div>

      <!-- Card: Bank Muamalat -->
      <div class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl bg-linear-to-br from-purple-600 to-indigo-900 text-white p-6 shadow-lg shadow-purple-900/20 group">
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Landmark class="w-24 h-24" />
        </div>
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between">
            <h3 class="font-medium tracking-wide text-purple-100">Bank Muamalat</h3>
            <span class="px-2.5 py-1 text-xs font-semibold bg-purple-900/50 rounded-md backdrop-blur-sm border border-purple-500/30">Bank</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp 20.000.000</p>
            <p class="text-purple-200 text-sm mt-1 font-mono tracking-wider">312 445 6678</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Riwayat Mutasi Antar Kas -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Mutasi Antar Kas</h3>
        <button class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">Lihat Semua</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-300 dark:border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Dari Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Ke Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nominal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="mutasi in mutasiData" :key="mutasi.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{{ mutasi.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-400"></span>
                  {{ mutasi.from }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {{ mutasi.to }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 dark:text-white">Rp {{ mutasi.amount }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button @click="openDetailMutasi(mutasi)" class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    
    <!-- Modal Tambah Rekening -->
    <div v-if="showTambahRekeningModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showTambahRekeningModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Tambah Rekening/Kas</h3>
          <button @click="showTambahRekeningModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Rekening/Kas</label>
            <input type="text" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Contoh: Bank BSI Masjid">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Rekening</label>
            <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option>Bank</option>
              <option>Kas Tunai</option>
              <option>Dompet Digital</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Rekening (Opsional)</label>
            <input type="text" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: 7123 4567 8900">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Saldo Awal (Rp)</label>
            <input type="number" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showTambahRekeningModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="showTambahRekeningModal = false" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Simpan Rekening</button>
        </div>
      </div>
    </div>

    <!-- Modal Mutasi Kas -->
    <div v-if="showMutasiModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showMutasiModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight class="w-5 h-5 text-secondary" /> Mutasi Antar Kas
          </h3>
          <button @click="showMutasiModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-rose-600 dark:text-rose-400">Dari Rekening</label>
              <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option>Kotak Amal Utama</option>
                <option>BSI Masjid Jami Kassiti</option>
                <option>Kas Kecil Operasional</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-emerald-600 dark:text-emerald-400">Ke Rekening</label>
              <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option>BSI Masjid Jami Kassiti</option>
                <option>Kas Kecil Operasional</option>
                <option>Kotak Amal Utama</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nominal Mutasi (Rp)</label>
            <input type="number" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
            <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan Tambahan</label>
            <textarea rows="2" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Setor tunai hasil infaq jumat"></textarea>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showMutasiModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="showMutasiModal = false" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Proses Mutasi</button>
        </div>
      </div>
    </div>

    <!-- Modal Detail Mutasi -->
    <div v-if="selectedMutasi" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="selectedMutasi = null"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Detail Mutasi</h3>
          <button @click="selectedMutasi = null" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Nominal</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">Rp {{ selectedMutasi.amount }}</p>
            <span class="inline-block mt-2 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">Berhasil</span>
          </div>

          <div class="space-y-4 relative">
            <!-- Timeline Line -->
            <div class="absolute left-3 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700"></div>

            <div class="relative flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-gray-900">
                <ArrowUpRight class="w-3 h-3 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Dari</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedMutasi.from }}</p>
              </div>
            </div>

            <div class="relative flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-gray-900">
                <ArrowDownLeft class="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Ke</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedMutasi.to }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Tanggal</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ selectedMutasi.date }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Keterangan</span>
              <span class="font-medium text-gray-900 dark:text-white text-right max-w-[150px]">{{ selectedMutasi.desc }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Oleh</span>
              <span class="font-medium text-gray-900 dark:text-white">Admin Keuangan</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, ArrowLeftRight, Landmark, Wallet, Briefcase, HardHat, X, ArrowUpRight, ArrowDownLeft } from 'lucide-vue-next'

const showMutasiModal = ref(false)
const showTambahRekeningModal = ref(false)
const selectedMutasi = ref(null)

const openDetailMutasi = (mutasi) => {
  selectedMutasi.value = mutasi
}

const mutasiData = [
  { id: 1, date: '10 Okt 2023', from: 'Kotak Amal Utama', to: 'BSI Masjid Jami Kassiti', amount: '3.000.000', desc: 'Setor tunai hasil Jumat' },
  { id: 2, date: '05 Okt 2023', from: 'BSI Masjid Jami Kassiti', to: 'Kas Kecil Operasional', amount: '1.000.000', desc: 'Tarik tunai untuk operasional' },
  { id: 3, date: '28 Sep 2023', from: 'Kotak Amal Utama', to: 'BSI Masjid Jami Kassiti', amount: '2.800.000', desc: 'Setor tunai hasil Jumat' },
]
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
