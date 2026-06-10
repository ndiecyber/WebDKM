<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in h-full flex flex-col">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Cetak Laporan</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Buat dan ekspor laporan keuangan dalam format PDF.
      </p>
    </div>

    <!-- Main Workspace -->
    <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
      
      <!-- Left Panel: Live Preview -->
      <div class="flex-1 bg-gray-100 dark:bg-gray-950 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 overflow-hidden flex flex-col relative shadow-inner">
        <div class="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 flex items-center justify-between z-10 shrink-0">
          <div class="flex items-center gap-2">
            <Monitor class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
          </div>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Ukuran A4</span>
        </div>
        
        <!-- Preview Container -->
        <div class="flex-1 overflow-auto custom-scrollbar-y p-4 sm:p-8 flex justify-center bg-gray-100/50 dark:bg-[#0a0a0a]">
          <!-- A4 Paper Sheet -->
          <div class="w-full max-w-[794px] min-h-[1123px] bg-white dark:bg-[#111827] shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] ring-1 ring-gray-200 dark:ring-white/5 rounded-sm p-8 sm:p-12 shrink-0 transition-all duration-300" id="report-paper">
            <ReportKegiatanTemplate v-if="selectedReport" :report="selectedReport" />
            
            <div v-else class="h-full w-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 opacity-50 space-y-4">
              <FileText class="w-16 h-16" />
              <p class="font-medium">Pilih laporan di panel kanan untuk melihat preview</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Parameters -->
      <div class="w-full lg:w-80 shrink-0 flex flex-col gap-4">
        <div class="bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 p-6 shadow-md flex flex-col h-full">
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
import html2pdf from 'html2pdf.js'
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

// --- Export Logic ---
const exportToPDF = async () => {
  if (!selectedReport.value) return
  
  isExporting.value = true
  
  try {
    const element = document.getElementById('report-paper')
    
    // Konfigurasi html2pdf
    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], // margin top, left, bottom, right in inches
      filename:     `Laporan_${selectedReport.value.title.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    }
    
    // Proses ekspor
    await html2pdf().set(opt).from(element).save()
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Terjadi kesalahan saat mengekspor PDF.')
  } finally {
    isExporting.value = false
  }
}
</script>
