<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-dark/60 dark:bg-dark/80 backdrop-blur-md transition-opacity" 
        @click="$emit('close')"
      ></div>

      <!-- Modal Container -->
      <div 
        class="relative bg-white dark:bg-[#111827] w-full max-w-4xl h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-300 dark:border-white/10 flex flex-col overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-gray-300 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-secondary/10 flex items-center justify-center text-primary dark:text-secondary">
              <FileText class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-bold text-dark dark:text-white font-heading leading-tight">
                {{ report?.title || 'Laporan Keuangan' }}
              </h2>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ report?.date || 'Periode Laporan' }}</p>
            </div>
          </div>
          <button 
            @click="$emit('close')" 
            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar pb-8 sm:pb-8">
          <div v-if="report" class="max-w-3xl mx-auto space-y-8">
            
            <!-- Header Report (Print style) -->
            <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8 border-b-2 border-dark/10 dark:border-white/10 pb-6">
              <!-- Logo Kiri -->
              <div class="w-40 sm:w-48 shrink-0">
                <img :src="logoLight" alt="Logo Masjid" class="w-full h-auto object-contain block dark:hidden" />
                <img :src="logoDark" alt="Logo Masjid" class="w-full h-auto object-contain hidden dark:block" />
              </div>
              
              <!-- Teks Kanan -->
              <div class="text-center sm:text-right space-y-1 flex-1 flex flex-col justify-center mt-2 sm:mt-0">
                <h1 class="text-base sm:text-lg lg:text-xl font-bold text-dark dark:text-white uppercase tracking-wide leading-snug">
                  LAPORAN KEUANGAN {{ report.title }}
                </h1>
                <h2 class="text-sm sm:text-base font-bold text-dark dark:text-white uppercase tracking-wide">
                  {{ report.subtitle }}
                </h2>
                <p class="text-sm italic font-medium text-blue-600 dark:text-blue-400 mt-2">
                  {{ report.date }}
                </p>
              </div>
            </div>

            <!-- Bagian Pemasukan -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 pb-2 border-b border-gray-300 dark:border-gray-800">
                <span class="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-xs flex items-center justify-center">A</span>
                <h3 class="font-bold text-dark dark:text-white uppercase text-sm sm:text-base tracking-wider">Pemasukan</h3>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-semibold border-y border-gray-300 dark:border-gray-700">
                      <th class="py-2.5 px-3 w-12 text-center">NO.</th>
                      <th class="py-2.5 px-3 w-28 text-center hidden sm:table-cell">TANGGAL</th>
                      <th class="py-2.5 px-3">JENIS PEMASUKAN</th>
                      <th class="py-2.5 px-3 text-right w-32 sm:w-40">JUMLAH (Rp)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 dark:divide-gray-800/50">
                    <tr v-for="(item, index) in report.pemasukan" :key="index" class="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                      <td class="py-2 px-3 text-center text-gray-500 dark:text-gray-400">{{ item.no }}</td>
                      <td class="py-2 px-3 text-center text-gray-500 dark:text-gray-400 hidden sm:table-cell">{{ item.tanggal || '-' }}</td>
                      <td class="py-2 px-3 text-gray-700 dark:text-gray-300">
                        <div class="font-medium sm:font-normal leading-snug">{{ item.uraian }}</div>
                        <div class="text-[10px] text-gray-500 sm:hidden mt-0.5 flex items-center gap-1 opacity-80">
                          <CalendarDays class="w-3 h-3" /> {{ item.tanggal || '-' }}
                        </div>
                      </td>
                      <td class="py-2 px-3 text-right font-medium text-dark dark:text-white">{{ formatRupiah(item.jumlah) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-primary/5 dark:bg-primary/10 border-y-2 border-primary/20">
                      <td colspan="3" class="py-3 px-3 font-bold text-dark dark:text-white uppercase text-right hidden sm:table-cell">JUMLAH PEMASUKAN</td>
                      <td colspan="2" class="py-3 px-3 font-bold text-dark dark:text-white uppercase text-right sm:hidden">JUMLAH PEMASUKAN</td>
                      <td class="py-3 px-3 text-right font-bold text-green-600 dark:text-green-400">{{ formatRupiah(report.totalPemasukan) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Bagian Pengeluaran -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 pb-2 border-b border-gray-300 dark:border-gray-800">
                <span class="w-6 h-6 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center">B</span>
                <h3 class="font-bold text-dark dark:text-white uppercase text-sm sm:text-base tracking-wider">Pengeluaran</h3>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-semibold border-y border-gray-300 dark:border-gray-700">
                      <th class="py-2.5 px-3 w-12 text-center">NO.</th>
                      <th class="py-2.5 px-3 w-28 text-center hidden sm:table-cell">TANGGAL</th>
                      <th class="py-2.5 px-3">JENIS PENGELUARAN</th>
                      <th class="py-2.5 px-3 text-right w-32 sm:w-40">JUMLAH (Rp)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 dark:divide-gray-800/50">
                    <tr v-for="(item, index) in report.pengeluaran" :key="index" class="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                      <td class="py-2 px-3 text-center text-gray-500 dark:text-gray-400">{{ item.no }}</td>
                      <td class="py-2 px-3 text-center text-gray-500 dark:text-gray-400 hidden sm:table-cell">{{ item.tanggal || '-' }}</td>
                      <td class="py-2 px-3 text-gray-700 dark:text-gray-300">
                        <div class="font-medium sm:font-normal leading-snug">{{ item.uraian }}</div>
                        <div class="text-[10px] text-gray-500 sm:hidden mt-0.5 flex items-center gap-1 opacity-80">
                          <CalendarDays class="w-3 h-3" /> {{ item.tanggal || '-' }}
                        </div>
                      </td>
                      <td class="py-2 px-3 text-right font-medium text-dark dark:text-white">{{ formatRupiah(item.jumlah) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-red-50 dark:bg-red-900/10 border-y-2 border-red-200 dark:border-red-900/30">
                      <td colspan="3" class="py-3 px-3 font-bold text-dark dark:text-white uppercase text-right hidden sm:table-cell">JUMLAH PENGELUARAN</td>
                      <td colspan="2" class="py-3 px-3 font-bold text-dark dark:text-white uppercase text-right sm:hidden">JUMLAH PENGELUARAN</td>
                      <td class="py-3 px-3 text-right font-bold text-red-500">{{ formatRupiah(report.totalPengeluaran) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Rekapitulasi & Saldo -->
            <div class="space-y-3 pt-4">
              <div class="flex items-center gap-2 pb-2 border-b border-gray-300 dark:border-gray-800">
                <span class="w-6 h-6 rounded bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 font-bold text-xs flex items-center justify-center">C</span>
                <h3 class="font-bold text-dark dark:text-white uppercase text-sm sm:text-base tracking-wider">Sisa Saldo</h3>
              </div>
              
              <div class="bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-300 dark:border-white/10 p-4 sm:p-5">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">PEMASUKAN (A) - PENGELUARAN (B)</p>
                    <p class="text-xs italic text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">"{{ report.terbilang }}"</p>
                  </div>
                  <div class="text-xl sm:text-2xl font-bold font-heading text-cyan-600 dark:text-cyan-400 shrink-0">
                    Rp {{ formatRupiah(report.sisaSaldo) }}
                  </div>
                </div>
                <div v-if="report.keterangan" class="mt-3 pt-3 border-t border-gray-300 dark:border-gray-700/50">
                  <p class="text-xs text-gray-500 dark:text-gray-400"><span class="font-bold">NB:</span> {{ report.keterangan }}</p>
                </div>
              </div>
            </div>

            <!-- Tanda Tangan -->
            <div class="flex justify-between items-start pt-10 pb-4">
              <div class="text-center">
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-12 uppercase">{{ report.ttdKiriTitle || 'Ketua Panitia' }}</p>
                <p class="text-sm font-bold text-dark dark:text-white underline underline-offset-4">{{ report.ketua }}</p>
              </div>
              
              <!-- QR Code Placeholder -->
              <div class="hidden sm:flex flex-col items-center justify-center opacity-50">
                <QrCode class="w-16 h-16 text-gray-400" />
                <span class="text-[8px] mt-1 text-gray-400 tracking-widest uppercase">Verified</span>
              </div>

              <div class="text-center">
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-12 uppercase">Bendahara</p>
                <p class="text-sm font-bold text-dark dark:text-white underline underline-offset-4">{{ report.bendahara }}</p>
              </div>
            </div>

          </div>
          <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
            <Loader2 class="w-8 h-8 animate-spin mb-4" />
            <p>Memuat Data Laporan...</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { FileText, X, QrCode, Loader2, CalendarDays } from 'lucide-vue-next'
import logoLight from '@/assets/images/logo-kustom.png'
import logoDark from '@/assets/images/logo-kustom2.png'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  report: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])

const formatRupiah = (angka) => {
  if (angka === undefined || angka === null) return '0'
  return new Intl.NumberFormat('id-ID').format(angka)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from .relative {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.fade-leave-to .relative {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
