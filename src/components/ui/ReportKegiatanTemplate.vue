<template>
  <div class="space-y-3 sm:space-y-8 flex flex-col items-center w-full max-w-full">
    <div 
      v-for="(page, pageIndex) in paginatedPages" 
      :key="pageIndex" 
      class="a4-page text-gray-900 dark:text-gray-100 w-full sm:w-[794px] min-h-0 sm:min-h-[1123px] mx-auto bg-white dark:bg-[#111827] shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-gray-200 dark:ring-white/10 rounded-sm p-2.5 sm:p-12 shrink-0 relative"
      style="page-break-after: always; break-after: page;"
    >
      <!-- Header Report -->
      <div v-if="page.showHeader" class="flex flex-row items-center justify-between gap-3 sm:gap-6 mb-3 sm:mb-6 border-b-2 border-gray-900/10 dark:border-white/10 pb-2 sm:pb-4">
        <!-- Logo Kiri -->
        <div class="w-24 sm:w-40 shrink-0">
          <img :src="logoLight" alt="Logo Masjid" class="w-full h-auto object-contain block dark:hidden" />
          <img :src="logoDark" alt="Logo Masjid" class="w-full h-auto object-contain hidden dark:block" />
        </div>
        
        <!-- Teks Kanan -->
        <div class="text-right space-y-0.5 sm:space-y-1 flex-1 flex flex-col justify-center mt-0">
          <h1 class="text-[10px] sm:text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide leading-snug">
            LAPORAN KEUANGAN {{ report.title }}
          </h1>
          <h2 class="text-[8px] sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            {{ report.subtitle }}
          </h2>
          <p class="text-[8px] sm:text-xs italic font-medium text-blue-600 dark:text-blue-400 mt-0.5 sm:mt-1">
            {{ report.date }}
          </p>
        </div>
      </div>

      <!-- Bagian Pemasukan -->
      <div v-if="page.pemasukan.length > 0 || page.showPemasukanHeader" class="space-y-2 mb-2 sm:mb-5 w-full">
        <div v-if="page.showPemasukanHeader" class="flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-white/10">
          <span class="w-4 h-4 sm:w-5 sm:h-5 rounded bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold text-[9px] sm:text-[10px] flex items-center justify-center">A</span>
          <h3 class="font-bold text-gray-900 dark:text-white uppercase text-[10px] sm:text-xs tracking-wider">Pemasukan <span v-if="!page.showHeader" class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-normal ml-2 italic">(Lanjutan)</span></h3>
        </div>
        
        <div class="w-full overflow-hidden">
          <table class="w-full text-[9px] sm:text-xs text-left border-collapse table-fixed">
            <thead v-if="page.showPemasukanHeader">
              <tr class="bg-gray-50 dark:bg-white/[0.02] text-gray-600 dark:text-gray-300 font-semibold border-y border-gray-300 dark:border-white/10">
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 w-6 sm:w-10 text-center">NO.</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 w-14 sm:w-28 text-center">TANGGAL</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5">JENIS PEMASUKAN</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right w-[76px] sm:w-32">JUMLAH (Rp)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="(item, index) in page.pemasukan" :key="index" class="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-center text-gray-500 dark:text-gray-400">{{ item.no }}</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-center text-gray-500 dark:text-gray-400">{{ item.tanggal || '-' }}</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-gray-700 dark:text-gray-300 pr-1">
                  <div class="font-normal leading-snug break-words whitespace-normal">{{ item.uraian }}</div>
                </td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right font-medium text-gray-900 dark:text-white">{{ formatRupiah(item.jumlah) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="page.showPemasukanTotal">
              <tr class="bg-emerald-50 dark:bg-emerald-950/20 border-y-2 border-emerald-200 dark:border-emerald-900/30">
                <td colspan="3" class="py-1 px-1 sm:py-1.5 sm:px-1.5 font-bold text-gray-900 dark:text-white uppercase text-right">JUMLAH PEMASUKAN</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{{ formatRupiah(report.totalPemasukan) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Bagian Pengeluaran -->
      <div v-if="page.pengeluaran.length > 0 || page.showPengeluaranHeader" class="space-y-2 mb-2 sm:mb-5 w-full">
        <div v-if="page.showPengeluaranHeader" class="flex items-center gap-2 pb-1 border-b border-gray-300 dark:border-white/10">
          <span class="w-4 h-4 sm:w-5 sm:h-5 rounded bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-[9px] sm:text-[10px] flex items-center justify-center">B</span>
          <h3 class="font-bold text-gray-900 dark:text-white uppercase text-[10px] sm:text-xs tracking-wider">Pengeluaran <span v-if="!page.showHeader && page.pemasukan.length === 0" class="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 font-normal ml-2 italic">(Lanjutan)</span></h3>
        </div>
        
        <div class="w-full overflow-hidden">
          <table class="w-full text-[9px] sm:text-xs text-left border-collapse table-fixed">
            <thead v-if="page.showPengeluaranHeader">
              <tr class="bg-gray-50 dark:bg-white/[0.02] text-gray-600 dark:text-gray-300 font-semibold border-y border-gray-300 dark:border-white/10">
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 w-6 sm:w-10 text-center">NO.</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 w-14 sm:w-28 text-center">TANGGAL</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5">JENIS PENGELUARAN</th>
                <th class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right w-[76px] sm:w-32">JUMLAH (Rp)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="(item, index) in page.pengeluaran" :key="index" class="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-center text-gray-500 dark:text-gray-400">{{ item.no }}</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-center text-gray-500 dark:text-gray-400">{{ item.tanggal || '-' }}</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-gray-700 dark:text-gray-300 pr-1">
                  <div class="font-normal leading-snug break-words whitespace-normal">{{ item.uraian }}</div>
                </td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right font-medium text-gray-900 dark:text-white">{{ formatRupiah(item.shadow || item.jumlah) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="page.showPengeluaranTotal">
              <tr class="bg-rose-50 dark:bg-rose-950/20 border-y-2 border-rose-200 dark:border-rose-900/30">
                <td colspan="3" class="py-1 px-1 sm:py-1.5 sm:px-1.5 font-bold text-gray-900 dark:text-white uppercase text-right">JUMLAH PENGELUARAN</td>
                <td class="py-1 px-1 sm:py-1.5 sm:px-1.5 text-right font-bold text-rose-600 dark:text-rose-400">{{ formatRupiah(report.totalPengeluaran) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Rekapitulasi & Saldo -->
      <div v-if="page.showSaldo" class="mt-2.5 sm:mt-6 pt-1.5 break-inside-avoid mb-2.5 sm:mb-6 w-full">
        <div class="flex items-center justify-between border-y-2 border-cyan-500 dark:border-cyan-900/30 bg-cyan-50 dark:bg-cyan-950/20 px-2.5 sm:px-4 py-1.5 sm:py-2.5">
          <div class="flex items-center gap-3">
            <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-100 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0">C</span>
            <div>
              <p class="font-bold text-gray-900 dark:text-white uppercase text-[9px] sm:text-xs">Sisa Saldo (A - B)</p>
              <p class="text-[8px] sm:text-[10px] italic text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">"{{ report.terbilang }}"</p>
            </div>
          </div>
          <div class="text-[13px] sm:text-xl font-bold font-heading text-cyan-700 dark:text-cyan-400 shrink-0">
            Rp {{ formatRupiah(report.sisaSaldo) }}
          </div>
        </div>
        <div v-if="report.keterangan" class="mt-2 px-1">
          <p class="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400"><span class="font-bold">Catatan:</span> {{ report.keterangan }}</p>
        </div>
      </div>

      <!-- Signatures & Verified -->
      <div v-if="page.showSignatures" class="flex flex-col items-center pt-4 sm:pt-6 pb-2 break-inside-avoid text-sm mt-4 sm:mt-8 border-t border-gray-200 dark:border-white/10">
        <!-- Tengah (QR Code) -->
        <div class="flex flex-col items-center opacity-50 pb-2" :class="{ 'invisible': !showQR }">
          <img v-if="customQR" :src="customQR" class="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="QR" />
          <QrCode v-else class="w-12 h-12 sm:w-14 sm:h-14 text-gray-400 dark:text-gray-500" />
          <span class="text-[7px] sm:text-[8px] mt-1 text-gray-400 dark:text-gray-500 tracking-widest uppercase text-center leading-tight">Verified<br>System</span>
        </div>
      </div>
      
      <!-- Page Number -->
      <div class="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 font-medium print:hidden">
        Halaman {{ pageIndex + 1 }} dari {{ paginatedPages.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CalendarDays, QrCode } from 'lucide-vue-next'
// Reverted logo to the dark text version based on user feedback
import logoLight from '@/assets/images/logo-kustom.png'
import logoDark from '@/assets/images/logo-kustom2.png'

const props = defineProps({
  report: {
    type: Object,
    required: true
  },
  showQR: {
    type: Boolean,
    default: true
  },
  customQR: {
    type: String,
    default: null
  }
})

const formatRupiah = (angka) => {
  if (angka === undefined || angka === null) return '0'
  return new Intl.NumberFormat('id-ID').format(angka)
}

// SMART PAGINATION ALGORITHM
const paginatedPages = computed(() => {
  if (!props.report) return []
  
  // Weights (approximate height units)
  const PAGE_CAPACITY = 40 // Max units per page (dikurangi untuk kompensasi margin vertikal yang lebih besar)
  let currentCapacity = PAGE_CAPACITY
  const result = []
  
  let currentPage = {
    showHeader: false,
    pemasukan: [],
    showPemasukanHeader: false,
    showPemasukanTotal: false,
    pengeluaran: [],
    showPengeluaranHeader: false,
    showPengeluaranTotal: false,
    showSaldo: false,
    showSignatures: false,
  }
  
  const startNewPage = () => {
    result.push(currentPage)
    currentPage = {
      showHeader: false,
      pemasukan: [],
      showPemasukanHeader: false,
      showPemasukanTotal: false,
      pengeluaran: [],
      showPengeluaranHeader: false,
      showPengeluaranTotal: false,
      showSaldo: false,
      showSignatures: false,
    }
    currentCapacity = PAGE_CAPACITY
  }
  
  // 1. Header (costs 6 units)
  currentPage.showHeader = true
  currentCapacity -= 6
  
  // 2. Pemasukan
  if (props.report.pemasukan && props.report.pemasukan.length > 0) {
    if (currentCapacity < 4) startNewPage() 
    currentPage.showPemasukanHeader = true
    currentCapacity -= 3
    
    props.report.pemasukan.forEach((item) => {
      if (currentCapacity < 1) {
        startNewPage()
        currentPage.showPemasukanHeader = true
        currentCapacity -= 3
      }
      currentPage.pemasukan.push(item)
      currentCapacity -= 1
    })
    
    if (currentCapacity < 1.5) startNewPage()
    currentPage.showPemasukanTotal = true
    currentCapacity -= 1.5
  }
  
  // 3. Pengeluaran
  if (props.report.pengeluaran && props.report.pengeluaran.length > 0) {
    if (currentCapacity < 4) startNewPage()
    currentPage.showPengeluaranHeader = true
    currentCapacity -= 3
    
    props.report.pengeluaran.forEach((item) => {
      if (currentCapacity < 1) {
        startNewPage()
        currentPage.showPengeluaranHeader = true
        currentCapacity -= 3
      }
      currentPage.pengeluaran.push(item)
      currentCapacity -= 1
    })
    
    if (currentCapacity < 1.5) startNewPage()
    currentPage.showPengeluaranTotal = true
    currentCapacity -= 1.5
  }
  
  // 4. Saldo
  if (currentCapacity < 3.5) startNewPage()
  currentPage.showSaldo = true
  currentCapacity -= 3.5
  
  // 5. Signatures 
  if (currentCapacity < 5) startNewPage()
  currentPage.showSignatures = true
  currentCapacity -= 5
  
  result.push(currentPage)
  return result
})
</script>
