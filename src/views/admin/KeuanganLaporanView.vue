<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Cetak Laporan</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Buat dan ekspor laporan keuangan dalam format PDF.
      </p>
    </div>

    <!-- Main Workspace -->
    <div class="flex flex-col xl:flex-row gap-6 items-start">
      
      <!-- Left Panel: Live Preview -->
      <div class="w-full xl:flex-1 bg-gray-100 dark:bg-gray-950 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 overflow-hidden flex flex-col relative shadow-inner h-[800px]">
        <div class="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 flex items-center justify-between z-10 shrink-0">
          <div class="flex items-center gap-2">
            <Monitor class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
          </div>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Ukuran A4</span>
        </div>
        
        <!-- Preview Container (Overflow handles mobile scrolling) -->
        <div class="flex-1 overflow-auto custom-scrollbar-y p-4 sm:p-8 bg-gray-100/50 dark:bg-[#0a0a0a]">
          <!-- Wrapper for Pages -->
          <div id="report-paper" class="flex flex-col items-center gap-8 pb-8 min-w-max">
            <ReportKegiatanTemplate v-if="selectedReport" :report="selectedReport" />
            
            <div v-else class="h-full w-full max-w-[794px] min-h-[800px] bg-white/50 dark:bg-gray-900/50 border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-400 opacity-80 space-y-4">
              <FileText class="w-16 h-16" />
              <p class="font-medium text-sm">Pilih laporan di panel kanan untuk melihat preview</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Parameters -->
      <div class="w-full xl:w-80 shrink-0 flex flex-col gap-4 relative z-10">
        <div class="bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 p-6 shadow-md flex flex-col">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-3">Pengaturan Ekspor</h3>
          
          <div class="space-y-5 flex-1">
            <!-- Jenis Laporan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jenis Laporan</label>
              <select class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all">
                <option value="kegiatan">Kegiatan Khusus</option>
                <option value="mutasi" disabled>Mutasi Rekening (Segera)</option>
                <option value="kas" disabled>Buku Kas Umum (Segera)</option>
              </select>
            </div>

            <!-- Pilih Tahun -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tahun</label>
              <select v-model="selectedYear" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all">
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>

            <!-- Pilih Kegiatan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Kegiatan</label>
              <select v-model="selectedReportId" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all">
                <option value="">-- Pilih Kegiatan --</option>
                <option v-for="report in filteredReports" :key="report.id" :value="report.id">
                  {{ report.title }}
                </option>
              </select>
            </div>
            
            <div v-if="selectedReport" class="p-3 bg-secondary/10 dark:bg-secondary/5 border border-secondary/20 rounded-lg mt-4">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <p class="text-xs text-gray-700 dark:text-gray-300">
                  Laporan siap diekspor. Pastikan logo dan stempel sudah terlihat dengan baik pada preview sebelum mengunduh.
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-6 mt-6 border-t border-gray-200 dark:border-white/10">
            <button 
              @click="exportToPDF" 
              :disabled="!selectedReport || isExporting"
              class="w-full justify-center bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-bold px-4 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Loader2 v-if="isExporting" class="w-5 h-5 animate-spin" />
              <Download v-else class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>{{ isExporting ? 'Memproses PDF...' : 'Ekspor ke PDF' }}</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Download, Monitor, FileText, Info, Loader2 } from 'lucide-vue-next'
import ReportKegiatanTemplate from '@/components/ui/ReportKegiatanTemplate.vue'

