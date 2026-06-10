<template>
  <div class="space-y-8 flex flex-col items-center min-w-max">
    <div 
      v-for="(page, pageIndex) in paginatedPages" 
      :key="pageIndex" 
      class="a4-page text-gray-900 w-[794px] min-h-[1123px] mx-auto bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] ring-1 ring-gray-200 rounded-sm p-12 shrink-0 relative"
      style="page-break-after: always; break-after: page;"
    >
      <!-- Header Report -->
      <div v-if="page.showHeader" class="flex flex-row items-center justify-between gap-6 mb-6 border-b-2 border-gray-900/10 pb-4">
        <!-- Logo Kiri -->
        <div class="w-40 shrink-0">
          <img :src="logoLight" alt="Logo Masjid" class="w-full h-auto object-contain block" />
        </div>
        
        <!-- Teks Kanan -->
        <div class="text-right space-y-1 flex-1 flex flex-col justify-center mt-0">
          <h1 class="text-lg font-bold text-gray-900 uppercase tracking-wide leading-snug">
            LAPORAN KEUANGAN {{ report.title }}
          </h1>
          <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wide">
            {{ report.subtitle }}
          </h2>
          <p class="text-xs italic font-medium text-blue-600 mt-1">
            {{ report.date }}
          </p>
        </div>
      </div>

      <!-- Bagian Pemasukan -->
      <div v-if="page.pemasukan.length > 0 || page.showPemasukanHeader" class="space-y-2 mb-5">
        <div v-if="page.showPemasukanHeader" class="flex items-center gap-2 pb-1.5 border-b border-gray-300">
          <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-600 font-bold text-[10px] flex items-center justify-center">A</span>
          <h3 class="font-bold text-gray-900 uppercase text-xs tracking-wider">Pemasukan <span v-if="!page.showHeader" class="text-[10px] text-gray-400 font-normal ml-2 italic">(Lanjutan)</span></h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse table-fixed">
            <thead v-if="page.showPemasukanHeader">
              <tr class="bg-gray-50 text-gray-600 font-semibold border-y border-gray-300">
                <th class="py-1.5 px-2 w-10 text-center">NO.</th>
                <th class="py-1.5 px-2 w-28 text-center">TANGGAL</th>
                <th class="py-1.5 px-2">JENIS PEMASUKAN</th>
                <th class="py-1.5 px-2 text-right w-32">JUMLAH (Rp)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(item, index) in page.pemasukan" :key="index" class="hover:bg-gray-50/50">
                <td class="py-1.5 px-3 text-center text-gray-500">{{ item.no }}</td>
                <td class="py-1.5 px-3 text-center text-gray-500">{{ item.tanggal || '-' }}</td>
                <td class="py-1.5 px-3 text-gray-700 pr-4">
                  <div class="font-normal leading-snug truncate">{{ item.uraian }}</div>
                </td>
                <td class="py-1.5 px-3 text-right font-medium text-gray-900">{{ formatRupiah(item.jumlah) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="page.showPemasukanTotal">
              <tr class="bg-emerald-50 border-y-2 border-emerald-200">
                <td colspan="3" class="py-1.5 px-2 font-bold text-gray-900 uppercase text-right">JUMLAH PEMASUKAN</td>
                <td class="py-1.5 px-2 text-right font-bold text-emerald-600">{{ formatRupiah(report.totalPemasukan) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Bagian Pengeluaran -->
      <div v-if="page.pengeluaran.length > 0 || page.showPengeluaranHeader" class="space-y-2 mb-5">
        <div v-if="page.showPengeluaranHeader" class="flex items-center gap-2 pb-1.5 border-b border-gray-300">
          <span class="w-5 h-5 rounded bg-rose-100 text-rose-600 font-bold text-[10px] flex items-center justify-center">B</span>
          <h3 class="font-bold text-gray-900 uppercase text-xs tracking-wider">Pengeluaran <span v-if="!page.showHeader && page.pemasukan.length === 0" class="text-[10px] text-gray-400 font-normal ml-2 italic">(Lanjutan)</span></h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse table-fixed">
            <thead v-if="page.showPengeluaranHeader">
              <tr class="bg-gray-50 text-gray-600 font-semibold border-y border-gray-300">
                <th class="py-1.5 px-2 w-10 text-center">NO.</th>
                <th class="py-1.5 px-2 w-28 text-center">TANGGAL</th>
                <th class="py-1.5 px-2">JENIS PENGELUARAN</th>
                <th class="py-1.5 px-2 text-right w-32">JUMLAH (Rp)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(item, index) in page.pengeluaran" :key="index" class="hover:bg-gray-50/50">
                <td class="py-1.5 px-3 text-center text-gray-500">{{ item.no }}</td>
                <td class="py-1.5 px-3 text-center text-gray-500">{{ item.tanggal || '-' }}</td>
                <td class="py-1.5 px-3 text-gray-700 pr-4">
                  <div class="font-normal leading-snug truncate">{{ item.uraian }}</div>
                </td>
                <td class="py-1.5 px-3 text-right font-medium text-gray-900">{{ formatRupiah(item.jumlah) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="page.showPengeluaranTotal">
              <tr class="bg-rose-50 border-y-2 border-rose-200">
                <td colspan="3" class="py-1.5 px-2 font-bold text-gray-900 uppercase text-right">JUMLAH PENGELUARAN</td>
                <td class="py-1.5 px-2 text-right font-bold text-rose-600">{{ formatRupiah(report.totalPengeluaran) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Rekapitulasi & Saldo -->
      <div v-if="page.showSaldo" class="mt-6 pt-2 break-inside-avoid mb-6">
        <div class="flex items-center justify-between border-y-2 border-cyan-500 bg-cyan-50 px-4 py-2.5">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 font-bold text-xs flex items-center justify-center shrink-0">C</span>
            <div>
              <p class="font-bold text-gray-900 uppercase text-xs">Sisa Saldo (A - B)</p>
              <p class="text-[10px] italic text-gray-500 line-clamp-1 mt-0.5">"{{ report.terbilang }}"</p>
            </div>
          </div>
          <div class="text-xl font-bold font-heading text-cyan-700 shrink-0">
            Rp {{ formatRupiah(report.sisaSaldo) }}
          </div>
        </div>
        <div v-if="report.keterangan" class="mt-2 px-1">
          <p class="text-[10px] text-gray-500"><span class="font-bold">Catatan:</span> {{ report.keterangan }}</p>
        </div>
      </div>

      <!-- Signatures & Verified -->
      <div v-if="page.showSignatures" class="grid grid-cols-3 gap-4 pt-6 pb-2 break-inside-avoid text-sm items-end mt-8 border-t border-gray-200">
        <div class="text-center space-y-14">
          <p class="font-medium text-gray-700 text-xs">{{ report.ttdKiriTitle || 'Mengetahui' }}</p>
          <div>
            <p class="font-bold underline text-gray-900 text-sm">{{ report.ketua || '_______________________' }}</p>
          </div>
        </div>
        
        <!-- Tengah (QR Code) -->
        <div class="flex flex-col items-center justify-end opacity-50 pb-2">
          <QrCode class="w-14 h-14 text-gray-400" />
          <span class="text-[8px] mt-1 text-gray-400 tracking-widest uppercase text-center leading-tight">Verified<br>System</span>
        </div>

        <div class="text-center space-y-14">
          <p class="font-medium text-gray-700 text-xs">Bendahara</p>
          <div>
            <p class="font-bold underline text-gray-900 text-sm">{{ report.bendahara || '_______________________' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Page Number -->
      <div class="absolute bottom-6 right-10 text-xs text-gray-400 font-medium print:hidden">
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

const props = defineProps({
  report: {
    type: Object,
    required: true
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