// --- MOCK DATA (Copy dari FinanceSection) ---
const mockReports = [
  {
    id: 'isra-miraj',
    title: 'PHBI Isra’ Mi’raj',
    year: '2026',
    subtitle: 'PERUM ARJAMUKTI KENCANA RAYA',
    date: '18 Januari 2026M / 1447H',
    pemasukan: [
      { no: 1, tanggal: '10 Jan 2026', uraian: 'Total Open Donasi Warga Perum Arjamukti', jumlah: 6682000 }
    ],
    pengeluaran: [
      { no: 1, tanggal: '12 Jan 2026', uraian: '170 Box Nasi Kuning Dewasa', jumlah: 1360000 },
      { no: 2, tanggal: '12 Jan 2026', uraian: '150 Box Nasi Kuning Anak', jumlah: 900000 },
      { no: 3, tanggal: '12 Jan 2026', uraian: '25 Porsi Paket Nasi Prasmanan', jumlah: 500000 },
      { no: 4, tanggal: '15 Jan 2026', uraian: 'Mubaligh / Penceramah', jumlah: 700000 },
      { no: 5, tanggal: '15 Jan 2026', uraian: 'Qori Al-Quran', jumlah: 100000 },
      { no: 6, tanggal: '16 Jan 2026', uraian: 'Bingkisan Mubalig', jumlah: 110000 },
      { no: 7, tanggal: '16 Jan 2026', uraian: '2 Runtuy Kopi dan Rokok', jumlah: 97000 },
      { no: 8, tanggal: '17 Jan 2026', uraian: 'Air Mineral 4 Dus @18.000', jumlah: 72000 },
      { no: 9, tanggal: '17 Jan 2026', uraian: 'Air Mineral 8 Dus @17.000', jumlah: 136000 },
      { no: 10, tanggal: '17 Jan 2026', uraian: '1 Banner Frontlite 280 (3x2M) @25.000', jumlah: 150000 },
      { no: 11, tanggal: '18 Jan 2026', uraian: 'TIM Petugas Kebersihan', jumlah: 100000 },
      { no: 12, tanggal: '18 Jan 2026', uraian: 'Akomodasi', jumlah: 20000 }
    ],
    totalPemasukan: 6682000,
    totalPengeluaran: 4245000,
    sisaSaldo: 2437000,
    terbilang: 'Dua Juta Empat Ratus Tiga Puluh Tujuh Ribu Rupiah',
    keterangan: '',
    ketua: 'Irvan Ruchiat',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Ketua Panitia'
  },
  {
    id: 'maulid-nabi',
    title: 'PHBI Maulid Nabi',
    year: '2026',
    subtitle: 'PERUM ARJAMUKTI KENCANA RAYA',
    date: '12 Rabiul Awal 1447H',
    pemasukan: [
      { no: 1, tanggal: '01 Rabiul Awal', uraian: 'Infaq Jamaah Pengajian Rutin', jumlah: 4500000 },
      { no: 2, tanggal: '05 Rabiul Awal', uraian: 'Donasi Hamba Allah', jumlah: 1500000 }
    ],
    pengeluaran: [
      { no: 1, tanggal: '10 Rabiul Awal', uraian: 'Honor Penceramah', jumlah: 1000000 },
      { no: 2, tanggal: '11 Rabiul Awal', uraian: 'Konsumsi (200 Box @15.000)', jumlah: 3000000 },
      { no: 3, tanggal: '11 Rabiul Awal', uraian: 'Dekorasi & Tenda', jumlah: 1200000 },
      { no: 4, tanggal: '12 Rabiul Awal', uraian: 'Kebersihan', jumlah: 200000 }
    ],
    totalPemasukan: 6000000,
    totalPengeluaran: 5400000,
    sisaSaldo: 600000,
    terbilang: 'Enam Ratus Ribu Rupiah',
    keterangan: 'Sisa dana disetorkan ke Kas Utama DKM',
    ketua: 'Ahmad Syafiq',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Ketua Panitia'
  }
]

// --- State ---
const availableYears = ['2026', '2025', '2024']
const selectedYear = ref('2026')
const selectedReportId = ref('')
const isExporting = ref(false)

// --- Computed ---
const filteredReports = computed(() => {
  return mockReports.filter(r => r.year === selectedYear.value)
})

const selectedReport = computed(() => {
  return mockReports.find(r => r.id === selectedReportId.value) || null
})

// Auto-reset when year changes
watch(selectedYear, () => {
  selectedReportId.value = ''
})

// --- Export Logic (Using Native Print for 100% Fidelity & Tailwind v4 support) ---
const exportToPDF = () => {
  if (!selectedReport.value) return
  isExporting.value = true
  
  setTimeout(() => {
    try {
      const paper = document.getElementById('report-paper')
      
      const printContainer = document.createElement('div')
      printContainer.id = 'print-container'
      printContainer.innerHTML = paper.innerHTML
      
      Object.assign(printContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '210mm',
        minHeight: '297mm',
        background: 'white',
        color: 'black',
        zIndex: '999999',
        padding: '15mm'
      })
      
      document.body.appendChild(printContainer)
      
      const style = document.createElement('style')
      style.id = 'print-style'
      style.innerHTML = `
        @media print {
          body > *:not(#print-container) { display: none !important; }
          @page { size: A4 portrait; margin: 0; }
          #print-container { 
            padding: 0 !important; 
            box-shadow: none !important; 
            border: none !important; 
            background: transparent !important;
            width: 100%;
          }
          .a4-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `
      document.head.appendChild(style)
      
      // Trigger native browser print (can Save as PDF)
      window.print()
      
      // Cleanup
      document.body.removeChild(printContainer)
      document.head.removeChild(style)
      
    } catch (error) {
      console.error('Error printing:', error)
      alert('Terjadi kesalahan saat mencetak laporan.')
    } finally {
      isExporting.value = false
    }
  }, 150)
}
</script>

<style scoped>
.custom-scrollbar-y::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar-y::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 20px;
}
.dark .custom-scrollbar-y::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
}
.custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.6);
}
.dark .custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
